import { MongoClient, ObjectId } from "mongodb";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductsContext } from "../../components/store/products-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/container";
import formatDate from "../../utils/formatDate";
import { AnimatePresence, motion } from "framer-motion";
import ListItem from "../../components/list/list-item";
import { AlertContext } from "../../components/store/alerts-context";
import { v4 as uuidv4 } from "uuid";
import useHttp from "../../hooks/useHttp";


const ListDetailsPage = (props) => {
    const alertsCtx = useContext(AlertContext);
    const productsCtx = useContext(ProductsContext);
    const inputProductRef = useRef();
    const [inputQuery, setInputQuery] = useState('');
    const [inputFocus, setInputFocus] = useState(false);
    const [availableProducts, setAvailableProducts] = useState(productsCtx.products);
    const [products, setProducts] = useState(props.listData.cart);
    const UpdateProductCart = useHttp();

    const date = formatDate(props.listData.timestamp);

    const changeHandler = () => {
        const text = inputProductRef.current.value;
        setInputQuery(text);
    }

    const focusinHandler = () => {
        setInputFocus(true);
    };

    const focusoutHandler = (e) => {
        if (e.target.closest("#searcher")) return;
        setInputFocus(false);
    };

    const submitHandler = (e) => e.preventDefault();

    const AddAlert = (status, data) => {
        alertsCtx.addAlert({ id: uuidv4(), msg: data.message, ok: status });
    };

    const updateCartHandler = async () => {
        let cart = products.map(product => { return { productId: product._id, amount: product.amount } });

        UpdateProductCart({
            url: '/api/update-list',
            method: 'PUT',
            body: { id: props.listData.id, cart },
            headers: {
                'Content-Type': 'application/json'
            }
        }, AddAlert);
    }

    const addProductToListHandler = (product) => {
        const newProduct = productsCtx.products.find(prod => prod.name === product.name);

        let searchedProduct = products.find(prod => prod._id === product._id);

        if (searchedProduct) {
            let index = products.findIndex(prod => prod._id === product._id);
            let newProducts = [...products];
            newProducts[index].amount++;

            setProducts(newProducts);
        } else {
            setProducts(prev => [...prev, { ...newProduct, amount: 1 }]);
        }
        setInputFocus(false);
    };

    useEffect(() => {
        setAvailableProducts(productsCtx.products.filter(product => product.name.includes(inputQuery)));
    }, [inputQuery]);

    useEffect(() => {
        document.addEventListener("click", focusoutHandler);
        return () => {
            document.removeEventListener("click", focusoutHandler);
        }
    }, []);

    return (
        <Container>
            <div className="max-w-3xl shadow-md bg-white rounded-md p-6 pb-64 border mx-auto">
                <p className="text-xl border-b-2 pb-2 pt-3 border-fuchsia-800">{props.listData.name}</p>
                <p className="text-right text-sm mt-1 text-gray-600">stworzona: {date}</p>
                <ul className="mt-7 mb-1.5">
                    <AnimatePresence>
                        {
                            products.map((product, index) => <ListItem key={product._id} index={index} {...product} />)
                        }
                    </AnimatePresence>
                </ul>

                <form className="flex flex-wrap p-1.5 items-center" onSubmit={submitHandler}>
                    <p className="w-10 items-center justify-center text-cyan-400 flex text-2xl font-semibold border-r border-cyan-400 mr-3 py-1">{products.length + 1}</p>
                    <div className="flex-auto relative" id="searcher">
                        <input type="text" className="border w-full p-1" ref={inputProductRef} onChange={changeHandler} onFocus={focusinHandler} onClick={focusinHandler} />
                        {inputFocus && <ul className="absolute top-full bg-white border shadow-md w-full">
                            {
                                availableProducts.map(product => <li className="p-1 hover:bg-slate-100 cursor-pointer" key={product.name} onClick={() => { addProductToListHandler(product) }}>{product.name}</li>)
                            }
                        </ul>}
                    </div>
                    <button className="w-max p-1 px-3 ml-5 text-white rounded-md flex items-center bg-fuchsia-500 transition-colors hover:bg-fuchsia-700">Dodaj<FontAwesomeIcon icon={faPlus} /></button>
                </form>
                <button className="w-max p-1 px-3 ml-5 text-white rounded-md float-right mt-7 bg-fuchsia-500 transition-colors hover:bg-fuchsia-700" onClick={updateCartHandler}>Zapisz</button>
            </div>
        </Container>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.DB_HOST);
    const db = client.db();

    const listsCollection = db.collection('lists');

    const lists = await listsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: lists.map(list => ({ params: { listId: list._id.toString() } }))
    };
}

export async function getStaticProps(context) {
    const listId = context.params.listId;

    const client = await MongoClient.connect(process.env.DB_HOST);
    const db = client.db();

    const listsCollection = db.collection('lists');

    const list = await listsCollection.findOne({ _id: ObjectId(listId) });

    const cartProductIds = list.cart.map(product => ObjectId(product.productId));

    const productsCollection = db.collection('products');

    const cartProducts = await productsCollection.find({ _id: { $in: cartProductIds } }, { _id: 1, name: 1 }).toArray();

    const cart = cartProducts.map((product, index) => ({ _id: product._id.toString(), name: product.name, amount: list.cart[index].amount }));

    client.close();

    return {
        props: {
            listData: {
                id: list._id.toString(),
                name: list.name,
                timestamp: list.timestamp,
                cart: cart
            },
        }
    }
}

export default ListDetailsPage;
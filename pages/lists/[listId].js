import { MongoClient, ObjectId } from "mongodb";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/container";
import formatDate from "../../utils/formatDate";
import { AnimatePresence } from "framer-motion";
import ListItem from "../../components/list/list-item";
import { AlertContext } from "../../components/store/alerts-context";
import { v4 as uuidv4 } from "uuid";
import useHttp from "../../hooks/useHttp";
import Button from "../../components/buttons/button";
import { CartContext } from "../../components/store/cart-context";
import Searcher from "../../components/searcher/searcher";
import useProducts from "../../hooks/useProducts";

const ListDetailsPage = (props) => {
    const alertsCtx = useContext(AlertContext);
    const cartCtx = useContext(CartContext);

    const availableProducts = useProducts();

    const [products, setProducts] = useState(props.listData.cart);
    const UpdateProductCart = useHttp();

    const date = formatDate(props.listData.timestamp);

    const submitHandler = (e) => e.preventDefault();

    const AddAlert = (status, data) => {
        alertsCtx.addAlert({ id: uuidv4(), msg: data.message, ok: status });
    };

    const updateCartHandler = async () => {
        let cart = products.map(product => { return { productId: product._id, amount: product.amount } });

        UpdateProductCart({
            url: '/api/lists/update',
            method: 'PUT',
            body: { id: props.listData.id, cart },
            headers: {
                'Content-Type': 'application/json'
            }
        }, AddAlert);
    }

    const addProductToListHandler = (product) => {
        const newProduct = availableProducts.find(prod => prod.name === product.name);

        let searchedProduct = products.find(prod => prod._id === product._id);

        if (searchedProduct) {
            let index = products.findIndex(prod => prod._id === product._id);
            let newProducts = [...products];
            newProducts[index].amount++;

            setProducts(newProducts);
        } else {
            setProducts(prev => [...prev, { ...newProduct, amount: 1 }]);
        }
    };

    return (
        <Container>
            <div className="max-w-3xl shadow-md bg-white rounded-md p-6 pb-64 border mx-auto">
                <p className="text-xl border-b-2 pb-2 pt-3 border-fuchsia-800">{props.listData.name}</p>
                <p className="text-right text-sm mt-1 text-gray-600">stworzona: {date}</p>
                <ul className="mt-7 mb-1.5">
                    <AnimatePresence>
                        {
                            products.map((product, index) => <ListItem key={product._id} index={index} check={cartCtx.addToCopiedItems} uncheck={cartCtx.removeFromCopiedItems} checked={cartCtx.copiedItems.indexOf(product._id) > -1 ? true : false}  {...product} />)
                        }
                    </AnimatePresence>
                </ul>

                <form className="flex flex-wrap p-1.5 items-center" onSubmit={submitHandler}>
                    <p className="w-10 items-center justify-center text-cyan-400 flex text-2xl font-semibold border-r border-cyan-400 mr-3 py-1">{products.length + 1}</p>
                    <Searcher
                        elements={availableProducts}
                        searchBy="name"
                        mapFn={(product) => <li className="p-1 hover:bg-slate-100 cursor-pointer" key={product._id} onClick={() => { addProductToListHandler(product) }}>{product.name}</li>}
                    />
                    <Button>Dodaj<FontAwesomeIcon className="ml-2" icon={faPlus} /></Button>
                </form>
                <Button onClick={updateCartHandler} classes="ml-5 mt-7 float-right">Zapisz</Button>
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
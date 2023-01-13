import { MongoClient } from "mongodb";
import { useContext, useEffect, useRef, useState } from "react";
import { AlertContext } from "../../../components/store/alerts-context";
import { v4 as uuidv4 } from "uuid";
import Container from "../../../components/container";
import { AnimatePresence, motion } from "framer-motion";
import useHttp from "../../../hooks/useHttp";

const ProductTypesPage = (props) => {
    const [types, setTypes] = useState(props.productTypes);
    const typeInputRef = useRef();
    const alertsCtx = useContext(AlertContext);
    const AddNewProductType = useHttp();

    const AddAlert = (status, data) => {
        alertsCtx.addAlert({ id: uuidv4(), msg: data.message, ok: status });

        if (status) {
            setTypes(prev => [...prev, { name: typeInputRef.current.value, id: data.insertedId.toString() }]);
            typeInputRef.current.value = '';
        }
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const enteredType = typeInputRef.current.value;

        if (enteredType === '') {
            alertsCtx.addAlert({ id: uuidv4(), msg: "typ nie może być pusty", ok: false });
            return;
        }

        AddNewProductType({
            url: '/api/new-product-type',
            method: 'POST',
            body: { name: enteredType },
            headers: {
                'Content-Type': 'application/json'
            }
        }, AddAlert);
    };

    return (
        <Container>
            <div className="bg-white rounded-md border shadow-md max-w-md mx-auto p-3">
                <p>typy produktów:</p>
                <div className="flex gap-1 mt-3 flex-wrap">
                    {
                        types.map(type => <p key={type.id} className="py-1.5 p-3 bg-cyan-400 text-white font-semibold rounded-md">{type.name}</p>)
                    }
                </div>
            </div>

            <form className="bg-white rounded-md border shadow-md hover:shadow-lg max-w-md mx-auto flex justify-center items-center mt-5 p-3" onSubmit={formSubmitHandler}>
                <label htmlFor="type">Dodaj typ:</label>
                <input type="text" id="type" ref={typeInputRef} className="bg-gray-200 py-1.5 px-1 ml-1"></input>
                <button className="p-2 px-6 bg-green-500 text-white rounded-lg mx-3 hover:bg-green-600">Dodaj</button>
            </form>
        </Container>
    );
}

export async function getStaticProps() {
    const client = await MongoClient.connect(process.env.DB_HOST);
    const db = client.db();

    const productTypesCollection = db.collection('productTypes');

    const productTypes = await productTypesCollection.find().toArray();

    client.close();

    return {
        props: {
            productTypes: productTypes.map(type => ({
                id: type._id.toString(),
                name: type.name,
            })),
        },
    };
}

export default ProductTypesPage;
import { useContext, useRef } from "react";
import { AlertContext } from "../../components/store/alerts-context";
import { v4 as uuidv4 } from "uuid";
import isBlank from "../../utils/isBlank";
import useHttp from "../../hooks/useHttp";
import Button from "../../components/buttons/button";
import { CartContext } from "../../components/store/cart-context";
import { AnimatePresence } from "framer-motion";
import { ProductsContext } from "../../components/store/products-context";

const NewListPage = () => {
    const nameRef = useRef();
    const alertsCtx = useContext(AlertContext);
    const cartCtx = useContext(CartContext);
    const productsCtx = useContext(ProductsContext);

    const AddNewList = useHttp();

    const AddAlert = (status, data) => {
        alertsCtx.addAlert({ id: uuidv4(), msg: data.message, ok: status });
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const enteredName = nameRef.current.value;

        if (isBlank(enteredName)) {
            alertsCtx.addAlert({ id: uuidv4(), msg: "nazwa nie może być pusta", ok: false });
            return;
        }

        const timestamp = new Date().getTime();

        const initialCartItems = cartCtx.copiedItems.map(item => { return { productId: item, amount: 1 } });

        AddNewList({
            url: '/api/lists/create',
            method: 'POST',
            body: { name: enteredName, timestamp: timestamp, cart: initialCartItems },
            headers: {
                'Content-Type': 'application/json'
            }
        }, AddAlert);
    };

    return (
        <div className="container">
            <form onSubmit={formSubmitHandler} className="bg-white shadow-2xl p-2 max-w-3xl my-10 mx-auto">
                <div>
                    <label htmlFor="name" className="block">Nazwa listy:</label>
                    <input type="text" id="name" ref={nameRef} className="w-full border-b-2 border-cyan-500 pt-2 pl-2" />
                </div>

                <p className="mt-7 font-semibold">Skopiowane produkty:</p>
                <ul className="my-1.5 list-disc list-inside">
                    <AnimatePresence>
                        {
                            cartCtx.copiedItems.map(item => <li>{productsCtx.products.find(product => product._id === item).name}</li>)
                        }
                    </AnimatePresence>
                </ul>

                <div className="flex justify-center mt-10">
                    <Button type="reset" classes="p-2 px-6 bg-red-500 text-white mx-3 hover:bg-red-600">Anuluj</Button>
                    <Button type="submit" classes="p-2 px-6 bg-green-500 text-white mx-3 hover:bg-green-600">Dodaj</Button>
                </div>
            </form>
        </div>
    );
}

export default NewListPage;
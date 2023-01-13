import { useContext, useRef } from "react";
import { AlertContext } from "../../components/store/alerts-context";
import { v4 as uuidv4 } from "uuid";
import isBlank from "../../utils/isBlank";
import useHttp from "../../hooks/useHttp";

const NewListPage = () => {
    const nameRef = useRef();
    const alertsCtx = useContext(AlertContext);
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

        AddNewList({
            url: '/api/new-list',
            method: 'POST',
            body: { name: enteredName, timestamp: timestamp, products: [] },
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

                <div className="flex justify-center mt-10">
                    <button type="reset" className="p-2 px-6 bg-red-500 text-white rounded-lg mx-3 hover:bg-red-600">Anuluj</button>
                    <button type="submit" className="p-2 px-6 bg-green-500 text-white rounded-lg mx-3 hover:bg-green-600">Dodaj</button>
                </div>
            </form>
        </div>
    );
}

export default NewListPage;
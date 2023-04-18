import { useContext, useRef } from "react";
import { AlertContext } from "../../components/store/alerts-context";
import { v4 as uuidv4 } from 'uuid';
import Container from "../../components/container";
import isBlank from "../../utils/isBlank";
import Nutrition from "../../components/nutrition/nutrition";
import useHttp from "../../hooks/useHttp";
import Button from "../../components/buttons/button";

const NewProductPage = () => {
    const alertsCtx = useContext(AlertContext);
    const AddNewProduct = useHttp();

    const nameRef = useRef();
    const caloriesRef = useRef();
    const fatsRef = useRef();
    const saturatedFatsRef = useRef();
    const carbohydratesRef = useRef();
    const sugarsRef = useRef();
    const proteinRef = useRef();
    const saltRef = useRef();

    const AddAlert = (status, data) => {
        alertsCtx.addAlert({ id: uuidv4(), msg: data.message, ok: status });
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredCalories = caloriesRef.current.value;
        const enteredFats = fatsRef.current.value;
        const enteredSaturatedFats = saturatedFatsRef.current.value;
        const enteredCarbohydrates = carbohydratesRef.current.value;
        const enteredSugars = sugarsRef.current.value;
        const enteredProtein = proteinRef.current.value;
        const enteredSalt = saltRef.current.value;

        if (isBlank(enteredName)) {
            alertsCtx.addAlert({ ok: false, id: uuidv4(), msg: "Name can't be empty" });
            return;
        }

        AddNewProduct({
            url: '/api/products/create',
            method: 'POST',
            body: {
                name: enteredName,
                calories: enteredCalories,
                fats: enteredFats,
                saturatedFats: enteredSaturatedFats,
                carbohydrates: enteredCarbohydrates,
                sugars: enteredSugars,
                protein: enteredProtein,
                salt: enteredSalt
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }, AddAlert);
    };

    return (
        <Container>
            <form onSubmit={formSubmitHandler} className="bg-white shadow-lg border p-5 mx-auto rounded-md max-w-xl">
                <p className="text-2xl text-center mb-10">Dodawanie produktu</p>
                <div>
                    <label htmlFor="name" className="block">Nazwa produktu:</label>
                    <input type="text" id="name" ref={nameRef} className="w-full border-b-2 border-cyan-500 pt-2 pb-1" />
                </div>

                <p className="mt-10 mb-5">Wartości odżywcze:</p>
                <div className="grid grid-cols-2 gap-y-3 w-max gap-x-8 mx-auto">
                    <Nutrition name="kalorie (kcal)" ref={caloriesRef} />
                    <br />
                    <Nutrition name="tłuszcze" ref={fatsRef} />
                    <Nutrition name="w tym nasycone" ref={saturatedFatsRef} />
                    <Nutrition name="węglowodany" ref={carbohydratesRef} />
                    <Nutrition name="w tym cukry" ref={sugarsRef} />
                    <Nutrition name="białko" ref={proteinRef} />
                    <br />
                    <Nutrition name="sól" ref={saltRef} />
                </div>

                <div className="flex justify-center mt-10">
                    <Button type="reset" classes="p-2 px-6 bg-red-500 mx-3 hover:bg-red-600">Anuluj</Button>
                    <Button type="submit" classes="p-2 px-6 bg-green-500 mx-3 hover:bg-green-600">Zapisz</Button>
                </div>
            </form>
        </Container>
    );
}

export default NewProductPage;
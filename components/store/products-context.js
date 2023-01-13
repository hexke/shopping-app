import { createContext, useEffect, useState } from "react";


export const ProductsContext = createContext({
    products: [],
    setAllProducts: () => { },
    getProducts: async () => { },
});

const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([]);

    const setAllProducts = (newProducts) => {
        setProducts(newProducts);
    }

    const getProducts = async () => {
        const response = await fetch('/api/products');
        const body = await response.json();

        const result = body.products;

        setProducts(result);
    }

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(body => {
                setProducts(body.products)
            })
            .catch(err => console.log(err));
    }, []);

    const contextValue = { products: products, setProducts: setAllProducts, getProducts: getProducts };

    return (
        <ProductsContext.Provider value={contextValue}>
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;
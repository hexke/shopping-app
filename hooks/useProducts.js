import { ProductsContext } from "../components/store/products-context";
import { useContext } from "react";

const useProducts = () => {
    const products = useContext(ProductsContext).products;

    return products;
}

export default useProducts;
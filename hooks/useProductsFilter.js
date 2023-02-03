import { useCallback, useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/store/products-context";

const useProductsFilter = () => {
    const products = useContext(ProductsContext).products;
    const [filteredProducts, setFilteredProducts] = useState(products);

    const filterProducts = useCallback((query) => {
        setFilteredProducts(products.filter(product => product.name.includes(query)));
    }, []);

    return { products, filteredProducts, filterProducts };
};

export default useProductsFilter;
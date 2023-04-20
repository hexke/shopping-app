import { useContext } from 'react';
import { ProductsContext } from '../components/store/products-context';

const useProducts = () => {
    const { products } = useContext(ProductsContext);

    return products;
};

export default useProducts;

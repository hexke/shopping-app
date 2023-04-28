import Alerts from '../components/alert/alerts';
import Layout from '../components/layout/layout';
import AlertContextProvider from '../components/store/alerts-context';
import CartContextProvider from '../components/store/cart-context';
import ProductsContextProvider from '../components/store/products-context';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <AlertContextProvider>
            <ProductsContextProvider>
                <CartContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                        <Alerts />
                    </Layout>
                </CartContextProvider>
            </ProductsContextProvider>
        </AlertContextProvider>
    );
}

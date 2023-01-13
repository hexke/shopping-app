import Alerts from '../components/alert/alerts';
import Layout from '../components/layout/layout'
import AlertContextProvider from '../components/store/alerts-context';
import ProductsContextProvider from '../components/store/products-context';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
    return (
        <AlertContextProvider>
            <ProductsContextProvider>
                <Layout>
                    <Component {...pageProps} />
                    <Alerts />
                </Layout>
            </ProductsContextProvider>
        </AlertContextProvider>
    );
}

import Alerts from '../components/alert/alerts';
import Layout from '../components/layout/layout';
import AlertContextProvider from '../components/store/alerts-context';
import CartContextProvider from '../components/store/cart-context';
import ProductsContextProvider from '../components/store/products-context';
import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

function App({ Component, pageProps }) {
    
    return (
        <UserProvider>
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
        </UserProvider>
    );
}

export default App;

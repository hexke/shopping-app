import { Fragment } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

function Layout({ children }) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;

import { Fragment } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";


const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </Fragment>
    );
}

export default Layout;
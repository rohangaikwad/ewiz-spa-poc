import './header/header.scss';

import Header from "./header";
import Footer from "./footer";
import Nav from "./header/Nav";
import Sidebar from "./header/Sidebar";

const Layout = ({children}) => {

    return (
        <>
            <Header />
            <Nav />
            <Sidebar />
            <div id="main-content">{children}</div>            
            <Footer />
        </>
    )
}

export default Layout;
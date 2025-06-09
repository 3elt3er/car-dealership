import {FC, ReactNode} from "react";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";


interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    );
};

export default Layout;
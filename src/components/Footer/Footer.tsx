import { FC } from "react";
import classes from "./Footer.module.sass";

const Header: FC = () => {

    return (
        <footer className={classes.headOfPage}>
            <div className={classes.contacts}>
                <h4>Telegram: @elt3er</h4>
                <h4>art.adilgereev@gmail.com</h4>
            </div>
            <div className={classes.number}>
                <h4>+7 (930) 983 69 93</h4>
                <h4>Артем Адилгереев</h4>
            </div>
        </footer>
    );
};

export default Header;

import { FC, useEffect, useState } from "react";
import classes from "./Header.module.sass";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useNavigate } from "react-router-dom";
import ModalShoppingCart from "../ModalShoppingCart/ModalShoppingCart.tsx";

const Header: FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [shopCartItemsCount, setShopCartItemsCount] = useState(0);

    const navigate = useNavigate();

    const shopCartList = useSelector((state: RootState) => state.cart.items);


    useEffect(() => {
        setShopCartItemsCount(shopCartList.length);
    }, [shopCartList]);

    return (
        <>
            <header className={classes.headOfPage}>
                <div className={classes.name}>
                    <h1 onClick={() => navigate(`/`)}>SUPERJET CAR</h1>
                </div>
                <button className={classes.cartButton} onClick={() => setIsCartOpen(true)}>
                    <FaShoppingCart size={40} />
                </button>
                <div className={classes.cartCounter}>{shopCartItemsCount}</div>
            </header>
            <ModalShoppingCart isCartOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Header;

import { FC, useEffect, useRef, useState } from "react";
import classes from "./Header.module.sass";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { clearCart, removeFromCart } from "../../store/reducers/CartSlice.ts";
import { ICar } from "../../models/ICar.ts";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
    type Car = Pick<ICar, 'id' | 'brand' | 'name' | 'price' | 'url'>;

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [shopCartItemsCount, setShopCartItemsCount] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openDetails = (car: Car) => {
        navigate(`/car/${car.id}`);
        setIsCartOpen(false);
    };

    const deleteItemFromCart = (car: Car) => {
        dispatch(removeFromCart(car.id));
    };

    const clearItemsFromCart = () => {
        dispatch(clearCart());
    };

    const shopCartList = useSelector((state: RootState) => state.cart.items);

    const shopCartSum = shopCartList.reduce((sum, car) => {
        return sum + Number(car.price.replace(/\s/g, ''));
    }, 0);

    useEffect(() => {
        setShopCartItemsCount(shopCartList.length);
    }, [shopCartList]);

    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setIsCartOpen(false);
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsCartOpen(false);
        };

        document.addEventListener("keydown", handleEsc);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

            {isCartOpen && (
                <div className={classes.cartModal}>
                    <div ref={modalRef} className={classes.cartContent}>
                        <button
                            className={classes.modalCloseIcon}
                            onClick={() => setIsCartOpen(false)}
                            aria-label="Закрыть"
                        >
                            <FaTimes size={18} />
                        </button>
                        <h2>Корзина</h2>
                        {shopCartList.map(car => (
                            <div onClick={() => openDetails(car)} className={classes.cartItem} key={car.id}>
                                <img className={classes.cartItemImage} src={car.url} alt={car.name} />
                                <div className={classes.cartItemInfo}>
                                    <div className={classes.cartItemNaming}>
                                        <div className={classes.cartItemBrand}>{car.brand}</div>
                                        <div className={classes.cartItemName}>{car.name}</div>
                                    </div>
                                    <div className={classes.cartItemPrice}>{car.price.toLocaleString()} ₽</div>
                                </div>
                                <button
                                    className={classes.cartItemRemove}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteItemFromCart(car);
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                        <div className={classes.cartSum}>Итого: {shopCartSum.toLocaleString()} ₽</div>
                        {shopCartList.length > 0 && (
                            <div className={classes.buttonsMenu}>
                                <button className={classes.clearButton} onClick={clearItemsFromCart}>
                                    Очистить корзину
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;

import {FC, useEffect, useRef} from 'react';
import classes from "./ModalShoppingCart.module.sass";
import {FaTimes} from "react-icons/fa";
import {clearCart, removeFromCart} from "../../store/reducers/CartSlice.ts";
import {ICar} from "../../models/ICar.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";

interface ModalShoppingCartProps {
    isCartOpen?: boolean;
    onClose: () => void;
}

const ModalShoppingCart: FC<ModalShoppingCartProps> = ({isCartOpen, onClose}) => {

    type Car = Pick<ICar, 'id' | 'brand' | 'name' | 'price' | 'url'>;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shopCartList = useSelector((state: RootState) => state.cart.items);

    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener("keydown", handleEsc);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const shopCartSum = shopCartList.reduce((sum, car) => {
        console.log(typeof car.price)
        return sum + car.price
    }, 0);

    const openDetails = (car: Car) => {
        navigate(`/car/${car.id}`);
        onClose();
    };

    const deleteItemFromCart = (car: Car) => {
        dispatch(removeFromCart(car.id));
    };

    const clearItemsFromCart = () => {
        dispatch(clearCart());
    };
    return (
        isCartOpen && (<div className={classes.cartModal}>
            <div ref={modalRef} className={classes.cartContent}>
                <button
                    className={classes.modalCloseIcon}
                    onClick={() => onClose()}
                    aria-label="Закрыть"
                >
                    <FaTimes size={18}/>
                </button>
                <h2>Корзина</h2>
                {shopCartList.map(car => (
                    <div onClick={() => openDetails(car)} className={classes.cartItem} key={car.id}>
                        <img className={classes.cartItemImage} src={car.url} alt={car.name}/>
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
        </div>)
    )
}

export default ModalShoppingCart;
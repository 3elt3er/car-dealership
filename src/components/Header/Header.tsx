import {FC, useEffect, useRef, useState} from "react";
import classes from "./Header.module.sass";
import { FaShoppingCart } from "react-icons/fa";
import {useSelector} from "react-redux";    
import {RootState} from "../../store/store.ts";

const Header: FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [shopCartItemsCount, setShopCartItemsCount] = useState(0)

    const shopCartList = useSelector((state: RootState) => state.cart.items)

    let shopCartSum = 0;

    for (const car of shopCartList) {
        shopCartSum += Number(car.price.split(' ').join(''))
    }

    useEffect(() => {
        setShopCartItemsCount(shopCartList.length)
    }, [shopCartList]);


    // const dispatch = useDispatch()

    // const clearCart = dispatch(clearCart)

    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setIsCartOpen(false)
            }
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsCartOpen(false)
        }
        document.addEventListener("keydown", handleEsc)
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("keydown", handleEsc)
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])




    return (
        <>
            <header className={classes.headOfPage}>
                <div className={classes.name}>
                    <h1>SUPERJET CAR</h1>
                </div>
                <button className={classes.cartButton} onClick={() => setIsCartOpen(true)}>
                    <FaShoppingCart size={40} />
                </button>
                <div className={classes.cartCounter}>{shopCartItemsCount}</div>
            </header>

            {isCartOpen && (
                <div className={classes.cartModal}>
                    <div ref={modalRef} className={classes.cartContent}>
                        <h2>Корзина</h2>
                        {shopCartList.map(car => (
                            <div className={classes.cartItem} key={car.id}>
                                <img className={classes.cartItemImage} src={car.url} alt={car.name} />
                                <div className={classes.cartItemInfo}>
                                    <div className={classes.cartItemNaming}>
                                        <div className={classes.cartItemBrand}>{car.brand}</div>
                                        <div className={classes.cartItemName}>{car.name}</div>
                                    </div>
                                    <div className={classes.cartItemPrice}>{car.price.toLocaleString()} ₽</div>
                                </div>
                                <button className={classes.cartItemRemove}>
                                    Удалить
                                </button>
                            </div>
                        ))}
                        <div className={classes.cartSum}>Итого: {shopCartSum.toLocaleString()} ₽</div>
                        <button className={classes.closeButton} onClick={() => setIsCartOpen(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;

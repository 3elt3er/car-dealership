import {FC, useEffect, useState} from "react";
import classes from "./CarInfo.module.sass";
import {useParams} from "react-router-dom";
import {carAPI} from "../../services/CarService.ts";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../store/reducers/CartSlice.ts";
import {RootState} from "../../store/store.ts";


const CarInfo: FC = () => {

    const [isButtonActive, setIsButtonActive] = useState(true);
    const { id } = useParams()
    const dispatch = useDispatch()

    const { data: car, isLoading, error } = carAPI.useFetchByCarIdQuery(id!, {
        skip: !id,
    })

    const shopCartList = useSelector((state: RootState) => state.cart.items)

    useEffect(() => {
        if (car) {
            if (shopCartList.find(item => item.id === car.id)) {
                setIsButtonActive(false)
            } else {
                setIsButtonActive(true)
            }
        }
    }, [car, shopCartList]);


    if (isLoading) return <div>Загрузка...</div>
    if (error || !car) return <div>Авто не найдено.</div>



    const addCarToCart = () => {
        setIsButtonActive(false)
        dispatch(addToCart({
            id: car.id,
            name: car.name,
            price: car.price,
            brand: car.brand,
            url: car.url
        }))
    }


    return (
        <div className={classes.carPage}>
            <div>
                <img src={car.url} alt={car.name} className={classes.carImage} />
            </div>
            <div className={classes.rightBlock}>
                <h1 className={classes.carTitle}>{car.brand} {car.name}</h1>
                <div className={classes.price}>{car.price.toLocaleString()} ₽</div>

                <div className={classes.specs}>
                    <div>Пробег: {car.mileage} км</div>
                    <div>Год выпуска: {car.year}</div>
                    <div>Тип двигателя: {car.engineType}</div>
                    <div>Объем двигателя: {car.engineVolume} л</div>
                    <div>Мощность двигателя: {car.horsePower} л.с.</div>
                    <div>Трансмиссия: {car.transmission}</div>
                </div>

                <button className={isButtonActive ? classes.button : classes.buttonDisabled} onClick={addCarToCart}>{isButtonActive ? 'Добавить в корзину' : 'Уже в корзине'}</button>
            </div>
        </div>

    );
};

export default CarInfo;
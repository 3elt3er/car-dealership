import {FC} from "react";
import {ICar} from "../../models/ICar.ts";
import '../../App.css'
import classes from "./CarItem.module.sass";
import { useNavigate } from "react-router-dom";


interface CarItemProps {
    Car: ICar;
    remove: (Car: ICar) => void;
    update: (Car: ICar) => void;
}

const CarItem: FC<CarItemProps> = ({Car}) => {


    const navigate = useNavigate()

    const openDetails = () => {
        navigate(`/car/${Car.id}`)
    }

    return (
        <div onClick={openDetails} className={classes.car}>
            <img src={Car.url} alt='Автомобиль'/>
            <div className={classes.description}>
                <h4>{Car.brand} {Car.name}</h4>
                <div className={classes.price}>{Car.price.toLocaleString()} ₽</div>
            </div>
            {/*<button >Delete</button>*/}
        </div>
    );
};

export default CarItem;
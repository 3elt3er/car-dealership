import {FC} from "react";
import {ICar} from "../../models/ICar.ts";
import '../../App.css'
import classes from "./CarItem.module.sass";
interface CarItemProps {
    Car: ICar;
    remove: (Car: ICar) => void;
    update: (Car: ICar) => void;
}

// remove, update
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CarItem: FC<CarItemProps> = ({Car}) => {

    // const handleRemove = (event: React.MouseEvent<HTMLElement>) => {
    //     event.stopPropagation()
    //     remove(Car)
    // }

    // const handleUpdate = () => {
    //     const brand = prompt() || ''
    //     const name = prompt() || ''
    //     const price = Number(prompt()) || 0
    //     const url = prompt() || ''
    //     update({...Car, brand, name, price, url })
    // }

    return (
        <div className={classes.car}>
            <img src={Car.url} alt='Автомобиль'/>
            <div className={classes.description}>
                <h4>{Car.brand} {Car.name}</h4>
                <div className={classes.price}>{Car.price} ₽</div>
            </div>
            {/*<button onClick={handleRemove}>Delete</button>*/}
        </div>
    );
};

export default CarItem;
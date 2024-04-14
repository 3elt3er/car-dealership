import React, {FC} from "react";
import {ICar} from "../models/ICar.ts";
import '../App.css'
interface CarItemProps {
    Car: ICar;
    remove: (Car: ICar) => void;
    update: (Car: ICar) => void;
}


const CarItem: FC<CarItemProps> = ({Car, remove, update}) => {

    const handleRemove = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        remove(Car)
    }

    const handleUpdate = () => {
        const brand = prompt() || ''
        const name = prompt() || ''
        const price = Number(prompt()) || 0
        const url = prompt() || ''
        update({...Car, brand, name, price, url })
    }

    return (
        <div className="Car" onClick={handleUpdate}>
            {Car.brand}.{Car.name}. {Car.price}.
            <img style={{width: '20%'}} src={Car.url}/>
            <button onClick={handleRemove}>Delete</button>
        </div>
    );
};

export default CarItem;
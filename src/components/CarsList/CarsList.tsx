import CarItem from "../CarItem/CarItem.tsx";
import {carAPI} from "../../services/CarService.ts";
import {ICar} from "../../models/ICar.ts";
import {FC} from "react";
import classes from "./CarsList.module.sass";

const CarsList: FC = () => {
    // eslint-disable-next-line no-empty-pattern
    // const [createCar, {}] = carAPI.useCreateCarMutation()

    const {data: cars} = carAPI.useFetchAllCarsQuery(50, {
        pollingInterval: 10000
    })
    // eslint-disable-next-line no-empty-pattern
    // const [deleteCar, {}] = carAPI.useDeleteCarMutation()
    // eslint-disable-next-line no-empty-pattern
    const [updateCar, {}] = carAPI.useUpdateCarMutation()

    // const handleCreate = async () => {
    //     const brand = prompt('Brand')
    //     const name = prompt('Name')
    //     const price = prompt('price')
    //     const url = prompt('url')
    //
    //     await createCar({brand, name, price, url} as unknown as ICar)
    // }

    const handleRemove = (car: ICar) => {
        // deleteCar(car);
        console.log(car)
    }

    const handleUpdate = (car: ICar) => {
        updateCar(car)
    }
    return (
        <>
            {/*<button onClick={() => handleCreate()}>Добавить машину</button>*/}
            <div className={classes.carList}>
                {cars && cars.map(car =>
                    <CarItem Car={car} remove={handleRemove} update={handleUpdate} key={car.id}/>
                )}
            </div>
        </>

    );
};

export default CarsList;
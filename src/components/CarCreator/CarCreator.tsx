import { FC, useState, ChangeEvent } from "react";
import classes from "./CarCreator.module.sass";
import {ICar} from "../../models/ICar.ts";
import * as React from "react";
import {carAPI} from "../../services/CarService.ts";

const CarCreator: FC = () => {

    type ICreateCar = Omit<ICar, 'id'>

    const [createCar] = carAPI.useCreateCarMutation()

    const [values, setValues] = useState({
        brand: '',
        name: '',
        price: '',
        url: '',
        mileage: '',
        year: '',
        engineType: '',
        engineVolume: '',
        horsePower: '',
        transmission: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const preparedValues: ICreateCar = {
            ...values,
            price: Number(values.price),
            mileage: Number(values.mileage),
            year: Number(values.year),
            engineVolume: Number(values.engineVolume),
            horsePower: Number(values.horsePower),
        };


        console.log("Отправка данных:", preparedValues);

        await createCar(preparedValues as unknown as ICar)



    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Добавить автомобиль</h1>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.row}>
                    <label>Марка</label>
                    <input
                        type="text"
                        name="brand"
                        placeholder="Например: BMW"
                        value={values.brand}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Модель</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Например: M5"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Цена (₽)</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Например: 5300000"
                        value={values.price}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Ссылка на фото</label>
                    <input
                        type="url"
                        name="url"
                        placeholder="https://..."
                        value={values.url}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Пробег (км)</label>
                    <input
                        type="number"
                        name="mileage"
                        placeholder="Например: 35000"
                        value={values.mileage}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Год выпуска</label>
                    <input
                        type="number"
                        name="year"
                        placeholder="Например: 2022"
                        value={values.year}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Тип двигателя</label>
                    <input
                        type="text"
                        name="engineType"
                        placeholder="Например: Бензин"
                        value={values.engineType}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Объем двигателя (л)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="engineVolume"
                        placeholder="Например: 4.4"
                        value={values.engineVolume}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Мощность (л.с.)</label>
                    <input
                        type="number"
                        name="horsePower"
                        placeholder="Например: 600"
                        value={values.horsePower}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.row}>
                    <label>Трансмиссия</label>
                    <select
                        name="transmission"
                        value={values.transmission}
                        onChange={handleChange}
                    >
                        <option value="автомат">автомат</option>
                        <option value="механика">механика</option>
                        <option value="робот">робот</option>
                    </select>
                </div>

                <button type="submit" className={classes.button}>Создать</button>
            </form>
        </div>
    );
};

export default CarCreator;

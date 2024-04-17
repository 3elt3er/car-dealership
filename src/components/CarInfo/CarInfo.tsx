import {FC} from "react";
import classes from "./CarInfo.module.sass";


const CarInfo: FC = () => {
    return (
        <div className={classes.container}>
            <img src='https://jetcar24.ru/wp-content/uploads/2024/04/9201f69a520e3af91880eb00dcad701c.jpg' alt="Фото авто"/>
        </div>
    );
};

export default CarInfo;
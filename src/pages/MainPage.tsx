import {FC} from "react";
import CarsList from "../components/CarsList/CarsList.tsx";

const MainPage: FC = () => {
    return (
        <div className="App">
            {/*<CarFilter/>*/}
            <CarsList/>

        </div>
    );
};

export default MainPage;
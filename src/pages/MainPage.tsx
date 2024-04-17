import {FC} from "react";
import Header from "../components/Header/Header.tsx";
import CarsList from "../components/CarsList/CarsList.tsx";

const MainPage: FC = () => {
    return (
        <div className="App">
            <Header/>
            {/*<CarFilter/>*/}
            <CarsList/>

        </div>
    );
};

export default MainPage;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "../pages/MainPage.tsx";
import CarInfo from "./CarInfo/CarInfo.tsx";


const AppRouter = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/shop" element={<MainPage/>}/>
                    <Route path="/car" element={<CarInfo/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
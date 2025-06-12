import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "../pages/MainPage.tsx";
import CarInfo from "./CarInfo/CarInfo.tsx";
import Layout from "../components/Layout/Layout.tsx";
import CarCreatorPage from "../pages/CarCreatorPage.tsx";


const AppRouter = () => {
    return (
        <Router>
            <div className="App">
                <Layout>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/car/:id" element={<CarInfo/>}/>
                        <Route path="/createCar" element={<CarCreatorPage/>}/>
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
};

export default AppRouter;
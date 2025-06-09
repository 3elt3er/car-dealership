import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "../pages/MainPage.tsx";
import CarInfo from "./CarInfo/CarInfo.tsx";
import Layout from "../components/Layout/Layout.tsx";


const AppRouter = () => {
    return (
        <Router>
            <div className="App">
                <Layout>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/car/:id" element={<CarInfo/>}/>
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
};

export default AppRouter;
import CarsList from "./components/CarsList/CarsList.tsx";
import Header from "./components/Header/Header.tsx";
// import CarFilter from "./components/CarFilter/CarFilter.tsx";

const App = () => {

    return (
        <div className="App">
            <Header/>
            {/*<CarFilter/>*/}
            <CarsList/>

        </div>
    );
};

export default App;
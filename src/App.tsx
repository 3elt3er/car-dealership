import {carAPI} from "./services/CarService.ts";
import {ICar} from "./models/ICar.ts";
import CarItem from "./components/CarItem.tsx";

const App = () => {

    const [createCar, {}] = carAPI.useCreateCarMutation()

    const {data: cars, error, isLoading, refetch} = carAPI.useFetchAllCarsQuery(50, {
        pollingInterval: 10000
    })

    const [deleteCar, {}] = carAPI.useDeleteCarMutation()
    const [updateCar, {}] = carAPI.useUpdateCarMutation()

    const handleCreate = async () => {
        const brand = prompt('Brand')
        const name = prompt('Name')
        const price = prompt('price')
        const url = prompt('url')

        await createCar({brand, name, price, url} as unknown as ICar)
    }

    const handleRemove = (car: ICar) => {
        deleteCar(car);
    }

    const handleUpdate = (car: ICar) => {
        updateCar(car)
    }



    return (
        <div className="App">

            <div className='post__list'>
                <button onClick={() => handleCreate()}>Добавить машину</button>

                {cars && cars.map(car =>
                    <CarItem  Car={car} remove={handleRemove} update={handleUpdate} key={car.id} />
                )}
            </div>
        </div>
    );
};

export default App;
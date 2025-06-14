import {combineReducers, configureStore} from "@reduxjs/toolkit";
import carReducer from './reducers/CarSlice'
import cartReducer from './reducers/CartSlice'
import {carAPI} from "../services/CarService.ts";


const rootReducer = combineReducers({
    carReducer,
    cart: cartReducer,
    [carAPI.reducerPath]: carAPI.reducer
})

export const setupStore = () => {
    return configureStore( {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(carAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
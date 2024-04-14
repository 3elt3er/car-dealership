import {ICar} from "../../models/ICar.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCars} from "./ActionCreators.ts";


interface CarState {
    cars: ICar[];
    isLoading: boolean;
    error: string;
}

const initialState: CarState = {
    cars: [],
    isLoading: false,
    error: '',
}

export const CarSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
        builder.addCase(
            fetchCars.fulfilled.type,
            (state, action:PayloadAction<[]>) => {
                state.isLoading = false;
                state.error = "";
                state.cars = action.payload;
            }
        );
        builder.addCase(
            fetchCars.rejected.type,
            (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            }
        );
        builder.addCase(fetchCars.pending.type, (state) => {
            state.isLoading = true;
        });
    }
})

export default CarSlice.reducer
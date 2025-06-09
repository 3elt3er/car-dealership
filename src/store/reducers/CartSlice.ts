import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICar} from "../../models/ICar.ts";

type Car = Pick<ICar, 'id' | 'brand' | 'name' | 'price' | 'url'>;

type CartState = {
    items: Car[];
};

const initialState: CartState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Car>) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = []
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios
 from "axios";
const url = 'https://course-api.com/react-useReducer-cart-project';
const initialState = {
    cartItems: [{id: 1, price: 10, amount: 3}, {id: 2, price: 13, amount: 2}],
    amount: 0,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems',async () => {
   try{
    const resp = await axios(url);
    return resp.data;
   } catch (err) {

   }
})
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => 
            item.id !== itemId)
        },
        increase: (state, {payload}) => {
            const carItem = state.cartItems.find((item) => item.id === payload.id)
            carItem.amount += 1;
        },
        decrease: (state, {payload}) => {
            const carItem = state.cartItems.find((item) => item.id === payload.id)
            carItem.amount -= 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload;
        },
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
    }
    
})

export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions
//console.log(cartSlice);
export default cartSlice.reducer;
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";

export interface Product {
    id: number;
    code: string;
    description: string;
    unit_value: number;
    quantity: number;
}

interface ProductState {
    productsSale: Product[];
}

const initialState: ProductState = {
    productsSale: []
}

export const ProductsSaleSlice=createSlice({
    name: "product",
    initialState,
    reducers:{
        addProduct:(state, action:PayloadAction<{id: number, description: string, code: string, unit_value: number, quantity: number}>)=>{
            state.productsSale.push(action.payload);
        },
        removeProduct:(state, action:PayloadAction<number>) =>{
            const itemId = action.payload
            state.productsSale = state.productsSale.filter(item => item.id !== itemId);
        },
        updateProduct:(state, action:PayloadAction<{id: number, description: string, code: string, unit_value: number, quantity: number}>) =>{
            const indexToUpdate = state.productsSale.findIndex((item) => item.id === action.payload.id);
            if (indexToUpdate !== -1) {
                const updatedItem = { ...state.productsSale[indexToUpdate], ...action.payload };
          
                state.productsSale.splice(indexToUpdate, 1, updatedItem);
              }
        }

    },

})

export default ProductsSaleSlice.reducer;
export const {addProduct, removeProduct, updateProduct} = ProductsSaleSlice.actions;
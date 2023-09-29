import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";

export interface Product {
    id: number;
    code: string;
    description: string;
    unit_value: string;
    commission_percentage: string;
}

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: []
}

export const fetchProduct = createAsyncThunk("product/fetch", async (thunkAPI)=>{
    const response=await fetch(`${apiBaseUrl}/products`, {
        method: "GET"
    });
    const data=response.json();
    return data;
})

export const ProductSlice=createSlice({
    name: "product",
    initialState,
    reducers:{
        addProduct:(state, action:PayloadAction<{id: number, description: string, code: string, unit_value: string, commission_percentage: string}>)=>{
            state.products.push(action.payload);
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchProduct.fulfilled,(state, action)=>{
            state.products=action.payload;
        })
    },
})

export default ProductSlice.reducer;
export const {addProduct} = ProductSlice.actions;
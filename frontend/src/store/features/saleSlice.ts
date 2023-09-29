import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";
import { Product } from "./productSlice";
import { Seller } from "./sellerSlice";
import { Customer } from "./customerSlice";

export interface SaleItem {
    id: number;
    product: Product;
    sold_amount: number;
    sale: number
}

export interface Sale {
    id: number;
    items: SaleItem[];
    seller: Seller;
    customer: Customer;
    invoice: string;
    datetime: string;
}

interface SaleState {
    sales: Sale[];
}

const initialState: SaleState = {
    sales: []
}

export const fetchSale = createAsyncThunk("sale/fetch", async (thunkAPI)=>{
    const response=await fetch(`${apiBaseUrl}/sales`, {
        method: "GET"
    });
    const data=response.json();
    return data;
})

export const SaleSlice=createSlice({
    name: "sale",
    initialState,
    reducers:{
        addSale:(state, action:PayloadAction<Sale>)=>{
            state.sales.push(action.payload);
        },
        removeSale:(state, action:PayloadAction<number>) =>{
            const itemId = action.payload
            state.sales = state.sales.filter(item => item.id !== itemId);
        },
        updateSale:(state, action:PayloadAction<Sale>) =>{
            const indexToUpdate = state.sales.findIndex((item) => item.id === action.payload.id);
            if (indexToUpdate !== -1) {
                const updatedItem = { ...state.sales[indexToUpdate], ...action.payload };
          
                state.sales.splice(indexToUpdate, 1, updatedItem);
              }
        }

    },
    extraReducers:(builder)=> {
        builder.addCase(fetchSale.fulfilled,(state, action)=>{
            state.sales=action.payload;
        })
    },

})

export default SaleSlice.reducer;
export const {addSale, removeSale, updateSale} = SaleSlice.actions;
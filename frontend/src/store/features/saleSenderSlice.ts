import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";
import { Product } from "./productSlice";
import { Seller } from "./sellerSlice";
import { Customer } from "./customerSlice";
interface MiniProduct {
    product: number;
    quantity: number
}

export interface Sale {
    invoice: string;
    datetime: string
    customer: number;
    seller: number;
    products: MiniProduct[]


}

interface SaleSendState {
    sales:  Sale[];
}

const initialState: SaleSendState = {
    sales: []
}

export const fetchSaleSend = createAsyncThunk("sale/fetch", async (sale: any ,thunkAPI)=>{
    console.log("Antes de enviar : ", sale)
    const response=await fetch(`${apiBaseUrl}/sales/`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sale)
    });
    const data= await response.json();
    console.log("Ënviando request ========: ", data)
    return data;
})

export const SaleSendSlice=createSlice({
    name: "saleSender",
    initialState,
    reducers:{
        addSaleSend:(state, action:PayloadAction<Sale>)=>{
            state.sales.push(action.payload);
        },
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchSaleSend.fulfilled,(state, action)=>{
            state.sales.push(action.payload);
        })
    },
})

export default SaleSendSlice.reducer;
export const {addSaleSend} = SaleSendSlice.actions;
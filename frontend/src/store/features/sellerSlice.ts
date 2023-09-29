import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";

export interface Seller {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface SellerState {
    sellers: Seller[];
}

const initialState: SellerState = {
    sellers: []
}

export const fetchSeller = createAsyncThunk("seller/fetch", async (thunkAPI)=>{
    const response=await fetch(`${apiBaseUrl}/sellers`, {
        method: "GET"
    });
    const data=response.json();
    return data;
})

export const SellerSlice=createSlice({
    name: "seller",
    initialState,
    reducers:{
        addSeller:(state, action:PayloadAction<{id: number, name: string, email: string, phone: string}>)=>{
            state.sellers.push(action.payload);
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchSeller.fulfilled,(state, action)=>{
            state.sellers=action.payload;
        })
    },
})

export default SellerSlice.reducer;
export const {addSeller} = SellerSlice.actions;
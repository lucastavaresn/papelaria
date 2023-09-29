import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";

export interface Seller {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface SellerState {
    sellerSale: Seller[];
}

const initialState: SellerState = {
    sellerSale: []
}

export const SellerSaleSlice=createSlice({
    name: "seller",
    initialState,
    reducers:{
        addSeller:(state, action:PayloadAction<{id: number, name: string, email: string, phone: string}>)=>{
            state.sellerSale.push(action.payload);
        }
    },

})

export default SellerSaleSlice.reducer;
export const {addSeller} = SellerSaleSlice.actions;
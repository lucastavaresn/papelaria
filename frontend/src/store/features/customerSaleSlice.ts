import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface CustomerState {
    customerSale: Customer[];
}

const initialState: CustomerState = {
    customerSale: []
}

export const CustomerSaleSlice=createSlice({
    name: "customer",
    initialState,
    reducers:{
        addCustomer:(state, action:PayloadAction<{id: number, name: string, email: string, phone: string}>)=>{
            state.customerSale.push(action.payload);
        }
    },

})

export default CustomerSaleSlice.reducer;
export const {addCustomer} = CustomerSaleSlice.actions;
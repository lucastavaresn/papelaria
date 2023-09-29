import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface CustomerState {
    customers: Customer[];
}

const initialState: CustomerState = {
    customers: []
}

export const fetchCustomer = createAsyncThunk("customer/fetch", async (thunkAPI)=>{
    const response=await fetch(`${apiBaseUrl}/customers`, {
        method: "GET"
    });
    const data=response.json();
    return data;
})

export const CustomerSlice=createSlice({
    name: "customer",
    initialState,
    reducers:{
        addCustomer:(state, action:PayloadAction<{id: number, name: string, email: string, phone: string}>)=>{
            state.customers.push(action.payload);
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchCustomer.fulfilled,(state, action)=>{
            state.customers=action.payload;
        })
    },
})

export default CustomerSlice.reducer;
export const {addCustomer} = CustomerSlice.actions;
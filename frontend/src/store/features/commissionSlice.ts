import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../settings";

export interface Commission {
    code: number;
    seller: string;
    totalSale: number;
    commission: number;
}

interface CommissionState {
    commissions: Commission[];
}

const initialState: CommissionState = {
    commissions: []
}

export const fetchCommission = createAsyncThunk("commission/fetch", async (dates:any,thunkAPI)=>{
    const response=await fetch(`${apiBaseUrl}/seller-commissions/?start_date=${dates.start}&end_date=${dates.end}`, {
        method: "GET"
    });
    const data=await response.json();
    return data;
})

export const CommissionSlice=createSlice({
    name: "commission",
    initialState,
    reducers:{
        addCommission:(state, action:PayloadAction<Commission>)=>{
            state.commissions.push(action.payload);
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchCommission.fulfilled,(state, action)=>{
            state.commissions=action.payload;
        })
    },
})

export default CommissionSlice.reducer;
export const {addCommission} = CommissionSlice.actions;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CurrentSale {
    total: number
}
interface CurrentState {
    currentSale: number;
}

const initialState: CurrentState = {
    currentSale: 0,
}

export const CurrentSaleSlice=createSlice({
    name: "currentSale",
    initialState,
    reducers:{
        addCurrentSale:(state, action:PayloadAction<number>)=>{
            state.currentSale = action.payload;
        }
    },

})

export default CurrentSaleSlice.reducer;
export const {addCurrentSale} = CurrentSaleSlice.actions;
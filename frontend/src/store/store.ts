import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./features/productSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ProductsSaleSlice } from "./features/productSaleSlice";
import { SellerSaleSlice } from "./features/sellerSaleSlice";
import { CustomerSaleSlice } from "./features/customerSaleSlice";
import { CustomerSlice } from "./features/customerSlice";
import { SellerSlice } from "./features/sellerSlice";
import { CurrentSaleSlice } from "./features/currentSaleSlice";

export const store=configureStore({
    reducer:{
        product:ProductSlice.reducer,
        productSale: ProductsSaleSlice.reducer,
        sellerSale: SellerSaleSlice.reducer,
        customerSale: CustomerSaleSlice.reducer,
        customer: CustomerSlice.reducer,
        seller: SellerSlice.reducer,
        currentSale: CurrentSaleSlice.reducer
    }
})

export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;
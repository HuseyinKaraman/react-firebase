import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import products from "./productSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        products,
    },
});

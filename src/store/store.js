import { configureStore } from "@reduxjs/toolkit";
import { productosSlice } from "./slices/productos/productosSlice";


export const store = configureStore( {
    reducer: {
        productos: productosSlice.reducer
    }
})


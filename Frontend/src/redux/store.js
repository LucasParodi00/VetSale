import { configureStore } from "@reduxjs/toolkit";
import { productosSlice } from "./slices/productos/productoSlice";

 



 export const store = configureStore ( {
    reducer:{
        productos: productosSlice.reducer
    }
 })
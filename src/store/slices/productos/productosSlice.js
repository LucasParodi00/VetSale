



import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   productos: [],
   isLoading: false,
}
export const productosSlice = createSlice({
   name: 'productos',
   initialState,
   reducers: {
      cargandoProductos: (state) => {
        state.isLoading = true
      },
      setProductos: ( state, action ) => {
        state.isLoading = false;
        state.productos = action.payload.productos; 
      }
    }
})
export const { cargandoProductos, setProductos } = productosSlice.actions
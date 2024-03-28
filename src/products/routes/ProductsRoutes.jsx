import { Navigate, Route, Routes } from "react-router-dom";
import { ListPage } from "../pages/ListPage";
import { NuevoProducto } from "../pages/NuevoProducto";
import { Navbar } from "../../componets/Navbar";


export const ProductsRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/*" element = {  <ListPage /> } />
                <Route path="/nuevo" element = {  <NuevoProducto />  } />
            </Routes>
        </>
    );
};

import { Route, Routes } from "react-router-dom";
import { ListPage } from "../pages/ListPage";


export const ProductsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element = {  <h1>Ventas</h1>  } />
            <Route path="/p" element = {  <h1>Productos</h1>  } />
        </Routes>
    );
};
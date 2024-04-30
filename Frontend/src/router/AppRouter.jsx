import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/paginas";
import { ProductosRouter } from "./ProductosRouter";
import '../styles';
import 'animate.css';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/productos/*" element={<ProductosRouter />} />
            <Route path="/" element={<LoginPage />} />
        </Routes>
    );
};

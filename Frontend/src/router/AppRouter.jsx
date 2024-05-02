import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/paginas";
import { ProductosRouter } from "./ProductosRouter";
import '../styles';
import 'animate.css';
import { ListUsuarios } from "../auth/paginas/ListUsuarios";
import { UsuariosRouter } from "./UsuariosRouter";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/productos/*" element={<ProductosRouter />} />
            <Route path="/usuarios/*" element={<UsuariosRouter />} />
            <Route path="/" element={<LoginPage />} />
        </Routes>
    );
};

import { Route, Routes } from "react-router-dom";
import { ListaPage } from "../productos/paginas/ListaPage";
import { NuevoProducto } from "../productos/paginas/NuevoProducto";
import { Navbar } from "../componetes";
import { CargaImagen } from "../componetes/CargaImagen";


export const ProductosRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/*" element={<ListaPage />} />
                <Route path="/nuevo/*" element={<NuevoProducto />} />
                <Route path="/imagen" element={<CargaImagen />} />
            </Routes>
        </>
    );
};
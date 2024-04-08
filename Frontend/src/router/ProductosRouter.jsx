import { Route, Routes } from "react-router-dom";
import { ListaPage } from "../productos/paginas/ListaPage";
import { NuevoProducto } from "../productos/paginas/NuevoProducto";
import { Navbar } from "../componetes";


export const ProductosRouter = () => {
    return (
        <>        
            <Navbar />
            <Routes>
                <Route path="/*" element = { <ListaPage /> } />
                <Route path="/nuevo/*" element = { <NuevoProducto />  } />
            </Routes>
        </>
    );
};
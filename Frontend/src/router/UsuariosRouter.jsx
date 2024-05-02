import { Route, Routes } from "react-router-dom"
import { ListUsuarios } from "../auth/paginas/ListUsuarios"
import { Navbar } from "../componetes"


export const UsuariosRouter = () => {
    return (

        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<ListUsuarios />} />

            </Routes>
        </>
    )
}
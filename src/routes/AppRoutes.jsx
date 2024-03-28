import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { AuthProvider } from "../auth/context";
import { ProductsRoutes } from "../products/routes/ProductsRoutes";



export const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/productos/*" element = { <ProductsRoutes /> } />
                <Route path="/" element = { <LoginPage /> } />
            </Routes>
        </AuthProvider>
    );
};
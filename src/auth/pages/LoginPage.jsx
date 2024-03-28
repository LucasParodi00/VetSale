import { useContext } from "react";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
    const navigate = useNavigate ();
    const { login } = useContext ( AuthContext ); 

    const onLogin = () => {
        
        navigate ('/productos', {
            replace: true
        })
    } 

    return (
        <div className="contenedor contenedorCentrado">
            <div className="containerForm">
                <div className="contenedorFormulario">
                    <h1>Iniciar Sesion</h1>
                    <form className="formularioLogin">
                        <label htmlFor="usuario">Usuario</label>
                        <input type="text" placeholder="Ingrese su usuario" />
                        <label htmlFor="password">Contraseña</label>
                        <input type="text" placeholder="Ingrese su contraseña" />
                        <label htmlFor="checkbox"> <input id="checkbox" type="checkbox" /> Mantener sesion iniciada</label>
                        <button onClick={ onLogin } className="btn btnAzul">Iniciar Sesion</button>
                    </form>
                </div>
                <div className="img imgForm">
                    <img src="../../../img/logo.jpeg" alt="Logo Pet Friends" />
                </div>
            </div>
        </div>
    );
};
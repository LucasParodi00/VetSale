import { useReducer } from "react";
import { AuthContext, authReducer } from "./";
import { types } from "./authReducer";


const initialState = {
    logged: false 
}

export const AuthProvider = ( { children } ) => {

    const [ state, dispach ] = useReducer ( authReducer, initialState);
    
    const login = (name = '') => {
        const user = { id: 'ABC', name}
        const action = {
            type: types.login,
            payload: user
        };

        dispach (action);
    }

    const logout = () => {
        const action = { 
            type: types.logout
        }

        dispach (action);
    }

    return (
        <AuthContext.Provider value={ { ...state, login: login, logout: logout} }>
            { children }
        </AuthContext.Provider>
        
    );
}
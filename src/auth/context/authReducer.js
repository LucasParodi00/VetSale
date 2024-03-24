
export const types = {
    login: '[Auth] Login',
    logout: '[Auth] Logout'
}


export const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.login:
            return{              
                ...state,
                logged: true,
                user: action.payload
            };
        
        case types.logout:
            return{
                ...state,
                logged: false,
            };

        default: 
            return state;
    }
}

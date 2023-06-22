import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,

    });

    const navigate = useNavigate();

function login(jwt_token){
    const decodedToken = jwt_decode(jwt_token)
    console.log(decodedToken);
    setAuth({
        ...auth,
        isAuth: true,
        user:{
            username:decodedToken.username,
            id:decodedToken.id
        }

    });
    console.log("gebruiker is ingelogd.");
    navigate('/search')
}
function logout(){
    setAuth({
        ...auth,
        isAuth: false,
        user:null
    });
    console.log('gebruiker is uitgelogd.')
    navigate('/')
}
const data = {
    isAuth: auth.isAuth,
    user: auth.user,
    logout: logout,
    login: login
}

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
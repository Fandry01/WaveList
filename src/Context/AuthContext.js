import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {checkTokenValidity} from "../Helper/Tokenvalidity";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status:"pending"
    });

    const navigate = useNavigate();
useEffect(()=>{
    const storedToken = localStorage.getItem('token')

    if(storedToken && checkTokenValidity(storedToken)){
        void login(storedToken)
    }else{
        setAuth({
            ...auth,
            isAuth: false,
            user:null,
            status: "done"
        })
    }
},[])
function login(jwt_token, redirect){
    const decodedToken = jwt_decode(jwt_token)
    localStorage.setItem('token', jwt_token);
    setAuth({
        ...auth,
        isAuth: true,
        user:{
            username:decodedToken.username,
            id:decodedToken.id
        },
        status:"done"

    });
    console.log("gebruiker is ingelogd.");
    if(redirect)navigate(redirect);
}
function logout(){
    localStorage.removeItem('token');
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
            {auth.status ==="done" ? children: <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
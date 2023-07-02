import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
export const AccessContext = createContext(null);
function SpotifyAuthContextProvider({children}) {
    const [access, setAccess] = useState({
    isAccess:false,
});

const navigate = useNavigate();

function spotifyLogin(jwt_token){
    console.log(jwt_token)
    const decodedToken = jwt_decode(jwt_token);
    console.log(decodedToken)
    setAccess({
        ...access,
        isAccess: true
    })
}
const data ={
    access:access.isAccess,
    spotifyLogin:spotifyLogin

}

    return (
        <AccessContext.Provider value={data}>
            {children}
        </AccessContext.Provider>
    );
}

export default SpotifyAuthContextProvider;
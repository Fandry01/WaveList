import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AccessContext = createContext(null);
function SpotifyAuthContextProvider({children}) {
    const [access, setAccess] = useState({
    isAccess:false,
});
    const [spotifyToken, setSpotifyToken] = useState("");
    const  spotifyid = process.env.SPOTIFY_CLIENT_SECRET
    const spotify_client_id = '23765694ea9d4e41a76fca78df125f67';
    const spotify_client_secret = '9e8d35a5b3754daa93e373f9cf8b9ca3';
    const redirect_uri ="http://localhost:3000";


const [accessToken,setAccessToken] = useState('');

const navigate = useNavigate();
useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    if(token){
    setAccessToken(token)
    }else{
        getTokenFromUrl()
    }
},[])

    function getTokenFromUrl () {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        return code

    }
    useEffect(()=>{

        console.log("dit halen we uit de url",getTokenFromUrl())
        //spotify token
        const _spotifyToken = getTokenFromUrl();
        console.log("dit is de spotifyAuthToken",_spotifyToken);

        if(_spotifyToken) {
            setSpotifyToken(_spotifyToken);
            console.log(spotifyToken);
        }
    },[getTokenFromUrl])

    useEffect(()=>{
        async function getAccessCode(){
            console.log(spotifyToken)
            try{
                const res = await axios.post(
                    'https://accounts.spotify.com/api/token', null, {
                        params: {
                            'grant_type': 'authorization_code',
                            'code':`${spotifyToken}`,
                            'redirect_uri': `${redirect_uri}`,
                            'client_id': `${spotify_client_id}`,
                            'client_secret': `${spotify_client_secret}`
                        }
                    });
                console.log(res)
                setAccessToken(res.data.access_token)
                localStorage.setItem("accessToken",res.data.access_token)
            }catch (e){
                console.error(e)
            }
        }getAccessCode()
    },[spotifyToken])


const data ={
    access:access.isAccess,
    spotifyLogin:getTokenFromUrl,
    accessToken:accessToken
}

    return (
        <AccessContext.Provider value={data}>
            {children}
        </AccessContext.Provider>
    );
}

export default SpotifyAuthContextProvider;
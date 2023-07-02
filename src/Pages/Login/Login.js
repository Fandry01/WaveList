import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../Context/AuthContext";
import axios from "axios";
import {AccessContext} from "../../Context/SpotifyAuth";
import Button from "../../Components/Button/Button";
import "./Login.css";

const spotify_client_id = '23765694ea9d4e41a76fca78df125f67';
const spotify_client_secret = '9e8d35a5b3754daa93e373f9cf8b9ca3';
function Login() {

    const {login,isAuth} = useContext(AuthContext);
    const {spotifyLogin} = useContext(AccessContext);

    const  [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrormessage] = useState(false);


    async function handleSubmit(e){
        e.preventDefault();
        setErrormessage(false);

        try{
            //post request naar de server
            const response = await axios.post(' https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
                username:username,
                password:password
            })
            //jwt token meegeven aan de login functie
            login(response.data.accessToken,'/library');

            if(isAuth === true)
            {
                const res = await axios.post(
                    'https://accounts.spotify.com/api/token', null, {
                        params: {
                            'grant_type': 'client_credentials',
                            'client_id': `${spotify_client_id}`,
                            'client_secret': `${spotify_client_secret}`
                        }
                    });

                // access token moet terug komen
                console.log(res.data);
                spotifyLogin(res.data.access_token);
            }

        } catch (e) {
            console.error("onjuiste e-mail en wachtwoord combinatie.")
            // error message naar de UI
            setErrormessage(true)
            console.error(e);
        }


    }



    return (
        <>
            <div className="loginWrapper">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="loginForm">
                        <input id="username" type="username" placeholder="Login" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                        <input id="password" type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <Button buttonType="submit" variant="loginButton">
                        Login
                    </Button>
                </form>
                {errorMessage &&
                <span className="wrong-login">
                onjuiste e-mail en wachtwoord combinatie.
                </span>}
            </div>
        </>
    );
}

export default Login;
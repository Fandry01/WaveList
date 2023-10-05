import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../Context/AuthContext";
import axios from "axios";
import Button from "../../Components/Button/Button";
import "./login.css";
import {AccessContext} from "../../Context/SpotifyAuth";
import Footer from "../../Components/Footer/Footer";



function login() {
    const {login, isAuth} = useContext(AuthContext);
    const {spotifyLogin} = useContext(AccessContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrormessage] = useState(false);

    const spotify_client_id = '23765694ea9d4e41a76fca78df125f67';
    const redirect_uri = "http://localhost:3000";
    async function handleSubmit(e) {
        e.preventDefault();
        setErrormessage(false);
        try {
            //post request naar de server
            const response = await axios.post(' https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: username,
                password: password
            })
            //jwt token meegeven aan de login functie
            login(response.data.accessToken);
            spotifyLogin();
        } catch (e) {
            console.error("onjuiste e-mail en wachtwoord combinatie.",e);
            // error message naar de UI
            setErrormessage(true);
        }
    }

    const scopes = [
        "user-read-private",
        "user-read-email",
        "playlist-read-private",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "playlist-modify-public",
        "user-read-playback-state",
        "app-remote-control",
        "streaming",
    ]

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${spotify_client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}&response_type=code&show_dialogue=true`


    return (
        <>
            {!isAuth ?
                <div className="login-wrapper">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} className="loginForm">
                        <input id="username" type="username" placeholder="Login" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <input id="password" type="password" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <Button buttonType="submit" variant="loginButton">
                            Login
                        </Button>
                    </form>
                    {errorMessage &&
                        <span className="error-message">
                        onjuiste e-mail en wachtwoord combinatie.
                        </span>}
                </div>
                :
                <div className="signIn-wrapper">
                    <a href={loginUrl} onClick={spotifyLogin} className="signIn-button">Sign in with spotify</a>
                </div>
            }
            <Footer footerName="footer"><p>© Made By Fandry Baffour</p></Footer>
        </>
    );
}

export default login;
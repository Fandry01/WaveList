import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../Context/AuthContext";
import axios from "axios";
import Button from "../../Components/Button/Button";
import "./Login.css";
import {AccessContext} from "../../Context/SpotifyAuth";


const spotify_client_id = '23765694ea9d4e41a76fca78df125f67';
const spotify_client_secret = '9e8d35a5b3754daa93e373f9cf8b9ca3';
const redirect_uri ="http://localhost:3000";

function Login() {

    const {login,isAuth} = useContext(AuthContext);
    const {spotifyLogin} = useContext(AccessContext);
    const  [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrormessage] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [spotifyToken,setSpotifyToken] = useState("");



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
            login(response.data.accessToken);


            spotifyLogin();

        } catch (e) {
            console.error("onjuiste e-mail en wachtwoord combinatie.")
            // error message naar de UI
            setErrormessage(true)
            console.error(e);
        }


    }
    const scopes =[
        "user-read-private",
        "user-read-email",
        "playlist-read-private",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "playlist-modify-public",
        "app-remote-control",
        "streaming"
    ]

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${spotify_client_id}&redirect_uri=${redirect_uri}&scopes=${scopes.join("%20")}&response_type=code&show_dialogue=true`


    //get spotify authorization code from url
    function getTokenFromUrl () {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        return code

    }



//
// function getTokenFromUrl () {
//     return window.location.hash
//         .substring(1)
//         .split('&')
//         .reduce((initial, item) => {
//             let parts = item.split("=");
//             initial[parts[0]] = decodeURIComponent(parts[1])
//             return initial
//         }, {});
//
// }
// useEffect(()=>{
//
//     console.log("dit halen we uit de url",getTokenFromUrl())
//     //spotify token
//     const _spotifyToken = getTokenFromUrl().access_token;
//     window.location.hash="";
//     console.log("dit is de spotifytoken",_spotifyToken);
//
//     if(_spotifyToken){
//         setSpotifyToken(_spotifyToken);
//         async function getAccessCode(){
//             try{
//                 const res = await axios.post(
//                     'https://accounts.spotify.com/api/token', null, {
//                         params: {
//                             'grant_type': 'authorization_code',
//                             'code':`${spotifyToken}`,
//                             'redirect_uri': 'http://localhost:3000',
//                             'client_id': `${spotify_client_id}`,
//                             'client_secret': `${spotify_client_secret}`
//                         }
//                     });
//                 setAccessToken(res.data.access_token)
//                 console.log(res);
//             }catch (e){
//                 console.error(e)
//             }
//         }
//         getAccessCode();
//
//
//         async function getUserid(){
//             try{
//                 console.log(accessToken);
//                 const response =  await axios.get('https://api.spotify.com/v1/me', {
//                     headers: {
//                         'Authorization': 'Bearer' + accessToken
//                     }
//                 });
//                 console.log(response)
//
//             }catch (e) {
//                 console.log(e);
//             }
//
//         }
//         getUserid()
//
//     }
// })



    return (
        <>
            {!isAuth ?
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

                :
                <a href={loginUrl} onClick={spotifyLogin} className="signInButton">Sign in with spotify</a>
            }

        </>
    );
}

export default Login;
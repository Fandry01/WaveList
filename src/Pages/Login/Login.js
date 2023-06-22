import React, {useContext, useState} from 'react';
import {AuthContext} from "../../Context/AuthContext";
import axios from "axios";

function Login() {

    const {login} = useContext(AuthContext);
    const  [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    async function handleSubmit(e){
        e.preventDefault();
        try{
            //post request naar de server
            const response = await axios.post(' https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
                username:username,
                password:password
            })
            //jwt token meegeven aan de login functie
            login(response.data.accessToken);
        } catch (e) {
            console.error("onjuiste e-mail en wachtwoord combinatie.", e)
            // error message naar de UI
        }



    }


    return (
        <>
            <h1> Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <button type="submit">Log In</button>

            </form>
        </>
    );
}

export default Login;
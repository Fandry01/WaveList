import React, {useState} from 'react';
import axios from "axios";

function Register() {
    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
       // post request naar server met de registratieform
        try{
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',{
                email:email,
                username:username,
                password:password,
                role:["user"],
            })

        }catch (e){
            console.error("registratie mislukt",e)
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default Register;
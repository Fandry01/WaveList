import React, {useState} from 'react';
import axios from "axios";
import './Register.css';
import Button from "../../Components/Button/Button";

function Register() {
    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage, setErrormessage] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setErrormessage(false);
       // post request naar server met de registratieform
        try{
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',{
                email:email,
                username:username,
                password:password,
                role:["user"],
            })
            console.log("registratie gelukt");
        }catch (e){
            console.error("registratie mislukt",e)
            setErrormessage(true);
        }

    }

    return (
        <>
                <div className="wrapper">
                    <form onSubmit={handleSubmit} className="registerForm">
                        <h3>Create Account</h3>
                            <input id="username" type="username" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                            <input id="email" type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            <input id="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <Button buttonType="submit" variant="register-button">Register</Button>
                    </form>
                    {errorMessage &&
                        <span className="wrong-register">
                            Registratie is mislukt probeer opnieuw.
                        </span>}
                </div>
        </>
    );
}

export default Register;
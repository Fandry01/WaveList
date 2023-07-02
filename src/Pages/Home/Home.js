import React from 'react';
import './Home.css';
import axios from "axios";
import register from "../Register/Register";
import {useNavigate} from "react-router-dom";

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri ="http://localhost:3000";
function Home() {
    const navigate = useNavigate()
    const navigateToRegister = () => {
        // 👇️ navigate to /register
        navigate('/register');
    };

    async function getSongs(){
    const response = await axios.get('',{
        headers:{
            /*Authorization, params query type*/
        }
    });
    }

    return (
        <div className="Home-wrapper">
            <div className="left-head">
                <span className="head-text">
                    <h3>Where Waves Happens</h3>
                    <p>Listen to your favorite songs and create your own playlists</p>
                </span>
                <button className="homebutton" onClick={navigateToRegister}>REGISTER</button>
            </div>
            <div className="right-head">

            </div>
        </div>
    );
}

export default Home;
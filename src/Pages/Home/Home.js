import React, {useEffect, useState} from 'react';
import './Home.css';
import axios from "axios";
import register from "../Register/Register";
import {useNavigate} from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const spotify_client_id = '23765694ea9d4e41a76fca78df125f67';
const spotify_client_secret = '9e8d35a5b3754daa93e373f9cf8b9ca3';
const redirect_uri ="http://localhost:3000";

function Home() {
    const [accessToken, setAccessToken] = useState("");
    const [spotifyToken,setSpotifyToken] = useState("");

    const navigate = useNavigate()
    const navigateToRegister = () => {
        // 👇️ navigate to /register
        navigate('/register');
    };

    async function getUserid(){
        try{
            console.log(accessToken);
            const response =  await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization':`Bearer ${accessToken}`
                }
            });
            console.log(response)

        }catch (e) {
            console.log(e);
        }

    }

    return (
        <>
        <div className="Home-wrapper">
            <div className="left-head">
                <span className="head-text">
                    <h3>Where Waves Are Created</h3>
                    <p>Listen to your favorite songs and create your own playlists</p>
                </span>
                <button className="homebutton" onClick={navigateToRegister}>REGISTER</button>
            </div>
            <div className="right-head">

            </div>
        </div>

        <div className="businesspoints">
            <div className="home-card">
                <div className="card-content">
                    <h2 className="card-title">
                        love Music
                    </h2>
                    <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, fugiat.</p>

                </div>
            </div>
            <div className="home-card">
                <div className="card-content">
                    <h2 className="card-title">
                        Anytime.Anywhere
                    </h2>
                    <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, fugiat.</p>
                </div>
            </div>
            <div className="home-card">
                <div className="card-content">
                    <h2 className="card-title">
                        Your Handpicked Playlists
                    </h2>
                    <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, fugiat.</p>

                </div>
            </div>
        </div>
            <Footer/>

        </>
    );
}

export default Home;
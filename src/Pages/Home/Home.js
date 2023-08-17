import React, {useEffect, useState} from 'react';
import './Home.css';
import axios from "axios";
import register from "../Register/Register";
import {useNavigate} from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Button/Button";




console.log(process.env);
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
                <Button variant="homebutton" handleClick={navigateToRegister}>Register</Button>
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
                    <p className="card-body">Listen to you favourite songs and playlists and love them</p>

                </div>
            </div>
            <div className="home-card2">
                <div className="card-content">
                    <h2 className="card-title">
                        Anytime.Anywhere
                    </h2>
                    <p className="card-body">Listen to your playlist everywhere and anywhere.</p>
                </div>
            </div>
            <div className="home-card3">
                <div className="card-content">
                    <h2 className="card-title">
                        Your Handpicked Playlists
                    </h2>
                    <p className="card-body">Gather you favorite songs and create playlists</p>

                </div>
            </div>
        </div>
            <div className="faq">
                <h3 className="faq-title">Faq</h3>
                <div className="faq-articles">
                <article>
                    <h4>Why listen to your music on Wavelist?</h4>
                    <p>Wavelist offers the richest catalogue of Hi-Res music for streaming.
                        Quench your thirst for discovery with our panoramas and original selections.</p>
                </article>
                    <article>
                        <h4>How can you stream in high resolution?</h4>
                        <p>Hi-Res streaming is available for everyone! All our applications are compatible with 24-Bit Hi-Res quality.</p>
                    </article>
                    <article>
                        <h4>Do you need a subscription to listen?</h4>
                            <p>Yes, you need an subscription to listen and create playlists</p>
                    </article>
                </div>
            </div>

            <Footer/>

        </>
    );
}

export default Home;
import React from 'react';
import './Home.css';
import axios from "axios";

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri ="http://localhost:3000";
function Home() {

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
                    <p>Where Waves Happen listen and make your playlists</p>
                </span>
            </div>
            <div className="right-head">

            </div>
        </div>
    );
}

export default Home;
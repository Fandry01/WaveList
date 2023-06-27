import React from 'react';
import axios from "axios";

function Player() {

async function playMusic(){
    const response = await axios.put('https://api.spotify.com/v1/me/player/play',{'context_uri': 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
        'offset': {
            'position': 5
        },
        'position_ms': 0
    },{
        headers:{

        }
    })
}

    return (
        <div></div>
    );
}

export default Player;
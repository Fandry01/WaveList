import React from 'react';

import SpotifyPlayer from "react-spotify-web-playback";

function Player({accessToken, trackUri}) {
    console.log(trackUri);
if(!accessToken) return null
    return (
        <SpotifyPlayer token={accessToken} uris={trackUri ? [trackUri]:[]}></SpotifyPlayer>
    );
}

export default Player;
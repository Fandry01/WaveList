import React from 'react';
import spotifyPlayer from 'react-spotify-web-playback'
import SpotifyWebPlayer from "react-spotify-web-playback";

function Player({accessToken, trackUri}) {

    return (
        <SpotifyWebPlayer token={accessToken} uris={trackUri ? [trackUri]:[]}></SpotifyWebPlayer>
    );
}

export default Player;
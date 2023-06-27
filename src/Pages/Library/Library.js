import React, {useState} from 'react';
import axios from "axios";
function Library(props) {
    const spotify_client_id = '23765694ea9d4e41a76fca78df125f67';
    const spotify_client_secret = '9e8d35a5b3754daa93e373f9cf8b9ca3';
    const redirect_uri = "http://localhost:3000";

    const [accessToken, setAccessToken] = useState('');
    const [playlist, setPlayList] = useState({});
    async function getAccess() {
        const token_url = "https://accounts.spotify.com/api/token";

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token', null, {
                    params: {
                        'grant_type': 'client_credentials',
                        'client_id': `${spotify_client_id}`,
                        'client_secret': `${spotify_client_secret}`
                    }
                });

            // access token moet terug komen
            console.log(response.data);
            setAccessToken(response.data.access_token);

        } catch (e) {
            console.error("accesdata niet ontvangen", e);
        }

    }
    async function createPlayList(){

        const response = await axios.post(
            'https://api.spotify.com/v1/users//playlists',
            // '{\n    "name": "New Playlist",\n    "description": "New playlist description",\n    "public": false\n}',
            {
                'name': 'New Playlist',
                'description': 'New playlist description',
                'public': true
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            }
        );
    }
    // create a spotify playlist
    return (
        <div className="playlist-maker">
            <h3> Create A New Playlist</h3>
            <input placeholder="Name of Playlist"/>
            <input placeholder="Description of Playlist"/>
            <button type="button">Create</button>
        </div>
    );
}

export default Library;



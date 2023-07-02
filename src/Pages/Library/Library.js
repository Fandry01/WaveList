import React, {useEffect, useState} from 'react';
import axios from "axios";
function Library() {

    const [name, setName] = useState('');
    const [Description, setDescription] = useState('')

    useEffect(() => {
        async function getUserId() {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': 'Bearer'
                    }
                })

            } catch (e) {
                console.error("UserId niet goed", e);
            }

        }

    }, [])

    async function createPlayList(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://api.spotify.com/v1/users//playlists',
                // '{\n    "name": "New Playlist",\n    "description": "New playlist description",\n    "public": false\n}',
                {
                    name: name,
                    description: Description,
                    public: false
                },
                {
                    headers: {
                        'Authorization': 'Bearer ',
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response);
        } catch (e) {
            console.log("wrong way to call the api", e)
        }

        // create a spotify playlist
        return (
            <>
                <h3> Create A New Playlist</h3>
                <form onSubmit={createPlayList} className="playlist-maker">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                           placeholder="Name of Playlist"/>
                    <input type="text" value={Description} onChange={(e) => setDescription(e.target.value)}
                           placeholder="Description of Playlist"/>
                    <button type="submit">Create</button>
                </form>
            </>
        );
    }
}

export default Library;



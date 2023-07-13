    import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AccessContext} from "../../Context/SpotifyAuth";
function Library() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const[playlist,setPlaylists] = useState([]);
    const {accessToken} = useContext(AccessContext);


    async function createPlayList(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://api.spotify.com/v1/users/fendi01/playlists',
                // '{\n    "name": "New Playlist",\n    "description": "New playlist description",\n    "public": false\n}',
                {
                    name: name,
                    description: description,
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


    }
    useEffect(()=>{
        async function allPlaylists(){
            try{
                const playlists = await axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                console.log(playlists.data.items);
                setPlaylists(playlists)
            }
            catch (e){

            }

        }

    allPlaylists();
    },[])





    return (
        <>
            <h3> Create A New Playlist</h3>

            <form onSubmit={createPlayList} className="playlist-maker">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                       placeholder="Name of Playlist"/>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                       placeholder="Description of Playlist"/>
                <button type="submit">Create</button>
            </form>

            <h3>You're Playlists</h3>

            <div className="card-container">
                { playlist.map((list) => (
                    <div className="card" key={playlist.id}>
                        <img src={list.images[0].url} alt="cover"/>
                        <div className="card-info">
                            <p>Name:{list.name} </p>
                            <p>Tracks:{list.tracks.total}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Library;



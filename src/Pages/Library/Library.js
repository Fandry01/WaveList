    import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AccessContext} from "../../Context/SpotifyAuth";
    import Footer from "../../Components/Footer/Footer";
    import "./Library.css"
    import Button from "../../Components/Button/Button";
    import {AuthContext} from "../../Context/AuthContext";
    import Player from "../../Components/Player/Player";
function Library() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [playlist,setPlaylists] = useState([]);
    const [playTheList, setPlayTheList] = useState([])
    const {accessToken} = useContext(AccessContext);
    const {user :{sub}} = useContext(AuthContext);




    async function createPlayList(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://api.spotify.com/v1/users/fendi01/playlists',
                // '{\n    "name": "New Playlist",\n    "description": "New playlist description",\n    "public": false\n}',
                {
                    name: name,
                    description: description,
                    public: true
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
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
                const getPlaylists = await axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                console.log(getPlaylists.data.items);
                setPlaylists(getPlaylists.data.items);
            }
            catch (e){

            }

        }

    allPlaylists();
    },[])





    return (
        <>
            <h2 className="user-welcome"> Welcome <span>{sub}</span></h2>

            <h3> Create A New Playlist</h3>

            <form onSubmit={createPlayList} className="playlist-maker">
                <input className="input-play" type="text" value={name} onChange={(e) => setName(e.target.value)}
                       placeholder="Name of Playlist"/>
                <input className="input-play" type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                       placeholder="Description of Playlist"/>
                <Button buttonType="submit" variant="list-button">Create</Button>
            </form>

            <h3>My Playlists</h3>

            <div className="card-container">
                { playlist.map((list) => (
                    <div className="card" key={playlist.id}>
                        <img src={list.images[0].url} alt="cover"/>
                        <div className="card-info">
                            <p>Name:{list.name} </p>
                            <p>Tracks:{list.tracks.total}</p>
                        </div>
                        <button type="button" onClick={()=>setPlayTheList(list.uri)}>Play</button>
                    </div>
                ))}
            </div>
            <Player accessToken={accessToken} trackUri={playTheList}/>
            <Footer/>
        </>
    );
}

export default Library;



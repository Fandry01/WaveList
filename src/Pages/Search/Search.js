import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./Search.css";
import Searchbar from "../../Components/SearchBar/Searchbar";
import spotifyAuth, {AccessContext} from "../../Context/SpotifyAuth";
import Button from "../../Components/Button/Button";
import Player from "../../Components/Player/Player";
import Footer from "../../Components/Footer/Footer";




function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [musicData, setMusicData] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');

    const {accessToken} = useContext(AccessContext);
    console.log(accessToken);


    async function searchAll() {
        // een Get request met behulp van de search endpoint om Artist ID te krijgen
    const searchParam = {
       method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': ' Bearer ' + accessToken
         }
     }
       const artistID = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=10`, searchParam)
       console.log(artistID);
        setMusicData(artistID.data.tracks.items);
        console.log(artistID.data.tracks.items);
    }

    useEffect(()=>{
        async function getPlaylist(){
            try{
                const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                setPlaylists(response.data.items);
                console.log(playlists)
            }
            catch (e){
                console.log(e);
            }
        }
        getPlaylist();
    },[])


    const addTrackToPlaylist = async (trackId) => {
        if (!selectedPlaylistId) {
            alert('Please select a playlist');
            return;
        }

        await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                uris: [`spotify:track:${trackId}`],
            },
        });
    };









    return (
        <>
            <div className="search">
                <div className="searchbar-wrapper">
                <Searchbar placeholderValue="Search your favourite number "
                           barName="searchbar"
                           inputValue={searchInput}
                           changeHandler={(e)=> setSearchInput(e.target.value)}></Searchbar>
                <Button buttonType="submit" variant="searchButton" handleClick={searchAll}>Search</Button>
                </div>
                <div>
                    <h3>Choose your Playlist</h3>
                    {playlists.length > 0 && (
                        <select
                            className="dropdownList"
                            value={selectedPlaylistId}
                            onChange={(e) => setSelectedPlaylistId(e.target.value)}
                        >
                            <option value="">Select a Playlist</option>
                            {playlists.map((playlist) => (
                                <option key={playlist.id} value={playlist.id}>
                                    {playlist.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <h3>Your Search Results</h3>
                <div className="card-container">
                    { musicData.map((track) => (
                        <div className="card" key={musicData.id}>
                            <img src={track.album.images[0].url} alt="cover"/>
                            <div className="card-info">
                                <p>Artist:{track.artists[0].name} </p>
                                <p>Track:{track.name}</p>
                                <p>Album:{track.album.name}</p>
                            </div>
                            console.log(track.uri);
                            <button className="add-list" onClick={() =>addTrackToPlaylist(track.uri)}>Add to Playlist</button>
                            <button type="button" onClick="">Play</button>

                        </div>
                    ))}
                </div>
                <div>
                    <Player accessToken={accessToken}/>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Search;
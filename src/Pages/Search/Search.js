import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./Search.css";
import Searchbar from "../../Components/SearchBar/Searchbar";
import Button from "../../Components/Button/Button";
import Player from "../../Components/Player/Player";
import Footer from "../../Components/Footer/Footer";
import {AccessContext} from "../../Context/SpotifyAuth";


function Search() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [musicData, setMusicData] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [song, setSong] = useState('');

    const {accessToken} = useContext(AccessContext);
    console.log(accessToken);

    async function searchAll() {
        setLoading(true);
        try {
            setError(false);
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
        } catch (e) {
            console.log("Couldnt retrieve artist data", e);
            setError(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        async function getPlaylist() {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                })
                setPlaylists(response.data.items);
                console.log(playlists);
            } catch (e) {
                console.log("Cant retrieve your playlists", e);
                setError(true);
            }
            setLoading(false);
        }
        getPlaylist();

    }, [])


    const addTrackToPlaylist = async (trackId) => {
        setLoading(true);
        try {
            setError(false);
            if (!selectedPlaylistId) {
                alert('Please select a playlist');
                return;
            }
            await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`,
                data: {
                    'uris': [`${trackId}`],
                    'position': 0
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (e) {
            console.log("Couldnt retrieve playlist data", e)
            setError(true);
        }
        setLoading(false);
    };


    return (
        <>
            <div className="search">
                <div className="searchbar-wrapper">
                    <Searchbar placeholderValue="Search your favourite number "
                               barName="search-bar"
                               inputValue={searchInput}
                               changeHandler={(e) => setSearchInput(e.target.value)}></Searchbar>
                    <Button buttonType="submit" variant="search-button" handleClick={searchAll}>Search</Button>
                </div>
                <section>
                    {loading && <span className="loading-message">loading..</span>}
                    {error && <span className="error-message">Fout bij het opslaan van data..</span>}
                    <h3>Choose your Playlist</h3>
                    {playlists.length > 0 && (
                        <select
                            className="drop-downList"
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
                </section>
                <h3>Your Search Results</h3>
                <section className="card-container">
                    {loading && <p>loading..</p>}
                    {error && <p>Er is iets misgegaan met het ophalen van de data</p>}
                    {musicData.map((track) => (
                        <div className="card" key={musicData.id}>
                            <img src={track.album.images[0].url} alt="cover"/>
                            <div className="card-info">
                                <p>Artist:{track.artists[0].name} </p>
                                <p>Track:{track.name}</p>
                                <p>Album:{track.album.name}</p>
                            </div>
                            <Button variant="add-list" handleClick={() => addTrackToPlaylist(track.uri)}>Add to
                                Playlist</Button>
                            <Button buttonType="button" handleClick={() => setSong(track.uri)}>Play</Button>
                        </div>
                    ))}
                </section>

                <section className="player-container">
                    <Player accessToken={accessToken} trackUri={song}/>
                </section>
            </div>
            <Footer footerName="footer"><p>© Made By Fandry Baffour</p></Footer>
        </>
    );
}

export default Search;
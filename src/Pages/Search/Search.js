import {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./Search.css";
import Searchbar from "../../Components/SearchBar/Searchbar";
import spotifyAuth, {AccessContext} from "../../Context/SpotifyAuth";
import Button from "../../Components/Button/Button";
import Player from "../../Components/Player/Player";




function Search() {
    const [searchInput, setSearchInput] = useState('')

    const [musicData, setMusicData] = useState([]);

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



    return (
        <>
            <div className="searchbar-wrapper">
            <Searchbar placeholderValue="Artist,Album"
                       barName="searchbar"
                       inputValue={searchInput}
                       changeHandler={(e)=> setSearchInput(e.target.value)}></Searchbar>
            <Button buttonType="submit" variant="searchButton" handleClick={searchAll}>Search</Button>
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
                        <button type="button" onClick="">Play</button>
                        <button type="button">Add To playlist</button>
                    </div>
                ))}
            </div>
            <div>
                <Player accessToken={accessToken} trackUri=""/>
            </div>

        </>
    );
}

export default Search;
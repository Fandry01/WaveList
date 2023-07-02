import {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./Search.css";
import Searchbar from "../../Components/SearchBar/Searchbar";
import spotifyAuth from "../../Context/SpotifyAuth";
import Button from "../../Components/Button/Button";




function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [accessToken, setAccessToken] = useState('');
    const [musicData, setMusicData] = useState([]);

    const access =  useContext(spotifyAuth);


    async function searchAll() {
        // een Get request met behulp van de search endpoint om Artist ID te krijgen
    const searchParam = {
       method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': ' Bearer ' + accessToken
         }
     }
       const artistID = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=5`, searchParam)
       console.log(artistID);
        setMusicData(artistID.data.tracks.items);
        console.log(artistID.data.tracks.items);
         //const singleArtist = artistID.data.artists.items[0].id
    //     //console.log(singleArtist);
    //
    //     // een Get request met Artist ID om alle albums van  dat artiest te krijgen.
    //     //const returnAlbums = await axios.get(`https://api.spotify.com/v1/artists/${singleArtist}/albums?include_groups=album&market=US&limit=20`, searchParam)
    //     //console.log(returnAlbums)
    //     //setAlbums(returnAlbums.data.items)
    //     //set return to set albums
    //     // laat  alle albums zien,
    }
    async function playMusic(){
        const response = await axios.put('https://api.spotify.com/v1/me/player/play',{'context_uri':`${musicData.id}`,
            'offset': {
                'position': 5
            },
            'position_ms': 0
        },{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + accessToken
            }        })

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

            <div>
                { musicData.map((track) => (
                    <div className="card" key={musicData.id}>
                        <img src={track.album.images[0].url} alt="cover"/>
                        <div className="card-info">
                            <p>Artist:{track.artists[0].name} </p>
                            <p>Track:{track.name}</p>
                            <p>Album:{track.album.name}</p>
                        </div>
                        <button type="button">Play</button>
                        <button type="button">Add To playlist</button>
                    </div>
                ))}
            </div>


        </>
    );
}

export default Search;
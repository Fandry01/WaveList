import {useEffect, useState} from "react";
import axios from "axios";
import "./Search.css";
import Searchbar from "../../Components/SearchBar/Searchbar";

const spotify_client_id = '23765694ea9d4e41a76fca78df125f67';
const spotify_client_secret = '9e8d35a5b3754daa93e373f9cf8b9ca3';
const redirect_uri = "http://localhost:3000";


function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [accessToken, setAccessToken] = useState('');
    const [musicData, setMusicData] = useState([]);

    useEffect(() => {
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

        getAccess();
    }, [])

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
        // console.log(artistID);
        setMusicData(artistID.data.tracks.items);
        console.log(artistID.data.tracks.items);

        //const singleArtist = artistID.data.artists.items[0].id
        //console.log(singleArtist);

        // een Get request met Artist ID om alle albums van  dat artiest te krijgen.
        //const returnAlbums = await axios.get(`https://api.spotify.com/v1/artists/${singleArtist}/albums?include_groups=album&market=US&limit=20`, searchParam)
        //console.log(returnAlbums)
        //setAlbums(returnAlbums.data.items)
        //set return to set albums
        // laat  alle albums zien,
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

            <div className="searchbar">
                <input
                    type="text"
                    name="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Artist, genre, Album"
                />
                <button type="submit" onClick={searchAll}> search</button>
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

export default Search
import {useEffect, useState} from "react";
import axios from "axios";

const spotify_client_id = '23765694ea9d4e41a76fca78df125f67';
const spotify_client_secret = '9e8d35a5b3754daa93e373f9cf8b9ca3';
const redirect_uri ="http://localhost:3000";



function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [accessToken, setAccessToken] = useState('');
    const [albums, setAlbums] = useState([]);

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
        const artistID = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParam)
        console.log(artistID);
        const singleArtist = artistID.data.artists.items[0].id
        console.log(singleArtist);

        // een Get request met Artist ID om alle albums van  dat artiest te krijgen.
        const returnAlbums = await axios.get(`https://api.spotify.com/v1/artists/${singleArtist}/albums?include_groups=album&market=US&limit=20`, searchParam)
        console.log(returnAlbums)
        setAlbums(returnAlbums.data.items)
        //set return to set albums
        // laat  alle albums zien,
    }


    return (
        <>
        <span className="searchbar">
            <input
                type="text"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Artist, genre, Album"
            />
           <button type="submit" onClick={searchAll}> search</button>
       </span>


        </>
    );
}

export default Search
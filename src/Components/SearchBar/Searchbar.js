import React, {useState} from 'react';

function Searchbar() {
    const [query, setQuery] = useState('');

    return (
       <span className="searchbar">
        <input
            type="text"
            name="search"
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            placeholder="zoek je favo music"
        />
           <button type="submit"> search</button>
       </span>
    );
}

export default Searchbar;     
import React, {useState} from 'react';
import "./Searchbar.css"

function Searchbar({type,name,value,onChange,placeholder, handleClick, buttonType}) {
    const [query, setQuery] = useState('');

    return (
       <span className="searchbar">
        <input
            type="text"
            name="search"
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            placeholder=""
        />
           <button type={buttonType} onClick={handleClick}> Testing</button>
       </span>
    );
}

export default Searchbar;     
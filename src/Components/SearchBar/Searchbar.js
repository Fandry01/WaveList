import React, {useState} from 'react';
import "./Searchbar.css"

function Searchbar({type,barName,inputValue,changeHandler,placeholderValue,}) {


    return (
       <span className="searchbar">
        <input
            type="text"
            name={barName}
            value={inputValue}
            onChange={changeHandler}
            placeholder={placeholderValue}
        />
       </span>
    );
}

export default Searchbar;     
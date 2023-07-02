import React from 'react';

function Card(props) {
    return (
        <div className="card" key="">
            <img src="" alt="cover"/>
            <div className="card-info">
                <p>Artist:{} </p>
                <p>Track:{}</p>
                <p>Album:{}</p>
            </div>
            <button type="button">Play</button>
            <button type="button">Add To playlist</button>
        </div>
    );
}

export default Card;
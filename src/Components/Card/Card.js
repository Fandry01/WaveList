import React from 'react';
import Button from "../Button/Button";

function card({cardName,cardInfo}) {
    return (
        <div className={cardName} key="">
            <img src="" alt="cover"/>
            <div className={cardInfo}>
                <p>Artist:{} </p>
                <p>Track:{}</p>
                <p>Album:{}</p>
            </div>
            <Button buttonType="button">Play</Button>
            <Button buttonType="button">Add to playlist</Button>
        </div>
    );
}

export default card;
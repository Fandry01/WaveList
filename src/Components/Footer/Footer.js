import React from 'react';
import "./Footer.css";
import {Link} from "react-router-dom";
function Footer() {
    return (
        <div className="footer">
            <div className="footer-items">
                <Link to="/">Home</Link>
                <Link to="/">Home</Link>
                <Link to="/library">Library</Link>
                <Link to="/Search">Search</Link>
            </div>
            <div className="designer">
                <p>© Made By Fandry Baffour</p>
            </div>

        </div>
    );
}

export default Footer;
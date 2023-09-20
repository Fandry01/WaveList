import React from 'react';
import "./Footer.css";
import {Link} from "react-router-dom";
function Footer({children,footerName}) {
    return (
       <footer className={`${footerName}`}>
           {children}
       </footer>
    );
}

export default Footer;
import React from 'react';
import {NavLink} from "react-router-dom";
import './Navigation.css';
function Navigation(props) {
    return (
        <nav>
            <div className="nav-box">
                <h4>The Wave List</h4>
                <ul>

                    <li>
                        <NavLink to="/" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=> isActive ? 'active-menu-link': 'default-menu-link'}
                                 to={"/Search"}>Search</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=> isActive ? 'active-menu-link': 'default-menu-link'}
                        to={"/login"}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=> isActive ? 'active-menu-link': 'default-menu-link'}
                        to={"/register"}>Register</NavLink>
                    </li>
                    <button type="button">Log in</button>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
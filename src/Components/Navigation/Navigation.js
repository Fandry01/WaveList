import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import './Navigation.css';
import Button from "../Button/Button";
import {AuthContext} from "../../Context/AuthContext";
function Navigation() {
    const {isAuth,logout} = useContext(AuthContext);

    return (
        <nav>
            <div className="nav-box">
                <h4>The Wave List</h4>
                <ul>

                    <li>
                        <NavLink to="/" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                        >Home</NavLink>
                    </li>
                    { isAuth && <li>
                        <NavLink className={({isActive})=> isActive ? 'active-menu-link': 'default-menu-link'}
                                 to={"/Search"}>Search</NavLink>
                    </li>}
                    {isAuth && <li>
                        <NavLink className={({isActive})=> isActive ? 'active-menu-link': 'default-menu-link'}
                                 to={"/library"}>Library</NavLink>
                    </li>}
                    {!isAuth &&<li>
                        <NavLink className={({isActive})=> isActive ? 'active-menu-link': 'default-menu-link'}
                        to={"/login"}>Login</NavLink>
                    </li>}
                    {!isAuth&&<li>
                        <NavLink className={({isActive})=> isActive ? 'active-menu-link': 'default-menu-link'}
                        to={"/register"}>Register</NavLink>
                    </li>}
                </ul>
                {isAuth &&
                <Button buttonType="button" handleClick={logout} variant="logout-button">logout</Button>}
            </div>
        </nav>
    );
}

export default Navigation;
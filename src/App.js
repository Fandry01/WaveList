import './App.css';
import './Pages/Home/home';

import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/home";
import Register from "./Pages/Register/register";
import Login from "./Pages/Login/login";
import Navigation from "./Components/Navigation/Navigation";
import Search from "./Pages/Search/Search";
import Library from "./Pages/Library/library";


function App() {

    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/library" element={<Library/>}/>
            </Routes>

        </>
    );
}

export default App;

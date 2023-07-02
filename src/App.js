import './App.css';
import './Pages/Home/Home';

import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Navigation from "./Components/Navigation/Navigation";
import Search from "./Pages/Search/Search";
import Library from "./Pages/Library/Library";





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

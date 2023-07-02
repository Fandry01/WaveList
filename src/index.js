import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext";
import SpotifyAuthContextProvider from "./Context/SpotifyAuth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <AuthContextProvider>
              <SpotifyAuthContextProvider>
                  <App />
              </SpotifyAuthContextProvider>
          </AuthContextProvider>
      </Router>
  </React.StrictMode>
);



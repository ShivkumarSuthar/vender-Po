// App.js
import React, { useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import Login from './Login';

import "./App.css"
import Home from './Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set isLoggedIn state to true upon successful login
  };

  return (
   
      <div>
        <Routes>
          <Route path="/Login" element={isLoggedIn ? <Home /> : <Login handleLoginSuccess={handleLoginSuccess} />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Login handleLoginSuccess={handleLoginSuccess} />} />
        </Routes>
       
      </div>
 
  );
};

export default App;

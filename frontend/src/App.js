// App.js
import React, { useState } from 'react';
import Login from './components/Login/Login';
import "./assets/css/App.css"
import Home from './components/main/Home';

const App = () => {
  const [userName, setUserName]=useState("")
  const [levels, setLevels]=useState("")
  const [userID, setUserID] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set isLoggedIn state to true upon successful login
  };

  const handleUser=(e)=>{
setUserName(e)
  }
  const handleUserId=(e)=>{
    setUserID(e)
      }
  
  return (
   
      <div>
      {isLoggedIn ? <Home user={userName} levels={levels} userID={userID} /> : <Login handleLoginSuccess={handleLoginSuccess} handleUser={handleUser} levels={(e)=>setLevels(e)} userID={handleUserId}/>}
      {/* <PoItemTable/> */}
      </div>
 
  );
};

export default App;

import logo from './logo.svg';
import './App.css';
import AuthBox from './components/containers/AuthBox/AuthBox'
import { useState } from 'react';

function App() {

  // Used to store JWT access token in memory where it is safe!
  const [userData, setUserData] = useState({
    access: '',
    refresh: '',
    email: '',
    name: '',
    isLoggedIn: false,
  })

  // Passed to the Login componet so it can set global userData
  const updateUserData = (name, value) => {
    setUserData((userData) => ({
    ...userData,
    [name]: value,
  }));
  };

  
  return (
    <div className="App">
      <p> Name: {userData.name}<br/>
          email: {userData.email}<br/>
          access: {userData.access}<br/>
          refresh: {userData.refresh}<br/>
          logged in: {userData.isLoggedIn}<br />
      </p>
      <AuthBox userData={userData} updateUserData={updateUserData}/>
    </div>
  );
}

export default App;

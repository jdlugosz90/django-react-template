
import './App.css';
import Home from './components/containers/Home/Home'
import Profile from './components/containers/Profile/Profile'
import { useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';


function App() {

  // Used to store JWT access token in memory where it is safe!
  const [userData, setUserData] = useState({
    access: '',
    refresh: '',
    email: '',
    name: '',
    isAuthenticated: false,
  })

    console.log(userData['isAuthenticated'])
  // Passed to the Login componet so it can set global userData
  const updateUserData = (name, value) => {
    setUserData((userData) => ({
    ...userData,
    [name]: value,
  }));
  };

  
  return (
    <div className="App">
    
      <BrowserRouter>
          <Switch>
            <Route 
              exact path='/' 
              render={(props) => 
                // Props final destination Login.js & Register.js
                <Home {...props} userData={userData} updateUserData={updateUserData} />
              } 
            />

            <Route 
              exact path='/profile' 
              render={(props) => 
                // Props final destination Login.js & Register.js
                <Profile {...props} userData={userData} updateUserData={updateUserData} />
              } 
            />
          </Switch>
      </BrowserRouter>
    

      
    </div>
  );
}

export default App;
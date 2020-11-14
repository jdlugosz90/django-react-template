import React, { Component, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import AuthBox from '../AuthBox/AuthBox'

const Home = (props) => {

    console.log('home render')

      // Redirect the user to profile if authenticated
  if (props.userData['isAuthenticated']){
    return <Redirect to='/Profile'/>
  }else{
    return ( 
        <div>
            {/* Props from App.js */}
            <AuthBox userData={props.userData} updateUserData={props.updateUserData}/>
        </div>
     );
    }
}
 
export default Home;
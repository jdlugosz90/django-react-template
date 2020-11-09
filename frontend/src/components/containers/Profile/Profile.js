import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


const Profile = (props) => {
      // Redirect the user to profile if authenticated
  if (props.userData['isAuthenticated']){
    return ( 
        <div className='profile'>
         <p> Name: {props.userData.name}<br/>
          email: {props.userData.email}<br/>
          access: {props.userData.access}<br/>
          refresh: {props.userData.refresh}<br/>
          logged in: {props.userData.isAuthenticated}<br />
      </p>
            <h1> Your Profile!</h1>
        </div>
     );
    
  }else{
    return <Redirect to='/'/>
  }
}
 
export default Profile;
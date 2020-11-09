import React, { Component } from 'react';
import AuthBox from '../AuthBox/AuthBox'

const Home = (props) => {
    return ( 
        <div>
            {/* Props from App.js */}
            <AuthBox userData={props.userData} updateUserData={props.updateUserData}/>
        </div>
     );
}
 
export default Home;
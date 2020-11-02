import React, { Component, useReducer, useState } from 'react';
import './Authbox.css'
import Login from './Login'
import Register from './Register'


const AuthBox = (props) => {

    // used to set which component is active
    const [component, setComponent] = useState('login')


    if (component === 'login'){
        // Show login component
        return(
           <div className='auth-container'>
               <h3>Login</h3>
                <Login updateUserData={props.updateUserData}/>
                <p> Need and account? <button onClick={() => setComponent('register')}>Create Account</button></p>
                
            </div>
        );
    }
    if (component === 'register'){
        // Show register component
        return(
           <div className='auth-container'>
               <h3>Register</h3>
                <Register />
                <p> Have an account? <button onClick={() => setComponent('login')}>Login</button></p>
            </div>
        );
    }

}

export default AuthBox;
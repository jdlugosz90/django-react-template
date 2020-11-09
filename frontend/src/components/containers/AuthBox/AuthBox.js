import React, { Component, useReducer, useState } from 'react';
import './Authbox.css'
import Login from './Login'
import Register from './Register'


const AuthBox = (props) => {

    // used to set which component is active
    const [VisableComponent, setComponent] = useState('login')


    if (VisableComponent === 'login'){
        // Show login component
        return(
           <div className='auth-container'>
               <h3>Login</h3>
                {/* Props from Home.js */}
                <Login userData={props.userData} updateUserData={props.updateUserData}/>
                <p> Need and account? <button onClick={() => setComponent('register')}>Create Account</button></p>
                <p> Forgot password? <button onClick={() => setComponent('passwordReset')}>Reset password</button></p>
                
            </div>
        );
    }
    if (VisableComponent === 'register'){
        // Show register component
        return(
           <div className='auth-container'>
               <h3>Register</h3>
                <Register setComponent={setComponent}/>
                <p> Have an account? <button onClick={() => setComponent('login')}>Login</button></p>
            </div>
        );
    }

    if (VisableComponent === 'passwordReset'){
        // Show password reset email sent component
        return(
           <div className='auth-container'>
               <h3>Email sent</h3>
                <p> Go back to login <button onClick={() => setComponent('login')}>Login page</button></p>
            </div>
        );
    }
}

export default AuthBox;
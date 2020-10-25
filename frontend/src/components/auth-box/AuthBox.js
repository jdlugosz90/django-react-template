import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {useInput} from './hooks/input-hook.js'
import axios from "axios";
import './AuthBox.css'

function AuthBox (props) {

    const { value:username, bind:bindUserName, reset:resetUserName } = useInput('');
    // const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:password, bind:bindpassword, reset:resetPassword } = useInput('');



 
    const handleSubmit = (event) => {
        event.preventDefault();

    }


    const login = (event) => {
        event.preventDefault();
        axios({
            method: 'get',
            url:`/accounts/login/`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            }).then( function (res) {
                axios({
                    method: 'post',
                    url:`/accounts/login/`,
                    // params: {csrfmiddlewaretoken : Cookies.get('csrftoken'),
                    //         login : {username},
                    //         password: {password}
                    //         },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 
                         'csrfmiddlewaretoken=' + Cookies.get('csrftoken') + '&login='+ bindUserName.value + '&password=' + bindpassword.value
                    ,
                    })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(res => {
                        console.log('post error')
                    })
            })
            .catch(res => {
                console.log('post error')
            })

        // console.log({firstName})
        // console.log({email})
        // console.log({password})
        // resetFirstName();
        // resetEmail();
        // resetPassword();
    }

    const signup = (event) => {
        event.preventDefault();

        axios({
            method: 'get',
            url:`/accounts/signup/`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            })
            .then(res => {
                axios({
                    method: 'post',
                    url:`/accounts/signup/`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 
                        'csrfmiddlewaretoken=' + Cookies.get('csrftoken') + '&login='+ {username} + '&password=' + {password}
                    ,
                    })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(res => {
                        console.log('post error')
                    })
                console.log(Cookies.get('csrftoken'))
            })
            .catch(res => {
                console.log('post error')
            })

        // console.log({firstName})
        // console.log({email})
        // console.log({password})
        // resetFirstName();
        // resetEmail();
        // resetPassword();
    }
    return (
        <div className='signup-container'>
            <h3>Sign up now!</h3>
            <form className="signup-form" onSubmit={handleSubmit} > 
            
                <input className='form-input' {...bindUserName} type="text" placeholder='Username'/>
                {/* <input className='form-input' {...bindEmail} type="email" placeholder='Email'/> */}
                <input className='form-input' {...bindpassword} type="password" placeholder='Password'/>
                <div
                 className='form-btns'>
                     <input className='btn' type="submit" onClick={login} value="Login" />
                    <input className='btn' type="submit" onClick={signup} value="Sign up" />
                </div>
                
            </form>
            <p>{username}</p>
        </div>
      );
}
 
export default AuthBox;
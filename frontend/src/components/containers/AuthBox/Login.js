import React, { useState } from 'react';
import axios from "axios";



const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // This is called destructuring. It cleans up the code by simplifying the variables. 
    // A short example is user.email = email after destructuring
    const {email, password} = formData;


    const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
    }


    const onSubmit = e => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({email, password});


        
        axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
        .then(function(res){
            console.log(res)
            // set a global variable with the login status and the login response
            // Look at 24:56 on the video mentions in notes
        }).catch(function(res){
            console.log(res.response.data.detail)
        })
        ;
        
    };

    //is user authenticated?
    //redirectr to home page
    return ( 

        <form className="auth-form" onSubmit={e => onSubmit(e)} >
            <div className="auth-input">
            {/* Email input field  */}
            <input 
            className='form-input' 
            type="email" 
            placeholder='Email' 
            name="email" 
            value={email}
            onChange={e => onChange(e)}
            required
            />
            {/* Password input field */}
            <input 
            className='form-input'  
            type="password" 
            placeholder='Password'
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            required
            />
            </div>
            {/* Action buttons */}
            <div
             className='form-btns'>
                 <button className='btn' type="submit">Login</button>
            </div>
            
        </form>
 
     );
}

// const mapStateToProps = state = => ({
//     //is authenticated?
// })

export default Login;
import React, {useState } from 'react';
import axios from "axios";



const Register = () => {

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        re_password: '',
    });

    // This is called destructuring. It cleans up the code by simplifying the variables. 
    // A short example is user.email = email after destructuring
    const {email, name, password, re_password} = formData;


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
        const body = JSON.stringify({email, name, password, re_password});
        axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)
        .then(function(res){
            console.log(res)
            // set a global variable with the login status and the login response
            // Look at 24:56 on the video mentions in notes
        }).catch(function(res){
            console.log(res)
        })
        ;
        
    };

    //is user authenticated?
    //redirectr to home page
    return ( 
        <form className="auth-form" onSubmit={e => onSubmit(e)} >
            <div className="auth-input">
            {/* Name input field  */}
            <input 
            className='form-input' 
            type="text" 
            placeholder='Name' 
            name="name" 
            value={name}
            onChange={e => onChange(e)}
            required
            />
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
            {/* Confirm Password input field */}
            <input 
            className='form-input'  
            type="password" 
            placeholder='Retype Password'
            name="re_password"
            value={re_password}
            onChange={e => onChange(e)}
            minLength='6'
            required
            />
            </div>
            {/* Action buttons */}
            <div
             className='form-btns'>
                 <button className='btn' type="submit">Register</button>
            </div>
            
        </form>
    
     );
}

// const mapStateToProps = state = => ({
//     //is authenticated?
// })

export default Register;
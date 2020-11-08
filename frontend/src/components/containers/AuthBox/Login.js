import React, { useState } from "react";
import axios from "axios";
import App from "../../../App";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
  const [formError, setFormError] = useState()

  const showFormError = (error) => {
    const errorDiv = <div className='error-msg'><p>{error}</p></div>
    setFormError(errorDiv)
  }


  // This is called destructuring. It cleans up the code by simplifying the variables.
  // A short example is user.email = email after destructuring
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFocus = (e) => {
    setFormError('')
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
      .then(res => {
        // Set the JWT tokens in memory. State is lifted to App.js
        props.updateUserData('access', res.data.access)
        props.updateUserData('refresh', res.data.refresh)
        props.updateUserData('isLoggedIn', true)
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + res.data.access,
            Accept: "application/json",
          },
        };
        axios
          .get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
          .then(res =>  {
            props.updateUserData('name', res.data.name)
            props.updateUserData('email', res.data.email)
            setFormData((formData) => ({...formData, 'email': ''}));
            setFormData((formData) => ({...formData, 'password': ''}));
            setFormError('')
            Array.from(document.querySelectorAll("input")).forEach(
              input => (input.value = ""))

          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err =>  {
        showFormError(err.response.data.detail)
      });
  };
  

  return (
    <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
      <div className="auth-input">
        {/* Email input field  */}
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          onFocus={(e) => onFocus(e)}
          required
        />
        {/* Password input field */}
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          onFocus={(e) => onFocus(e)}
          minLength="6"
          required
        />
      </div>
      {formError}
      {" "}
      {/* Action buttons */}
      <div className="form-btns">
        <button className="btn" type="submit">
          {" "}
          Login{" "}
        </button>{" "}
      </div>
    </form>
  );
};

// const mapStateToProps = state = => ({
//     //is authenticated?
// })

export default Login;

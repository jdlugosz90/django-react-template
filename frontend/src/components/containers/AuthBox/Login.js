import React, { useEffect, useState } from "react";
import axios from "axios";


const Login = (props) => {

  // Component state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // This is called destructuring. It cleans up the code by simplifying the variables.
  // A short example is user.email = email after destructuring
  const { email, password } = formData;
  const [formError, setFormError] = useState()

  useEffect(() => {
    console.log('is authenticated ' + props.userData['isAuthenticated'])
  },[props.userData['isAuthenticated']])


  const showFormError = (error) => {
    const errorDiv = <div className='error-msg'><p>{error}</p></div>
    setFormError(errorDiv)
  }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFocus = (e) => {
    setFormError('')
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      let JWT =  await createJWT();
      localStorage.setItem('access', JWT.data.access);
      localStorage.setItem('refresh', JWT.data.refresh);
      let user = await getUserData(JWT.data.access);
      clearForm();
      updateState(JWT, user);
    } catch (error){
      showFormError(error.response.data.detail)
    } 
  };
  
  const clearForm = () => {
    setFormData((formData) => ({...formData, 'email': ''}));
    setFormData((formData) => ({...formData, 'password': ''}));
    setFormError('')
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = ""))
  };

  const updateState = (JWT, user) => {
    props.updateUserData('access', JWT.data.access)
    props.updateUserData('refresh', JWT.data.refresh)
    props.updateUserData('isAuthenticated', true)
    props.updateUserData('name', user.data.name)
    props.updateUserData('email', user.data.email)
  };

  const createJWT = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });
    return axios
      .post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
  }

  const getUserData = async (accessToken) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + accessToken,
        Accept: "application/json",
      },
    };
    return axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
  }


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




export default Login;

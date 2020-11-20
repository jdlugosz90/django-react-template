import React, { useContext, useEffect, useState, } from "react";
import axios from "axios";
import useAuthenticate from './Hooks/useAuthenticate'





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
  const {status, error, Authenticate} = useAuthenticate()


  // Show error if there is one from useAuthenticate
  useEffect(() => {
    if(status === 'ERROR'){
      const errorDiv = <div className='error-msg'><p>{error}</p></div>
      setFormError(errorDiv)
    }
   },[error])

  //  Clear the form if status is OK from useAuthenticate
   useEffect(() => {
    if(status === 'OK'){
      clearForm();
    }
   },[status])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFocus = (e) => {
    setFormError('')
  };

  const onSubmit =  (e) => {
    e.preventDefault();
    Authenticate(email, password);
  };
  
  const clearForm = () => {
    setFormData((formData) => ({...formData, 'email': ''}));
    setFormData((formData) => ({...formData, 'password': ''}));
    setFormError('')
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = ""))
  };

  // const updateState = (JWT, user) => {
  //   props.updateUserData('access', JWT.data.access)
  //   props.updateUserData('refresh', JWT.data.refresh)
  //   props.updateUserData('isAuthenticated', true)
  //   props.updateUserData('name', user.data.name)
  //   props.updateUserData('email', user.data.email)
  // };


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

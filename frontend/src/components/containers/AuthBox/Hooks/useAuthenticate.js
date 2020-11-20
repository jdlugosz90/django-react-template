import React, {useState, useEffect, useContext } from 'react';
import axios from "axios";



const useAuthenticate = () => {

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setRefreshToken(localStorage.getItem('refresh'))
  }, [refreshToken] )

  const clearStatus = () => {
    setStatus('')
    setError('')
  }
  const Authenticate = (email, password) => {
    clearStatus();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });
    

   axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
    .then((response) => {
      setAccessToken(response.data.access)
      setRefreshToken(response.data.refresh)
      localStorage.setItem('refresh', response.data.refresh);
      setIsAuthenticated(true)
      setStatus('OK')
    }).catch((error) => {
      setStatus('ERROR')
      setError(error.response.data.detail)
    })  
  };

  return {status, error, Authenticate }

}

export default useAuthenticate;
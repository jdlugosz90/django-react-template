import React, {
  useState,
  useEffect
} from 'react';
import axios from "axios";



export default function useAuthenticate(email, password) {

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [error, setError] = useState('');

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    password,
  });

  const getTokens = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
    setAccessToken(response.data.access)
    setRefreshToken(response.data.refresh)
    localStorage.setItem('refresh', refreshToken);
  };


  useEffect(() => {
    try{
      getTokens();
    } catch (e) {
      setError(e.response.data.detail)
      return error
    }
    
  }, [])


}



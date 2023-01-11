import React, { useEffect, useContext } from 'react';
import GoogleTokenDataContext from "../GoogleTokenDataContext";
import {  useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const SignIn = () => {
  const { googleTokenData, setGoogleTokenData} = useContext(GoogleTokenDataContext);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {setGoogleTokenData(tokenResponse)},
    onError: (tokenResponse) => console.log("Login Failed"),
    prompt: 'consent',
    scope: "openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
  });


  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"

  const navigate = useNavigate();

  return (
    <div className="SignIn-div">
      <button
          onClick={() => login()}
          style={{width: '20em'}}
          >
            Sign In Your Gmail
      </button>
     </div>
  )
}

export default SignIn

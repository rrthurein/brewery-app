import React, { useContext, useEffect, useState } from 'react';
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { googleLogout } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import jwt_decode from "jwt-decode";




const PlanYourBrewDay = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext)
  const [user, setUser] = useState({}); //need this state to become global useContext
  const [events, setEvents] = useState({});


  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

  // const calendar = google.calendar({version : "v3"});
  const CLIENT_ID = "890654996682-urq2der67lj97k6nj0dcrk9kkj6ts3oi.apps.googleusercontent.com"
  // const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"

  const handleCallBackResponse = (response) => {
    console.log("Enconded Jwt ID token " + response.credential)
    var userObject = jwt_decode(response.credential)
    console.log("jwt_decode", userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  const handleSignOut = (event) => {
   setUser({});
   document.getElementById("signInDiv").hidden = false
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
       { theme: "outline", size: "large" });

     const events = addEvent(calendarID, apiKey);
     setEvents(events);


    google.accounts.id.prompt();
  }, []);
  //if we have no user: sign in button if we have a user show log out button

    var event = {
    summary: "Hello World",
    location: "",
    start: {
      dateTime: "2022-11-28T09:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2022-11-28T17:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

    const addEvent = (calendarID, event) => {
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            return [true, response];
          },
          function (err) {
            console.log(err);
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };

  const chooseBeer = () => {
    if(addingBeer === true) {
      return (
        <h2>Show Date</h2>
      );}
      else {
        return(
          <section className="BeerList">
          <h1>Choose A Beer</h1>
          <div className="BeerListBorder">
          { beerList.map((beer) => {
            return(
              <div key={beer.id}>
              <button id="selectButton" type="button">{beer.beerName}</button>
              </div>
            )})
          }
          </div>
          </section>
        );

      }
    }


    return (
      // <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
      {chooseBeer()}
      <div id="signInDiv"></div>
      { user &&
        <div>
          <picture>
            <img src={user.picture}></img>
          </picture>
          <h3>{user.name}</h3>
        </div>

      }
      {
        Object.keys(user).length != 0 && <button onClick={ (e) => handleSignOut(e) }>Sign Out</button>
      }
      <button style={{width: 100, height: 50}} onClick={addEvent}>Add Event</button>
      </div>

    )

  }

  export default PlanYourBrewDay


      // const responseGoogle = credentialResponse => {
      //   console.log(credentialResponse)
      // }
      // const responseError = error => {
      //   console.log('Login Failed')
      // }



  // {<GoogleLogin
  //   clientId={process.env.REACT_APP_CLIENT_ID}
  //   buttonText="Sign in & Authorize Calendar"
  //   onSuccess={responseGoogle}
  //   onFailure={responseError}
  //   cookiePolicy={'single_host_origin'}
  //   // this is important if you don’t do it you won’t get refresh token on the backend server
  //   // this is from react-google-login npm package
  //   responseType="code"
  //   accessType="offline"
  //   //so that we can use this code we get back from the google authorization on the
  //   // backend server we can get the refresh token which can be used even when they're offline
  //   //basically it means that we can use the refresh token generated on this code anytime
  //   scope="openid profile email https://www.googleapis.com/auth/calendar"
  //   //we need to put in the calendar scope for the refresh token because we need to access google calendar
  //   />}

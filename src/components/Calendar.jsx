import React, { useContext, useState } from 'react';
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { googleLogout } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import jwt_decode from "jwt-decode";
import DateTimePicker from 'react-datetime-picker';
import PopUp from "./PopUp";



const Calendar = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext)
  const [user, setUser] = useState({}); //need this state to become global useContext
  const [events, setEvents] = useState({});
  const [time, setTime] = useState(new Date());
  const [popUp, setPopUp] = useState(false);

  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;


  // const calendar = google.calendar({version : "v3"});
  const CLIENT_ID = "890654996682-urq2der67lj97k6nj0dcrk9kkj6ts3oi.apps.googleusercontent.com"
  // const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"


  const setDateCalendar = () => {
    var event = {
      summary: "It's also working",
      location: "",
      start: {
        dateTime: time,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: time,
        timeZone: "America/Los_Angeles",
      }
    }
    console.log("event", event)

    function initiate() {
      gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
        method: "POST",
        body: event,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ya29.a0AeTM1icf_GevVQzxVyC4_Fbqe94ySAKM04p_izGemTu88TfUiQfAbQeFq8rM6K5gV7DnrocPh5XxFP_9RaA7Dl5YpW4Zn-3HMTS6jUUFIDohu-jnPNQxMWA9X6HVW06lwlWsUoguwAEduAQAu5QR1HEBCgaJaCgYKAcMSARASFQHWtWOmVH1ehHUmd0N4VMohMo8VIg0163`,
        },
      })
      .then(
        (response) => {
          console.log("sucess", response)
          return [true, response];

        },
        function (err) {
          console.log(err);
          return [false, err];
        }
      );

      // setPopUp(!popUp);
      console.log("time", time)
    }
      gapi.load("client", initiate);
  }
  return (

    <div>
    {
      !popUp ?
      <>
      <DateTimePicker
      onChange={(e) => {
        console.log("event", e)
        setTime(e)
      }
    }
    value={time} disableClock={true}
    format={"y-MM-dd h:mm:ss a"}
    className="dateTimePicker"
    />  <button onClick={setDateCalendar}>Schedule Beer</button>
    </> : <PopUp />
  }


  </div>

)

}

export default Calendar
// {chooseBeer()}
// <div id="signInDiv"></div>
// { user &&
//   <div>
//   <picture>
//   <img src={user.picture}></img>
//   </picture>
//   <h3>{user.name}</h3>
//   </div>
//
// }
// {
//   Object.keys(user).length != 0 && <button onClick={ (e) => handleSignOut(e) }>Sign Out</button>
// }

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

// const chooseBeer = () => {
//   if(addingBeer === true) {
//     return (
//       <h2>Show Date</h2>
//     );}
//     else {
//       return(
//         <section className="BeerList">
//         <h1>Choose A Beer</h1>
//         <div className="BeerListBorder">
//         { beerList.map((beer) => {
//           return(
//             <div key={beer.id}>
//             <button id="selectButton" type="button">{beer.beerName}</button>
//             </div>
//           )})
//         }
//         </div>
//         </section>
//       );
//
//     }
//   }

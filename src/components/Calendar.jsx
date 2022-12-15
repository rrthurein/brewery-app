  import React, { useContext, useState } from 'react';
  import BeerListContext from "../BeerListContext";
  import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
  import SelectedRecipeContext from "../SelectedRecipeContext";
  import BeerTypeContext from "../BeerTypeContext";
  // import { GoogleLogin } from '@react-oauth/google';
  // import { googleLogout } from '@react-oauth/google';
  import jwt_decode from "jwt-decode";
  import DateTimePicker from 'react-datetime-picker';
  import PopUp from "./PopUp";
  import { calculateBrewingSchedule  } from "../util.js";

  const Calendar = (props) => {
    const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
    const { beerList, setBeerList } = useContext(BeerListContext)
    const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
    const { beerType, setBeerType } = useContext(BeerTypeContext);
    const [startTime, setStartTime] = useState(new Date());
    const [popUp, setPopUp] = useState(false);

    const schedulingParameters = selectedRecipe.schedulingParameters

    const responseGoogle = credentialResponse => {
      console.log(credentialResponse)
    }
    const responseError = error => {
      console.log('Login Failed')
    }
 //   const testCocde = (startTime) => {
 //     let startDate = []
 //     let endTime = []
 //     startDate.push(new Date(startTime))
 //     let endDateValue = startTime.setDate(startTime.getDate() + 12)
 //     console.log(
 //       "brewDate.getDate()", startTime.getDate(),
 //        startTime.setDate(startTime.getDate() + 12)
 //     )
 //     endTime.push(new Date(endDateValue))
 //     console.log(startDate, endTime)
 //   }

    return (

      <section>
        {
          !popUp ?
          <>
              <DateTimePicker
                onChange={(e) => {
                  setStartTime(e)
                }}
                value={startTime}
                disableClock={true}
                format={"y-MM-dd h:mm:ss a"}
                className="dateTimePicker"
              />
              <div className="scheduleBeer">
            <button onClick={() => {
                  calculateBrewingSchedule(startTime, beerType, schedulingParameters)
                  // testCocde(startTime)
                  setPopUp(!popUp)
                }}>
                Schedule Beer</button>
              </div>
           </> :
              <PopUp />
      }
    </section>

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
  //
  //
  // <GoogleLogin
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
  //   useOneTap
  //   />
  //


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

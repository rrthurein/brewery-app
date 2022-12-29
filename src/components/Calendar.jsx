  import React, { useContext, useState } from 'react';
  import BeerListContext from "../BeerListContext";
  import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
  import SelectedRecipeContext from "../SelectedRecipeContext";
  import GoogleSignInContext from "../GoogleSignInContext";
  import BeerTypeContext from "../BeerTypeContext";
  import DateTimePicker from 'react-datetime-picker';
  import { calculateBrewingSchedule  } from "../util.js";
  import { useNavigate } from 'react-router-dom'; //Navigating Programmatically

  const Calendar = () => {
    const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
    const { beerList, setBeerList } = useContext(BeerListContext)
    const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
    const { beerType, setBeerType } = useContext(BeerTypeContext);
    const { googleSignIn, setGoogleSignIn } = useContext(GoogleSignInContext);
    const [startTime, setStartTime] = useState(new Date());

    const schedulingParameters = selectedRecipe.schedulingParameters

    const navigate = useNavigate();
    console.log(beerType)
    const accessToken = googleSignIn.access_token

    return (

       <div className="calendarPage-div">
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
                  calculateBrewingSchedule(startTime, beerType, schedulingParameters, accessToken)
                  navigate("success-page")
                }}>
                Schedule Beer</button>
              </div>
     </div>

  )

  }

  export default Calendar




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

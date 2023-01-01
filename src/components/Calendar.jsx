  import React, { useContext, useState } from 'react';
  import BeerListContext from "../BeerListContext";
  import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
  import SelectedRecipeContext from "../SelectedRecipeContext";
  import GoogleSignInContext from "../GoogleSignInContext";
  import DateTimePicker from 'react-datetime-picker';
  import { calculateBrewingSchedule  } from "../util.js";
  import { useNavigate } from 'react-router-dom'; //Navigating Programmatically

  const Calendar = () => {
    const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
    const { beerList, setBeerList } = useContext(BeerListContext)
    const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
    const { googleSignIn, setGoogleSignIn } = useContext(GoogleSignInContext);
    const [startTime, setStartTime] = useState(new Date());

    const schedulingParameters = selectedRecipe.schedulingParameters

    const navigate = useNavigate();
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
                  calculateBrewingSchedule(startTime, schedulingParameters, accessToken)
                  navigate("success-page")
                }}>
                Schedule Beer</button>
          </div>
      </div>

  )

  }

  export default Calendar

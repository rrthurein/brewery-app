  import React, { useContext, useState } from 'react';
  import SelectedRecipeContext from "../SelectedRecipeContext";
  import GoogleTokenDataContext from "../GoogleTokenDataContext";
  import DateTimePicker from 'react-datetime-picker';
  import { calculateBrewingSchedule  } from "../util.js";
  import { useNavigate } from 'react-router-dom'; //Navigating Programmatically

  const Calendar = () => {
    const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
    const { googleTokenData, setGoogleTokenData } = useContext(GoogleTokenDataContext);
    const [startTime, setStartTime] = useState(new Date());

    const schedulingParameters = selectedRecipe.schedulingParameters

    const navigate = useNavigate();
    const accessToken = googleTokenData.access_token

    const tokenExpired = () => {
      //re-sign in when the user access token expires
      if (localStorage.getItem('success') === "200") {
        console.log("working")
        navigate("success-page")
      } else if (localStorage.getItem('err') === "401") {
        console.log("not working")
        localStorage.removeItem('err')
        setGoogleTokenData({})
        navigate("/")
      }
    }

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
                setTimeout(() => tokenExpired(), 1000)
              }}>
                Schedule Beer</button>
          </div>
      </div>

  )

  }

  export default Calendar

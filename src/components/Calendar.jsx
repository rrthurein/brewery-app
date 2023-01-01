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

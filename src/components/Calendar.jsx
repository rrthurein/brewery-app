  import React, { useContext, useState } from 'react';
  import SelectedRecipeContext from "../SelectedRecipeContext";
  import GoogleTokenDataContext from "../GoogleTokenDataContext";
  import DateTimePicker from 'react-datetime-picker';
  import PopUp from "../components/PopUp"
  import { calculateBrewingSchedule  } from "../util.js";
  import { useNavigate } from 'react-router-dom'; //Navigating Programmatically

  const Calendar = () => {
    const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
    const { googleTokenData, setGoogleTokenData } = useContext(GoogleTokenDataContext);
    const [startTime, setStartTime] = useState(new Date());
    const [fermentationTank, setFermentationTank] = useState(1)
    const [buttonPopUp, setButtonPopUp] = useState(false)

    const schedulingParameters = selectedRecipe.schedulingParameters

    const navigate = useNavigate();
    const accessToken = googleTokenData.access_token
    const selectedRecipeName = selectedRecipe.beerName

    let selectingFermentationTank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    //this code is to remove  the success and err key form localStorage so that tokenExpired function works properly
    console.log(localStorage.removeItem("success"), localStorage.removeItem("err") )

    const handleInputChange = (e) => {
      const newNumber = e.target.value
      setFermentationTank(newNumber)
    }

    const tokenExpired = () => {
      console.log(localStorage)
      //re-sign in when the user access token expires
      if (localStorage.getItem('success')) {
        console.log("success")
        setButtonPopUp(!buttonPopUp)
      } else if(localStorage.getItem('err')) {
        console.log("not working")
        setGoogleTokenData({})
      }
    }

    const checkIfJSONisEmpty = Object.keys(googleTokenData).length === 0

    return (

       <main className="calendarPage-div">

          <div className="date-div">
            <DateTimePicker
              onChange={(e) => {
                setStartTime(e)
              }}
              value={startTime}
              disableClock={true}
              showLeadingZeros={false}
              format={"y-MM-dd"}
              className="dateTimePicker"
            />
          </div>

          <div className="fermentationTank-div">
            <label>Select Your Fementation Tank</label>
              <select name="selectFermentationTank" value={fermentationTank} onChange={handleInputChange}>
                {selectingFermentationTank.map((number) => (
                  <option value={number}>{number}</option>
                ))}
              </select>
          </div>

            <button disabled={checkIfJSONisEmpty} className="scheduleBeer" onClick={() => {
            calculateBrewingSchedule(startTime, schedulingParameters, accessToken, selectedRecipeName, fermentationTank)
            setTimeout(() => tokenExpired(), 3000)
          }}>
            Schedule Beer</button> 

          <PopUp trigger={buttonPopUp} setTrigger={setButtonPopUp}>
            <h3>PopUp</h3>
          </PopUp>
      </main>
  )

  }

  export default Calendar

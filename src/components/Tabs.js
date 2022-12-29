import React, { useState, useContext } from 'react';
import App from "../App";
import Calendar from "../components/Calendar";
import SelectedRecipeContext from "../SelectedRecipeContext";
import BeerTypeContext from "../BeerTypeContext";
import RecipeDetail from "../components/Parameters";
import Parameters from "../components/Parameters";
import beerStylesData from "../beerStylesData";
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'


const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const { beerType, setBeerType } = useContext(BeerTypeContext);

  const navigate = useNavigate();

  const toggleTab = (index) => {
    setToggleState(index);
  }

  const settingBeerType = () => {
    for(let i = 0;i < beerStylesData.length; i++){
      if(selectedRecipe.beerStyle === Object.values(beerStylesData[i])[1]){
        setBeerType(Object.values(beerStylesData[i])[2])
      }
     }
   }

  return (
    <>

    <div className="backButtonToBeerList">
     <button type="button" onClick={() => navigate("/")}>
       <FontAwesomeIcon icon={faChevronUp} rotation={270}/> Back
     </button>
    </div>

    <div className="container">

        <div className="bloc-tabs">

          <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
            Recipe
          </button>
          <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
            Schedule
          </button>
          <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
            Parameters
          </button>
        </div>

        <div className="content-tabs">

          <button className={toggleState === 1 ? "content active-content" : "content"}>
           <RecipeDetail />
          </button>
          <button className={toggleState === 2 ? "content active-content" : "content"}>
           <Calendar />
          </button>
          <button className={toggleState === 3 ? "content active-content" : "content"}>
           <Parameters />
          </button>

        </div>

    </div>

   </>

  )
}

export default Tabs

import React, { useState } from 'react';
import App from "../App";
import Calendar from "../components/Calendar";
import RecipeDetail from "../components/RecipeDetail";
import Parameters from "../components/Parameters";
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'


const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);

  const navigate = useNavigate();

  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <>

    <div className="backButtonRecipeDetail">
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

// <>
//   <RecipeDetail
//      isActive={tab === "recipe-detail"}
//      onClick={() => { setTab("recipe-detail")}}>
//      Recipe Detail
//    </ RecipeDetail>
//    <Calendar
//      isActive={tab === "calendar"}
//      onClick={() => { setTab("calendar")}}>
//      Calendar
//    </ Calendar>
//    <hr />
//    {tab === "recipe-detail" && <RecipeDetail />}
//    {tab === "calendar" && <Calendar />}
// </>

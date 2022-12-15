import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import OnBoarding from "./components/OnBoarding";
import SchedulingParameters from "./components/SchedulingParameters";
import Parameters from "./components/Parameters";
import Brew from "./components/Brew";
import BeerList from "./components/BeerList";
import { Routes, Route } from "react-router-dom";
import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";
import BeerListContext from "./BeerListContext";
import AddingBeerBooleanContext from "./AddingBeerBooleanContext";
import BeerTypeContext from "./BeerTypeContext";
import SelectedRecipeContext from "./SelectedRecipeContext";
import GlobalSchedulingParametersContext from "./GlobalSchedulingParametersContext";
import RecipeDetail from "./components/RecipeDetail";
import Calendar from "./components/Calendar";
import { GoogleOAuthProvider } from '@react-oauth/google';


const testBeerList = [
    {
      beerName: "Back Paddock",
      abv: 5.5,
      beerStyle: "Pilsner",
      brewingTime: "Six Weeks",
      grain: "Mecca",
      yeast: "802",
      hops: "Mouteka",
    },
    {
      beerName: "Between Two Ferns",
      abv: 5.5,
      beerStyle: "Kolsch",
      brewingTime: "Six Weeks",
      grain: "2 row",
      yeast: "340",
      hops: "Mouteka",
    },
  ]

const schedulingParameters = {
    Lager: {
      primaryFermentation: 12,
      dRest: 2,
      lagering: 14,
      carbonation: 2
    },
    Ale: {
      primaryFermentation: 9,
      dRest: 2,
      coldCrash: 1,
      carbonation: 2
    },
    KettleSour: {
      souringWort: 2,
      primaryFermentation: 7,
      dRest: 2,
      coldCrash: 2,
      carbonation: 2
    }
  }


const beerListFromLocalStorage = JSON.parse(localStorage.getItem('beerList') || '[]')
const addingBeerFromLocalStorage = JSON.parse(localStorage.getItem('addingBeerList') || 'false')

function App() {

  const [globalSchedulingParameters, setGlobalSchedulingParameters] = useState(schedulingParameters)
  const schedulingParametersValues = { globalSchedulingParameters, setGlobalSchedulingParameters};

  const [beerList, setBeerList] = useState(beerListFromLocalStorage);
  const value = { beerList, setBeerList };

  const [addingBeer, setAddingBeer] = useState(addingBeerFromLocalStorage);
  const toggleSetting = { addingBeer, setAddingBeer }

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const selected = { selectedRecipe, setSelectedRecipe }

  const [beerType, setBeerType] = useState("");
  const selectedBeerType = { beerType, setBeerType }

 const handleError = (error) => {
   console.log(error)
 }
  useEffect(() => {
    try{
      localStorage.setItem("beerList", JSON.stringify(beerList))
      localStorage.setItem("addingBeer", JSON.stringify(addingBeer))
    } catch (error){
      handleError(error)
    }
  }, [beerList])


  return (

    <GoogleOAuthProvider clientId={process.env.REACT_APP_CALENDAR_ID}>
      <GlobalSchedulingParametersContext.Provider value={schedulingParametersValues}>
        <AddingBeerBooleanContext.Provider value={toggleSetting}>
          <SelectedRecipeContext.Provider value={selected}>
            <BeerListContext.Provider value={value}>
              <BeerTypeContext.Provider value={selectedBeerType}>
                    <Routes>
                        <Route element={<WithoutNav />}>
                            <Route path="/OnBoarding" element={<OnBoarding />} />
                        </Route>
                        <Route  element={<WithNav />}>
                          <Route path="/" element={<BeerList />} />
                          <Route path="parameters/:beerName" element={<Parameters />} />
                          <Route path="beer-list/brew" element={<Brew />} />
                          <Route path="recipe-detail" element={<RecipeDetail />} />
                          <Route path="calendar" element={<Calendar />} />
                          <Route path="scheduling-parameters/:id" element={<SchedulingParameters />} />
                        </Route>
                     </Routes>
                  </BeerTypeContext.Provider>
               </BeerListContext.Provider>
              </SelectedRecipeContext.Provider>
        </AddingBeerBooleanContext.Provider>
      </GlobalSchedulingParametersContext.Provider>
    </GoogleOAuthProvider>
   )
}



export default App;

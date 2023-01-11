import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import AddBeer from "./components/AddBeer";
import SchedulingParameters from "./components/SchedulingParameters";
import Parameters from "./components/Parameters";
import BeerList from "./components/BeerList";
import SignIn from "./components/SignIn";
import { Routes, Route } from "react-router-dom";
import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";
import BeerListContext from "./BeerListContext";
import AddingBeerBooleanContext from "./AddingBeerBooleanContext";
import GoogleTokenDataContext from "./GoogleTokenDataContext";
import BeerTypeContext from "./BeerTypeContext";
import SelectedRecipeContext from "./SelectedRecipeContext";
import GlobalSchedulingParametersContext from "./GlobalSchedulingParametersContext";
import RecipeDetail from "./components/RecipeDetail";
import Calendar from "./components/Calendar";
import PopUp from "./components/PopUp";
import Tabs from "./components/Tabs";
import { GoogleOAuthProvider } from '@react-oauth/google';


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
const googleTokenDataFromLocalStorage = JSON.parse(localStorage.getItem('googleTokenData') || '{}')
const addingBeerFromLocalStorage = JSON.parse(localStorage.getItem('addingBeer') || 'false')

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

  const [googleTokenData, setGoogleTokenData] = useState(googleTokenDataFromLocalStorage);
  const signedIn = { googleTokenData, setGoogleTokenData }

 const handleError = (error) => {
   console.log(error)
 }

  useEffect(() => {
      localStorage.setItem("beerList", JSON.stringify(beerList))
      localStorage.setItem("addingBeer", JSON.stringify(addingBeer))
  }, [beerList])

  useEffect(() => {
      localStorage.setItem("googleTokenData", JSON.stringify(googleTokenData))
  })



  return (

    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <GoogleTokenDataContext.Provider value={signedIn}>
        <GlobalSchedulingParametersContext.Provider value={schedulingParametersValues}>
          <AddingBeerBooleanContext.Provider value={toggleSetting}>
            <SelectedRecipeContext.Provider value={selected}>
              <BeerListContext.Provider value={value}>
                <BeerTypeContext.Provider value={selectedBeerType}>
                      <Routes>
                          <Route element={<WithoutNav />}>
                              <Route path="/AddBeer" element={<AddBeer />} />
                              <Route path="scheduling-parameters/:id" element={<SchedulingParameters />} />
                          </Route>
                          <Route element={localStorage.getItem(googleTokenData) === null ? <WithoutNav /> : <WithNav />}>
                            <Route path="/" element={<BeerList />} />
                            <Route path="calendar" element={<Calendar />} />
                            <Route path="tabs/recipe-detail/:beerName" element={<Tabs />} />
                            <Route path="tabs/recipe-detail/:beerName/success-page" element={<PopUp />} />
                          </Route>
                       </Routes>
                    </BeerTypeContext.Provider>
                 </BeerListContext.Provider>
                </SelectedRecipeContext.Provider>
          </AddingBeerBooleanContext.Provider>
        </GlobalSchedulingParametersContext.Provider>
      </GoogleTokenDataContext.Provider>
    </GoogleOAuthProvider>
   )
}



export default App;

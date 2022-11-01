import './App.css';
import React, { useState, useContext } from 'react';
import OnBoarding from "./components/OnBoarding";
import Home from "./components/Home";
import Brew from "./components/Brew";
import BeerList from "./components/BeerList";
import { Routes, Route } from "react-router-dom";
import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";
import BeerListContext from "./BeerListContext";
import RecipeDetail from "./components/RecipeDetail";

const testBeerList = [
    {
      beerName: "Back Paddock",
      abv: 5.5,
      beerStyle: "Pilsner",
      brewingTime: "Six Weeks",
      grain: "Mecca",
      yeast: "802",
      hops: "Mouteka",
      id: 1,
    },
    {
      beerName: "Between Two Ferns",
      abv: 5.5,
      beerStyle: "Kolsch",
      brewingTime: "Six Weeks",
      grain: "2 row",
      yeast: "340",
      hops: "Mouteka",
      id: 2,
    },
];

function App() {

  const [beerList, setBeerList] = useState([]);
  const value = { beerList, setBeerList };



  return (

  <BeerListContext.Provider value={value}>
    <Routes>
        <Route element={<WithoutNav />}>
            <Route path="/" element={<OnBoarding />} />
        </Route>
        <Route  element={<WithNav />}>
          <Route path="home" element={<Home />} />
          <Route path="beer-list" element={<BeerList />} />
          <Route path="recipe-detail" element={<RecipeDetail />} />
          <Route path="beer-list/brew" element={<Brew />} />
        </Route>
     </Routes>

     </BeerListContext.Provider>


  )
}

export default App;

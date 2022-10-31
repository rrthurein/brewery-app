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
          <Route path="brew" element={<Brew />} />
          <Route path="home" element={<Home />} />
          <Route path="beer-list" element={<BeerList />} />
        </Route>
     </Routes>

     </BeerListContext.Provider>


  )
}

export default App;

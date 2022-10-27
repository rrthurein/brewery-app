// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import OnBoarding from "./components/OnBoarding";
import Home from "./components/Home";
import Brew from "./components/Brew";
import BeerList from "./components/BeerList";
import { Routes, Route } from "react-router-dom";

import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";

function App() {

  return (
    <>

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
   </>

  )
}

export default App;
// import Navbar from "./components/Navbar";
    // <Navbar/>

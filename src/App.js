// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import OnBoarding from "./components/OnBoarding";
import Home from "./components/Home";
import Brew from "./components/Brew";
import { Routes, Route } from "react-router-dom"

function App() {


  return (
    <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="brew" element={<Brew />} />
        <Route path="home" element={<Home />} />
     </Routes>


  )
}

export default App;

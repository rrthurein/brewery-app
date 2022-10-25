// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
// import RecipeInfoSetUp from "./components/RecipeInfoSetUp";
import BeerList from "./components/BeerList";
import CurrentBeerForm from "./components/CurrentBeerForm";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  const [addingBeer, setAddingBeer] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // const [currentBeer, setCurrentBeer] = useState('');
  const [beerRecipes, setBeerRecipes] = useState([]);


  const [beerName, setBeerName] = useState('');
  const [beerStyle, setBeerStyle] = useState('');
  const [abv, setABV] = useState('');
  const [brewingTime, setBrewingTime] = useState('');
  const [grain, setGrain] = useState('');
  const [yeast, setYeast] = useState('');
  const [hops, setHops] = useState('')

const addBeer = () => {
    setAddingBeer(!addingBeer) //set is always updating a value
      console.log("state", addingBeer)
  }

const nullSelectedRecipe = () => {
  setSelectedRecipe(null);
  console.log("selectedRecipeBacktoNull", selectedRecipe)
}

const selectRecipe = (beer) => {
  // setAddingBeer(!addingBeer)
  setSelectedRecipe(beer)
  console.log("selectedRecipe", beer, selectedRecipe)
}

const handleNameChange = (e) => {
  setBeerName(e.target.value)
}
const handleABVChange = (e) => {
  setABV(e.target.value)
}
const handleBeerStyleChange = (e) => {
  setBeerStyle(e.target.value)
}
const handleBrewingTimeChange = (e) => {
  setBrewingTime(e.target.value)
}
const handleGrainChange = (e) => {
  setGrain(e.target.value)
}
const handleYeastChange = (e) => {
  setYeast(e.target.value)
}
const handleHopsChange = (e) => {
  setHops(e.target.value)
}

const handleClick = () => {

  const beerRecipeObj = {
    beerName: beerName,
    abv: abv,
    beerStyle: beerStyle,
    brewingTime: brewingTime,
    grain: grain,
    yeast: yeast,
    hops: hops,
  }
  const newBeerRecipes = beerRecipes.concat([beerRecipeObj])
  setBeerRecipes(newBeerRecipes)
  console.log("clicking beer", newBeerRecipes)
  setAddingBeer(!addingBeer)
}


  const showClickRecipe = beerRecipes.length >= 1

  const showRecipeDetail = selectedRecipe

  console.log("selectedRecipe", showRecipeDetail)


  console.log("showRecipe and showClick", showRecipeDetail, showClickRecipe)

  const renderView = () => {

      if (showRecipeDetail) {
        return(
          <div>
             <RecipeDetail selectedRecipe={selectedRecipe} />
        <button type="button" onClick={nullSelectedRecipe}>Back</button>
        </div>
      );}
      else if (addingBeer) {
          return(
            <CurrentBeerForm
            handleNameChange = {handleNameChange}
            handleABVChange = {handleABVChange}
            handleBeerStyleChange = {handleBeerStyleChange}
            handleBrewingTimeChange = {handleBrewingTimeChange}
            handleGrainChange = {handleGrainChange}
            handleYeastChange = {handleYeastChange}
            handleHopsChange = {handleHopsChange}
            handleClick = {handleClick}
            />
          );
      } else if (showClickRecipe) {
        return(
          <BeerList addBeer={addBeer} recipe={beerRecipes} selectRecipe={selectRecipe}/>

          //encapsulation : makes complicated logic simpler to think about)
      );
    }

       else {
        return (
          <div className="add-beer">
          <h2>What beers do you sell?</h2>
          <button id="firstButtonAddBeer" type="button" onClick={addBeer}>Add</button>
          </div>
        );
      }
    }


  return (
    <div className="Beer-Inventory-Setup">

        <div>
          <nav>
            <a href="beerRecipes">Beer Recipe Setup</a>
          </nav>
        </div>
          <header>
          {renderView()}
          </header>

        </div>




  )
}

export default App;

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

const selectRecipe = (beer) => {
  // setAddingBeer(!addingBeer)
  setSelectedRecipe([beer])
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

  const showRecipeDetail = selectedRecipe >= 1

  console.log("Recipe Detail", selectedRecipe >= 1)

  return (
    <div>

        <div className="beer-inventory-setup">
          <nav>
            <a href="beerRecipes">Beer Recipe Setup</a>
          </nav>
        </div>


          <header>
            <button type="button" onClick={addBeer}>Beer Form</button>
            <div>
            {

              showRecipeDetail ?
              <div>

                   <RecipeDetail selectedRecipe={selectedRecipe} />


              <button type="button" onClick={addBeer}>Back</button>

              </div>
              :
              showClickRecipe ?
                <BeerList recipe={beerRecipes} selectRecipe={selectRecipe}/>
                //encapsulation : makes complicated logic simpler to think about
                  :

              addingBeer ?
                    <CurrentBeerForm

                    handleNameChange = {handleNameChange}
                    handleABVChange = {handleABVChange}
                    handleBeerStyleChange = {handleBeerStyleChange}
                    handleBrewingTimeChange = {handleBrewingTimeChange}
                    handleGrainChange = {handleGrainChange}
                    handleYeastChange = {handleYeastChange}
                    handleHopsChange = {handleHopsChange}
                    handleClick = {handleClick}
                    /> :

              <div className="add-beer">
              <h2>What beers do you sell?</h2>
              <button type="button" onClick={addBeer}>Add</button>
              </div>


            }


            </div>




          </header>


        </div>




  )
}

export default App;

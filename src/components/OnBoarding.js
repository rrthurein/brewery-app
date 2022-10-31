import React, { useState, useContext } from 'react';
import BeerList from "./BeerList";
import CurrentBeerForm from "./CurrentBeerForm";
import RecipeDetail from "./RecipeDetail";
import BeerListContext from "../BeerListContext";
import App from "../App";
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically



function OnBoarding() {
  const [addingBeer, setAddingBeer] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // const [currentBeer, setCurrentBeer] = useState('');
  // const [beerRecipes, setBeerRecipes] = useState([]);

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
  // console.log("selectedRecipeBacktoNull", selectedRecipe)
}

const selectRecipe = (beer) => {
  setSelectedRecipe(beer)
  // console.log("selectedRecipe", beer, selectedRecipe)
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

const { beerList, setBeerList } = useContext(BeerListContext); //

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
  const newBeerRecipes = beerList.concat([beerRecipeObj])
  setBeerList(newBeerRecipes)
  setAddingBeer(!addingBeer)
}
    console.log("handleClick", handleClick)
    console.log("beerList", beerList)


  const showClickRecipe = beerList.length >= 1 //check back

  const showRecipeDetail = selectedRecipe

  const navigate = useNavigate() //Navigating Programmatically



  const renderView = () => {

      if (showRecipeDetail) {
        return(

          <div className="RecipeDetail">
             <RecipeDetail selectedRecipe={selectedRecipe} />
             <div className="beerInfo-div-button">
               <button type="button" onClick={() => navigate("brew")}>Brew</button>
               <button type="button" onClick={nullSelectedRecipe}>Back</button>
             </div>
        </div>
      );}
      else if (addingBeer) {
          return(
              <div className="BeerForm-row">
              <img className="BeerFormPhoto" src="./images/beer-cup.jpg"/>
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
            </div>
          );
      } else if (showClickRecipe) {
        return(
          <BeerList addBeer={addBeer} selectRecipe={selectRecipe}/>
            // recipe={beerRecipes}
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

          <header>
            { renderView() }
          </header>

        </div>

  )
}

export default OnBoarding;

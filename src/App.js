// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
const [addingBeer, setAddingBeer] = useState(false);
// const [currentBeerInfo, setCurrentBeerInfo] = useState('');
const [beerRecipe, setBeerRecipe] = useState([]);

const [beerName, setBeerName] = useState('');
const [beerStyle, setBeerStyle] = useState('');
const [abv, setABV] = useState('');
const [brewingTime, setBrewingTime] = useState('');



const addBeer = () => {
    setAddingBeer(!addingBeer) //set is always updating a value
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

const handleClick = () => {

  const beerRecipeObj = {
    beerName: beerName,
    abv: abv,
    beerStyle: beerStyle,
    brewingTime: brewingTime
  }
  const newBeerRecipe = beerRecipe.concat([beerRecipeObj])
  setBeerRecipe(newBeerRecipe)
  console.log("rendering", beerRecipe)
  setAddingBeer(!addingBeer)
}



const beerRecipeInfo = beerRecipe.map((item) => {
    return (
      <div id="beerInfo-container">
       <li>
         <span>{item.beerName}</span>
         <span>{item.beerStyle}</span>
         <span>{item.abv}</span>
         <span>{item.brewingTime}</span>
       </li>
       </div>
     )
   })


  return (
    <div>

        <div className="beer-inventory-setup">
          <nav>
            <a href="beerRecipe">Beer Recipe</a>
          </nav>
        </div>



          <header>
            <h1>Beer Recipe Setup</h1>
            <div>
            {
              addingBeer ?
              <div>

              <label>Beer Name:</label>
              <input type="text" name="beerName" placeholder="Beer Name" onChange={handleNameChange} required/>
              <label>Beer Style:</label>
              <select name="beerStyle" onChange={handleBeerStyleChange}>
              <option value="IPA">IPA</option>
              <option value="Pilsner">Pilsner</option>
              <option value="Belgian Blonde">Belgian Blonde</option>
              </select>
              <label>ABV:</label>
              <input type="number" required name="ABV" placeholder="ABV" onChange={handleABVChange}/>
              <label>Brewing Time</label>
              <input type="text" required name="brewingTime" placeholder="Brewing Time" onChange={handleBrewingTimeChange}/>

              <button type="button" onClick={handleClick}>Add Beer!</button>

              </div>
              :
              beerRecipe.length >= 1
                ?
                <div>
                <h1>Beer Recipe</h1>
                <button type="button" onClick={addBeer}>Add Beer</button>
                   {
                     beerRecipeInfo
                   }
                </div>
               :

              <div className="add-beer">
              <h2>What beers do you sell?</h2>
              <button type="button" onClick={addBeer}>Add</button>
              </div>


              //i need a conditional logic in to determine which section to render base on the different state variable.
            }


            </div>




          </header>


        </div>




  )
}

export default App;

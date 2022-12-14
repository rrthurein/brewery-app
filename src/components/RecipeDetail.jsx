import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically
import SelectedRecipeContext from "../SelectedRecipeContext";
import beerStylesData from "../beerStylesData.json";
import BeerTypeContext from "../BeerTypeContext";
import BeerListContext from "../BeerListContext";

const RecipeDetail = () => {

  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const { beerType, setBeerType } = useContext(BeerTypeContext);
  const { beerList, setBeerList } = useContext(BeerListContext);

  const navigate = useNavigate();
  console.log("selectedRecipe", selectedRecipe)
   const nullSelectedRecipe = () => {
     setSelectedRecipe(null);
   }

   const deleteBeer = () => { beerList.map((beer) => {
     if(beer == selectedRecipe){
       const deleteThisIndex = beerList.indexOf(beer)
       beerList.splice(deleteThisIndex, 1)
       setBeerList(beerList)
       setSelectedRecipe(null);
       }
     })
   }

  const settingBeerType = () => {
    for(let i = 0;i < beerStylesData.length; i++){
      if(selectedRecipe.beerStyle === Object.values(beerStylesData[i])[1]){
        setBeerType(Object.values(beerStylesData[i])[2])
      }
     }
   }

  const handleClickBrewDay = () => {
    navigate("/calendar")
    settingBeerType()
  }

 return(

     <div className="beerInfo-div">
       <div className="keyName">Beer Name</div>
       <div className="valueName">{selectedRecipe.beerName} </div>

       <div className="keyName">Beer Style</div>
       <div className="valueName">{selectedRecipe.beerStyle} </div>

       <div className="keyName">Beer ABV</div>
       <div className="valueName">{selectedRecipe.abv} </div>

       <div className="keyName">Grain</div>
       <div className="valueName">{selectedRecipe.grain} </div>

       <div className="keyName">Yeast</div>
       <div className="valueName">{selectedRecipe.yeast} </div>

       <div className="keyName">Hops</div>
       <div className="valueName">{selectedRecipe.hops}</div>

        <div className="buttonDiv">
          <div><button type="button" onClick={handleClickBrewDay}>Schedule</button></div>
          <div><button type="button" onClick={() => navigate("parameters")}>Parameters</button></div>
          <div><button type="button" onClick={() => deleteBeer()}>Delete</button></div>
          <div> <button type="button" onClick={() => nullSelectedRecipe()}>Back</button></div>
        </div>
      </div>
 )
}

export default RecipeDetail

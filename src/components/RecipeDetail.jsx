import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically
import SelectedRecipeContext from "../SelectedRecipeContext";
import beerStylesData from "../beerStylesData.json";
import BeerTypeContext from "../BeerTypeContext";

const RecipeDetail = (props) => {

  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const { beerType, setBeerType } = useContext(BeerTypeContext);

  const navigate = useNavigate();

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
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.beerName} </div>

       <div className="keyName">Beer Style</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.beerStyle} </div>


       <div className="keyName">Beer ABV</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.abv} </div>

       <div className="keyName">Brewing</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.brewingTime} </div>

       <div className="keyName">Grain</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.grain} </div>

       <div className="keyName">Yeast</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.yeast} </div>

       <div className="keyName">Hops</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.hops}</div>

       <button style={{width: 100, height: 50}} onClick={handleClickBrewDay}>Add Schedule</button>
      </div>
 )
}

export default RecipeDetail

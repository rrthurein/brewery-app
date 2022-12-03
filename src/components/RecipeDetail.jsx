import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically
import BeerTypeContext from "../BeerTypeContext";
import SelectedRecipeContext from "../SelectedRecipeContext";

const RecipeDetail = (props) => {

  const { beerType, setBeerType } = useContext(BeerTypeContext);
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);

  const navigate = useNavigate();

  const settingBeerType = () => {
    if(selectedRecipe.beerStyle == "Pilsner"){
      return setBeerType("lager")
    } else if(selectedRecipe.beerStyle == "IPA" || "Belgian Blonde"){
      return setBeerType("ale")
    }
  }
  const handleClickBrewDay = () => {
    navigate("/calendar")
    settingBeerType(selectedRecipe.beerStyle)
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

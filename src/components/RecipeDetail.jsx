import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; //Navigating Programmatically
import SelectedRecipeContext from "../SelectedRecipeContext";
import beerStylesData from "../beerStylesData.json";
import BeerTypeContext from "../BeerTypeContext";
import BeerListContext from "../BeerListContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'


const RecipeDetail = () => {

  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const { beerType, setBeerType } = useContext(BeerTypeContext);
  const { beerList, setBeerList } = useContext(BeerListContext);

  const navigate = useNavigate();
  const params = useParams()
  const beerName = params.beerName

  console.log("selectedRecipe", selectedRecipe)
   // const nullSelectedRecipe = () => {
   //   setSelectedRecipe(null);
   // }


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
 console.log("selectedRecipe.id", selectedRecipe.id)
 return(
   <section className="RecipeDetail">

     <div>
      <button type="button" onClick={() => navigate("/")}
      style={{marginLeft: 180, marginTop: "2em", fontSize: 20, letterSpacing: "0.2em"}}>
      <FontAwesomeIcon icon={faChevronUp} rotation={270}/> Back
      </button>
     </div>
     <div className="beerInfo-div">
      <h1>Recipe Detail</h1>
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
          <div><button type="button" onClick={() => navigate("/parameters/" + selectedRecipe.beerName)} style={{width: 92}}>
          Parameters</button></div>
        </div>
      </div>
    </section>
 )
}

export default RecipeDetail

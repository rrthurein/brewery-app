import React, { useState, useContext } from 'react';
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import SelectedRecipeContext from "../SelectedRecipeContext";
import RecipeDetail from "./RecipeDetail";
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically



const BeerList = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext);
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const navigate = useNavigate();


   const selectRecipe = (beer) => {
       setSelectedRecipe(beer)
       console.log("selectedRecipe", selectedRecipe)
    }

   const nullSelectedRecipe = () => {
     setSelectedRecipe(null);
     // console.log("selectedRecipeBacktoNull", selectedRecipe)
   }

    const showRecipeDetail = selectedRecipe
    //const showClickRecipe = beerList.length >= 1 check back

    if(showRecipeDetail) {
      return(
        <section className="RecipeDetail">
           <RecipeDetail selectedRecipe={selectedRecipe}/>
           <div className="beerInfo-div-button">
             <button type="button" onClick={() => navigate("brew")}>Brew</button>
             <button type="button" onClick={nullSelectedRecipe}>Back</button>
           </div>
      </section>
    );} else {
        return (
          <section className="BeerList">
              <h1>List of Beer</h1>
                <div className="BeerListBorder">
                { beerList.map((beer) => {
            return(
                    <div  key={beer.hops}>
                          <button id="selectButton" type="button" onClick={() => {selectRecipe(beer)}} >
                           {
                            beer.beerName
                         }</button>
                         </div>
                  )
                                          })
                  }
              <button type="button" onClick={() => { setAddingBeer(!addingBeer); navigate("/");  }}>Add Beer</button>


          </div>
            </section>
            );
          }
}

export default BeerList

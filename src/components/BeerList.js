import React, { useState, useContext } from 'react';
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import SelectedRecipeContext from "../SelectedRecipeContext";
import RecipeDetail from "./RecipeDetail";
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically
import beerStylesData from "../beerStylesData.json";

const BeerList = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext);
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const navigate = useNavigate();

  const selectRecipe = (beer) => {
      setSelectedRecipe(beer);
   }


    const showRecipeDetail = selectedRecipe

    if(showRecipeDetail) {
      return(
        <section className="RecipeDetail">
           <RecipeDetail/>
      </section>
    );} else {
        return (
          <section className="BeerList">
              <h1>List of Beer</h1>
                <div className="BeerListBorder">
                    { beerList.map((beer) => {
                        return(
                        <div key={beer.id}>
                              <button id="selectButton" type="button" onClick={() => {selectRecipe(beer)}} >
                               {
                                beer.beerName
                             }</button>
                             </div>
                         )
                      })
                     }
                <button type="button" onClick={() => { setAddingBeer(!addingBeer); navigate("/OnBoarding");  }}>Add Beer</button>
                </div>
            </section>
            )
          }
}

export default BeerList

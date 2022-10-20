import React from 'react'


const RecipeDetail = (props) => {

 return(
          <div id="beerInfo-container">
          <li>
            <span>{props.selectedRecipe.beerName} </span>
            <span>{props.selectedRecipe.beerStyle} </span>
            <span>{props.selectedRecipe.abv} </span>
            <span>{props.selectedRecipe.brewingTime} </span>
            <span>{props.selectedRecipe.grain} </span>
            <span>{props.selectedRecipe.yeast} </span>
            <span>{props.selectedRecipe.hops}</span>
          </li>
           </div>
 )
}

export default RecipeDetail

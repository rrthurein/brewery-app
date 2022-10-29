import React from 'react'


const BeerList = (props) => {
 const recipe = props.recipe
 const selectRecipe = props.selectRecipe
 const addBeer = props.addBeer

  return (
    <div className="BeerList">
    <h1>List of Beer</h1>

    <div className="BeerListBorder">
    { recipe.map((beer) => {
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
        <button type="button" onClick={addBeer}>Add Beer</button>
    </div>

      </div>
  )

}

export default BeerList

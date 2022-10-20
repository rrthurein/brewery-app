import React from 'react'


const BeerList = (props) => {
 const recipe = props.recipe
 const selectRecipe = props.selectRecipe

  return (
    <div>
    <h1>List of Beer</h1>

    <div>
    { recipe.map((beer) => {
      return(
        <div key={beer.hops} style={{ border: "none" }}>
              <button type="button" onClick={() => {selectRecipe(beer)}} style={ { border: "2px solid #4CAF50"} ,
               { width: "250px"}}>
               {
                beer.beerName
             }</button>
             </div>
      )

    })

        }

    </div>

      </div>
  )

}

export default BeerList

// recipe.map(
//   (beer) => {
//     return

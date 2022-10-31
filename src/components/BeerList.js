import React, { useContext } from 'react';
import BeerListContext from "../BeerListContext";


const BeerList = (props) => {

const { beerList, setBeerList } = useContext(BeerListContext);

 const selectRecipe = props.selectRecipe
 const addBeer = props.addBeer
 console.log("beer list", beerList);

  return (
    <div className="BeerList">
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
        <button type="button" onClick={addBeer}>Add Beer</button>
    </div>

      </div>
  )

}

export default BeerList

import React, { useState, useContext } from 'react';
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import SelectedRecipeContext from "../SelectedRecipeContext";
import { useNavigate, useParams } from 'react-router-dom'; //Navigating Programmatically
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const BeerList = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext);
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);

  const navigate = useNavigate();
  const params = useParams()
  const beerName = params.beerName;

  const deleteBeer = (beer) => {
      const deleteThisIndex = beerList.indexOf(beer)
      beerList.splice(deleteThisIndex, 1)
      setBeerList(beerList)
      navigate("/")
      console.log(beerList)
  }

      return(
          <section className="BeerList">
              <h1>List of Beer</h1>
                <div className="BeerListBorder">
                    { beerList.map((beer) => {
                        return(
                        <div key={beer.id} className="beerListButton">

                                <button style={{width: 250, marginRight: 0}} id="selectButton" type="button" onClick={() => {
                                  setSelectedRecipe(beer)
                                  navigate("tabs/recipe-detail/" + beer.beerName);
                                    }} >
                                 {
                                  beer.beerName
                               }</button>


                            <button type="button" style={{width: "3em", marginLeft: "1em", borderStyle: "none" }}
                            onClick={() => deleteBeer(beer)}>
                                <FontAwesomeIcon icon={faTrash}/>
                              </button>

                             </div>
                         )
                      })
                     }
                <button type="button" onClick={() => { setAddingBeer(!addingBeer); navigate("/OnBoarding"); }}>
                  Add Beer
                </button>
                </div>
            </section>
  )
}

export default BeerList

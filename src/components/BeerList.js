import React, { useState, useContext } from 'react';
import SignIn from "../components/SignIn";
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import SelectedRecipeContext from "../SelectedRecipeContext";
import GoogleTokenDataContext from "../GoogleTokenDataContext";
import BeerTypeContext from "../BeerTypeContext";
import { useNavigate, useParams, redirect } from 'react-router-dom'; //Navigating Programmatically
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const BeerListRender = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext);
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const { beerType, setBeerType } = useContext(BeerTypeContext);


  console.log("beerList")

  const navigate = useNavigate();
  const params = useParams()
  const beerName = params.beerName;


  const deleteBeer = (beer) => {
    const deleteThisIndex = beerList.indexOf(beer)
    beerList.splice(deleteThisIndex, 1)
    const newBeerList = [...beerList]
    setBeerList(newBeerList)
    navigate("/")
    console.log(newBeerList)
  }

  console.log(selectedRecipe)


  return (
    <section className="BeerList">
      <h1>List of Beer</h1>
        <div className="BeerListBorder">
          { beerList.map((beer) => {
              return(
                <div key={beer.id} className="beerListButton">
                <button style={{width: 250, marginRight: 0}} id="selectButton" type="button"
                onClick={() => {
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
        <button type="button" style={{paddingLeft: "15px", paddingRight: "15px", marginTop: "4%"}} onClick={() => { setAddingBeer(!addingBeer); navigate("/AddBeer"); }}>
        Add Beer
        </button>
      </div>
  </section>
 )
}

const BeerList = () => {


  return(
    <>
    {BeerListRender()}
    </>

  )
}

export default BeerList

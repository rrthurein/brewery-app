import React, { useState, useContext } from 'react';
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import SelectedRecipeContext from "../SelectedRecipeContext";
import GoogleSignInContext from "../GoogleSignInContext";
import BeerTypeContext from "../BeerTypeContext";
import { useNavigate, useParams } from 'react-router-dom'; //Navigating Programmatically
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {  useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const BeerList = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext);
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const { googleSignIn, setGoogleSignIn } = useContext(GoogleSignInContext);
  const { beerType, setBeerType } = useContext(BeerTypeContext);

  const navigate = useNavigate();
  const params = useParams()
  const beerName = params.beerName;

  const responseGoogle = credentialResponse => {
    console.log(credentialResponse);
  }

  const responseError = credentialResponse => {
    console.log('Login Failed', credentialResponse)
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {setGoogleSignIn(tokenResponse)},
    onError: (tokenResponse) => console.log("Login Failed")
  });

  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"

  const deleteBeer = (beer) => {
      const deleteThisIndex = beerList.indexOf(beer)
      beerList.splice(deleteThisIndex, 1)
      setBeerList(beerList)
      navigate("/")
      console.log(beerList)
  }

      return(
        <>
        <section className="BeerList">
          <button
          onClick={() => login()}
          prompt='consent'
          scope="openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
          >
            Sign in with Google 🚀{' '}
            </button>
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
                <button type="button" onClick={() => { setAddingBeer(!addingBeer); navigate("/OnBoarding"); }}>
                  Add Beer
                </button>
                </div>
            </section>
            </>
  )
}

export default BeerList

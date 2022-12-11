import React, { useState, useContext, useEffect } from 'react';
import BeerList from "./BeerList";
import CurrentBeerForm from "./CurrentBeerForm";
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import App from "../App";
import beerStylesData from "../beerStylesData.json";
import GlobalSchedulingParametersContext from "../GlobalSchedulingParametersContext";

function OnBoarding() {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext)
  const { globalSchedulingParameters, setGlobalSchedulingParameters } = useContext(GlobalSchedulingParametersContext)



  const [beerName, setBeerName] = useState('');
  const [beerStyle, setBeerStyle] = useState('');
  const [abv, setABV] = useState('');
  const [grain, setGrain] = useState('');
  const [yeast, setYeast] = useState('');
  const [hops, setHops] = useState('')
  const [beerType, setBeerType] = useState('')
  const [scheudlingParameter, SetSchedulingParameter] = useState({})

  const [form, setForm] = useState({
    beerName: beerName,
    abv: abv,
    beerStyle: beerStyle,
    grain: grain,
    yeast: yeast,
    hops: hops,
    schedulingParameters: scheudlingParameter,
  });


  const addBeer = () => {
      setAddingBeer(!addingBeer) //set is always updating a value
        console.log("state", addingBeer)
    }


useEffect(() => {
    // Use the map() method to find the matching beer style and type
    const matchingBeerAle = beerStylesData.map(
      (beer) => beer.beerStyle == form.beerStyle && beer.beerType == "Ale"
    );
    const matchingBeerLager = beerStylesData.map(
      (beer) => beer.beerStyle == form.beerStyle && beer.beerType == "Lager"
    );
    const matchingBeerKettleSour = beerStylesData.map(
      (beer) => beer.beerStyle == form.beerStyle && beer.beerType == "KettleSour"
    );
    // If a matching beer was found, update the form object with the
    // appropriate scheduling parameters
    if (matchingBeerAle.beerType === "Ale") {
      setForm({
        ...form,
        schedulingParameters: globalSchedulingParameters.Ale,
      });
    } else if (matchingBeerLager.beerType === "Lager") {
      setForm({
        ...form,
        schedulingParameters: globalSchedulingParameters.Lager,
      });
    } else if (matchingBeerKettleSour.beerType === "KettleSour") {
      setForm({
        ...form,
        schedulingParameters: globalSchedulingParameters.KettleSour,
      });
    }
  }, [beerType]);

  const handleInputChange = (e) => {
    //create an object
    let newBeer = {
      ...form,
    }
    //use brackets to interpolate dynamic/variable key name
    newBeer[e.target.name] = e.target.value
    setForm(newBeer)
  }

  const handleClick = () => {
    let newBeer = {
      ...form,
      id: beerList.length
    }
    console.log("new beer", newBeer)

    setBeerList(beerList.concat([newBeer]))
    for(let i = 0; i < beerStylesData.length; i++){
      if(beerStylesData[i].beerStyle == form.beerStyle){
        setBeerType(beerStylesData[i].beerType)
      }
    }
  }
  console.log("rendering onboarding beerList", beerList)
  const renderView = () => {

      if (addingBeer) {
          return(
              <div className="BeerForm-row">
              <img className="BeerFormPhoto" src="./images/beer-cup.jpg"/>
            <CurrentBeerForm
              handleInputChange = {handleInputChange}
              handleClick = {handleClick}
              beerStyle = {beerStyle}
              beerType = {beerType}
              form = {form}
              setForm = {setForm}
            />
            </div>
          );
      }

       else {
        return (
          <div className="add-beer">
          <h2>Add Beer Recipe!</h2>
          <button id="firstButtonAddBeer" type="button" onClick={addBeer}>Add</button>
          </div>
        );
      }
    }


  return (

          <div className="Beer-Inventory-Setup">

          <header>
            { renderView() }
          </header>

        </div>

  )
}

export default OnBoarding;

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
  const [nextId, setNextId] = useState(0)

  const [form, setForm] = useState({
    id: nextId,
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
    if (matchingBeerAle) {
      setForm({
        ...form,
        schedulingParameters: globalSchedulingParameters.Ale,
      });
    }
    else if (matchingBeerLager){
      setForm({
        ...form,
        schedulingParameters: globalSchedulingParameters.Lager,
      });
    }
    else if (matchingBeerKettleSour){
      setForm({
        ...form,
        schedulingParameters: globalSchedulingParameters.KettleSour,
      });
    }
    setBeerList(beerList.concat([form]))
  }, [beerType]);

  const handleNameChange = (e) => {
    setForm({
      ...form,
      beerName: e.target.value
    })
  }

  const handleBeerStyleChange = (e) => {
    setForm({
      ...form,
      beerStyle: e.target.value
    })}

  const handleABVChange = (e) => {
    setForm({
      ...form,
      abv: e.target.value
    })
  }

  const handleGrainChange = (e) => {
    setForm({
      ...form,
      grain: e.target.value
    })
  }
  const handleYeastChange = (e) => {
    setForm({
      ...form,
      yeast: e.target.value
    })
  }
  const handleHopsChange = (e) => {
    setForm({
      ...form,
      hops: e.target.value
    })
  }
 

  const handleClick = () => {
        setForm({
          ...form,
          id: nextId + 1,
        })
        console.log("form", form)
      for(let i = 0; i < beerStylesData.length; i++){
        if(beerStylesData[i].beerStyle == form.beerStyle){
          setBeerType(beerStylesData[i].beerType)
          }
        }
    }
console.log("beerList", beerList)



  const renderView = () => {

      if (addingBeer) {
          return(
              <div className="BeerForm-row">
              <img className="BeerFormPhoto" src="./images/beer-cup.jpg"/>
            <CurrentBeerForm
            handleNameChange = {handleNameChange}
            handleABVChange = {handleABVChange}
            handleBeerStyleChange = {handleBeerStyleChange}
            handleGrainChange = {handleGrainChange}
            handleYeastChange = {handleYeastChange}
            handleHopsChange = {handleHopsChange}
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

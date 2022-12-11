import React, { useState, useContext, useEffect } from 'react';
import BeerList from "./BeerList";
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import App from "../App";
import beerStylesData from "../beerStylesData.json";
import GlobalSchedulingParametersContext from "../GlobalSchedulingParametersContext";
import { useNavigate, useParams} from 'react-router-dom'; //Navigating Programmatically


const OnBoarding = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext)
  const { globalSchedulingParameters, setGlobalSchedulingParameters } = useContext(GlobalSchedulingParametersContext)

  const navigate = useNavigate();

  const [beerName, setBeerName] = useState('');
  const [beerStyle, setBeerStyle] = useState('');
  const [abv, setABV] = useState('');
  const [grain, setGrain] = useState('');
  const [yeast, setYeast] = useState('');
  const [hops, setHops] = useState('')
  const [beerType, setBeerType] = useState('')
  const [schedulingParameters, SetSchedulingParameter] = useState({})

  const [form, setForm] = useState({
    beerName: beerName,
    abv: abv,
    beerStyle: beerStyle,
    grain: grain,
    yeast: yeast,
    hops: hops,
    schedulingParameters: schedulingParameters,
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
    navigate("/scheduling-parameters/" + beerList.length)
  }
  console.log("rendering CHECK beerList", beerList)

  const beerRecipeRenderView = () => {
    return(
      <div>
      <h1>Beer Recipe Setup</h1>
      <label>Beer Name:</label>
      <input type="text" name="beerName" placeholder="Beer Name" onChange={handleInputChange} required/>
      <label>Beer Style:</label>
      <select name="beerStyle" onChange={handleInputChange}>
      {beerStylesData.map(beerStyle => (
        <option value={beerStyle.beerStyle}>{beerStyle.beerStyle}</option>
      ))}
      </select>
      <label>ABV:</label>
      <input type="number" required name="abv" placeholder="ABV" onChange={handleInputChange}/>
      <label>Grain:</label>
      <input type="text" name="grain" placeholder="Grain" required onChange={handleInputChange}/>
      <label>Yeast:</label>
      <input type="text" name="yeast" placeholder="Yeast" required onChange={handleInputChange}/>
      <label>Hops:</label>
      <input type="text" name="hops" placeholder="Hops" required onChange={handleInputChange}/>
      <button type="button" onClick={handleClick}>Schedule Parameters</button>
      </div>
    )
  }

  const renderView = () => {

    if(addingBeer){
      console.log("condition 1")
      return(
        <div className="BeerRecipeForm">
        {beerRecipeRenderView()}
        </div>
      );
    }
    else {
      console.log("condition 2")
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
      { renderView() }
    </div>
  )
}

export default OnBoarding;

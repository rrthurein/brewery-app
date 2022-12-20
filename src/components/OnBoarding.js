import React, { useState, useContext, useEffect } from 'react';
import BeerList from "./BeerList";
import BeerListContext from "../BeerListContext";
import BeerTypeContext from "../BeerTypeContext"
import SelectedRecipeContext from "../SelectedRecipeContext"
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import App from "../App";
import beerStylesData from "../beerStylesData.json";
import GlobalSchedulingParametersContext from "../GlobalSchedulingParametersContext";
import { useNavigate, useParams} from 'react-router-dom'; //Navigating Programmatically


const OnBoarding = () => {
  const { addingBeer, setAddingBeer } = useContext(AddingBeerBooleanContext)
  const { beerList, setBeerList } = useContext(BeerListContext)
  const { beerType, setBeerType } = useContext(BeerTypeContext)
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext)
  const { globalSchedulingParameters, setGlobalSchedulingParameters } = useContext(GlobalSchedulingParametersContext)

  const navigate = useNavigate();

  const [beerName, setBeerName] = useState('');
  const [beerStyle, setBeerStyle] = useState('');
  const [abv, setABV] = useState('');
  const [grain, setGrain] = useState('');
  const [yeast, setYeast] = useState('');
  const [hops, setHops] = useState('')
  const [schedulingParameters, SetSchedulingParameter] = useState({})
  const [renderScheduleParameter, setRenderScheduleParameter] = useState(false);


  const [form, setForm] = useState({
    beerName: beerName,
    abv: abv,
    beerStyle: beerStyle,
    grain: grain,
    yeast: yeast,
    hops: hops,
    schedulingParameters: schedulingParameters,
  });


  console.log("beerType", beerType, form)

  const addBeer = () => {
    setAddingBeer(!addingBeer) //set is always updating a value
    console.log("state", addingBeer)
  }


  const handleInputChange = (e) => {
    //create an object
    let newBeer = {
      ...form,
    }
    //use brackets to interpolate dynamic/variable key name
    newBeer[e.target.name] = e.target.value

    //setBeerType for
    if(newBeer.beerStyle){
      beerStylesData.map((beer) =>{
        if(beer.beerStyle === newBeer.beerStyle){
          setBeerType(beer.beerType)
        }
      })
    }

    console.log(newBeer)
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
    console.log("onBoarding BeerType", beerType)
    navigate("/scheduling-parameters/" + beerList.length)
  }

  const handleScheduleBeer = () => {

    let newBeer = {
      ...form,
      id: beerList.length,
      schedulingParameters: globalSchedulingParameters[beerType]
    }
    setSelectedRecipe(newBeer)

    //adding newBeer Form to array
    beerList[beerList.length] = newBeer
    setBeerList(beerList)

    navigate("/calendar")
  }


  const beerRecipeRenderView = () => {
    return(

      !renderScheduleParameter ?
          <div className="BeerForm-row">
            <img className="BeerFormPhoto" src="./images/beer-cup.jpg"/>
              <div className="BeerRecipeForm">
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
              <button type="button" onClick={() =>{setRenderScheduleParameter(!renderScheduleParameter)}}>Schedule Parameter</button>
            </div>
          </div> :
          <>
            <div className="BeerForm-row">
            <button type="button" onClick={handleClick}>Add Your Own Parameters</button>
            <button type="button" onClick={handleScheduleBeer}>Scehdule Beer</button>
            </div>
          </>

    )
  }

  const renderView = () => {

    if(addingBeer){
      console.log("condition 1")
      return(
        <div>
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

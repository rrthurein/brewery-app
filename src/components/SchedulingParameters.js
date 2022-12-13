import React, { useState, useContext } from 'react';
import App from "../App";
import BeerTypeContext from "../BeerTypeContext"
import BeerListContext from "../BeerListContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import beerStylesData from "../beerStylesData.json";
import GlobalSchedulingParametersContext from "../GlobalSchedulingParametersContext";
import { useNavigate, useParams } from 'react-router-dom'; //Navigating Programmatically

const SchedulingParameters = () => {
  const { beerType, setBeerType } = useContext(BeerTypeContext)
  const { beerList, setBeerList } = useContext(BeerListContext)
  const { globalSchedulingParameters, setGlobalSchedulingParameters } = useContext(GlobalSchedulingParametersContext)
  const [form, setForm] = useState({})
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const handleInputChange = (e) =>{

    //merge selected key and value to the object so that it's combine before the data is update
    const newForm = {
      ...form,
      [e.target.name] : e.target.value
    }
    console.log("newForm", newForm, "form", form)
    setForm(newForm)

    //combine data into updated beer entry
    const updatedBeer = {
      ...beerList[id],
      schedulingParameters : newForm
    }
    //console.log("after updatedBeer newSchedulingParameters", newSchedulingParameters)
    console.log("updatedBeer", updatedBeer)

    //updating the schedulingParameters with updatedBeer variable to the selected beerList
    beerList[id] = updatedBeer
    console.log("beerList[id]", beerList[id])
    console.log("beerList", beerList)
    setBeerList(beerList)
  }

  return(
    <div className="Beer-Inventory-Setup">
        <div className="BeerForm-row">
          <img className="BeerFormPhoto" src="./images/beer-cup.jpg"/>
          <div className="BeerRecipeForm">
          <h1>Scheduling Parameters</h1>
          <h2>{beerType}</h2>
          <label>Primary Fermentation</label>
          <input type="number" value={form.primaryFermentation} name="primaryFermentation" placeholder="Primary Fermentation" onChange={handleInputChange}/>
          {
            beerType == "Ale" ?
            <>
            <label>Secondary Fermentation</label>
            <input type="number" value={form.secondaryFermetation} name="secondaryFermentation" placeholder="Secondary Fermentation" onChange={handleInputChange}/>
            </> : null

          }
          <label>Dump Yeast & Hops</label>
          <input type="number" value={form.dumpYeastAndHops} name="dumpYeastAndHops" placeholder="Dump Yeast & Hops" onChange={handleInputChange}/>
          <label>Diacetyl Rest</label>
          <input type="number" value={form.dRest} name="dRest" placeholder="Diacetyl Rest" onChange={handleInputChange}/>
          {
            beerType == "Lager" ?
            <>
            <label>Lagering</label>
            <input type="number" value={form.lagering} name="lagering" placeholder="Lagering" onChange={handleInputChange}/>
            </>: null
          }
          <label>Cold Crash</label>
          <input type="number" value={form.coldCrash} name="coldCrash" placeholder="Cold Crash" onChange={handleInputChange}/>
          <label>Carbonation</label>
          <input type="number" value={form.carbonation} name="carbonation" placeholder="Carbonation" onChange={handleInputChange}/>
          <button type="button" onClick={()=>{navigate("/")}}>Add Beer!</button>
          </div>
      </div>
    </div>
  )
}

export default SchedulingParameters

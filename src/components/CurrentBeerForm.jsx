import React, { useState, useContext } from 'react';
import beerStylesData from "../beerStylesData.json";
import GlobalSchedulingParametersContext from "../GlobalSchedulingParametersContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const CurrentBeerForm = (props) => {

  const { globalSchedulingParameters, setGlobalSchedulingParameters } = useContext(GlobalSchedulingParametersContext)
  const {addingBeer, setAddingBeer} = useContext(AddingBeerBooleanContext)

  const navigate = useNavigate() //Navigating Programmatically

  const handleNameChange = props.handleNameChange
  const handleABVChange = props.handleABVChange
  const handleBeerStyleChange = props.handleBeerStyleChange
  const handleGrainChange = props.handleGrainChange
  const handleYeastChange = props.handleYeastChange
  const handleHopsChange = props.handleHopsChange
  const handleClick = props.handleClick
  const beerStyle = props.beerStyle
  const beerType = props.beerType
  const form = props.form
  const setForm = props.setForm


  const handlePriFermentation = (e) => {
    setForm({
      ...form,
      schedulingParameters: {
        ...globalSchedulingParameters.Ale,
        primaryFermentation: e.target.value
      }
    })
  }
 
  const parametersInputPage = () => {

    console.log("form", form)
    console.log(globalSchedulingParameters)
    navigate("beer-list")
  }


  const beerRecipeRenderView = () => {
    if(addingBeer === true && beerType == "Ale"){
      return(
        <div>

        <h1>Scheudling Parameters</h1>
        <h2>Ale</h2>
        <label>Primary Fermentation</label>
        <input type="number" value={form.schedulingParameters.primaryFermentation} name="primaryFermentation" placeholder="Primary Fermentation" onChange={handlePriFermentation}/>
        <button type="button" onClick={parametersInputPage}>Add Beer!</button>
        </div>
      )}
       else if(addingBeer === true && beerType == "Lager"){
         return(
           <div>
           <h1>Scheudling Parameters</h1>
           <h2>Lager</h2>
           <button type="button" onClick={parametersInputPage}>Add Beer!</button>
           </div>
         )}
      else {
        return(
          <div>
            <h1>Beer Recipe Setup</h1>
              <label>Beer Name:</label>
              <input type="text" name="beerName" placeholder="Beer Name" onChange={handleNameChange} required/>
              <label>Beer Style:</label>
              <select name="beerStyle" onChange={handleBeerStyleChange}>
                  {beerStylesData.map(beerStyle => (
                    <option value={beerStyle.beerStyle}>{beerStyle.beerStyle}</option>
                  ))}
              </select>
              <label>ABV:</label>
              <input type="number" required name="ABV" placeholder="ABV" onChange={handleABVChange}/>
              <label>Grain:</label>
              <input type="text" name="grain" placeholder="Grain" required onChange={handleGrainChange}/>
              <label>Yeast:</label>
              <input type="text" name="yeast" placeholder="Yeast" required onChange={handleYeastChange}/>
              <label>Hops:</label>
              <input type="text" name="hops" placeholder="Hops" required onChange={handleHopsChange}/>
              <button type="button" onClick={handleClick}>Schedule Parameters</button>
          </div>
        )
       }
     }

  return (
    <div className="BeerRecipeForm">
     {beerRecipeRenderView()}
    </div>
  )
}

export default CurrentBeerForm

// <label>Primary Fermentation:</label>
// <input type="text" name="primaryFermentation" placeholder="Primary Fermentation" onChange={handlePriFermentation} required/>
// <label>Secondary Fermentation:</label>
// <input type="text" name="secondaryFermetation" placeholder="Secondary Fermentation" onChange={handleSecFermentation} required/>

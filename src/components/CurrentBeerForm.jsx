import React, { useState, useContext } from 'react';
import beerStylesData from "../beerStylesData.json";
import BeerListContext from "../BeerListContext";
import GlobalSchedulingParametersContext from "../GlobalSchedulingParametersContext";
import AddingBeerBooleanContext from "../AddingBeerBooleanContext";
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const CurrentBeerForm = (props) => {

  const { globalSchedulingParameters, setGlobalSchedulingParameters } = useContext(GlobalSchedulingParametersContext)
  const { beerList, setBeerList } = useContext(BeerListContext)
  const {addingBeer, setAddingBeer} = useContext(AddingBeerBooleanContext)

  const navigate = useNavigate() //Navigating Programmatically

  const handleInputChange = props.handleInputChange
  const handleClick = props.handleClick
  const beerStyle = props.beerStyle
  const beerType = props.beerType
  const form = props.form
  const setForm = props.setForm

    const handlePriFermentation = (e) => {
      if(beerType == "Ale"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Ale,
            primaryFermentation: e.target.value
          }
        })
      } else if(beerType == "Lagering"){
        setForm({
          ...form,
          scheudlingParameters: {
            ...globalSchedulingParameters.Lager,
            primaryFermentation: e.target.value
          }
        })
      }
    }
    const handleSecondaryFermentation = (e) => {
      if(beerType == "Ale"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Ale,
            secondaryFermentation: e.target.value
          }
        })
      } else if(beerType == "Lager"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Lager,
            secondaryFermentation: e.target.value
          }
        })
      }
    }
    const handleDRest = (e) => {
      if(beerType == "Ale"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Ale,
            dRest: e.target.value
          }
        })
      } else if(beerType == "Lager"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Lager,
            dRest: e.target.value
          }
        })
      }
    }

    const handleDumpYeastAndHops = (e) => {
      if(beerType == "Ale"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Ale,
            dumpYeastAndHops: e.target.value
          }
        })
      } else if (beerType == "Lager"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Lager,
            dumpYeastAndHops: e.target.value
          }
        })
      }
    }
    const handleColdCrash = (e) => {
      if(beerType == "Ale"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Ale,
            coldCrash: e.target.value
          }
        })
      } else if(beerType == "Lager"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Lager,
            coldCrash: e.target.value
          }
        })
      }
    }
    const handleCarbonation = (e) => {
      if(beerType == "Ale"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Ale,
            carbonation: e.target.value
          }
        })
      } else if(beerType == "Lager"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Lager,
            carbonation: e.target.value
          }
        })
      }
    }
    const handleLagering = (e) => {
      if(beerType == "Ale"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Ale,
            lagering: e.target.value
          }
        })
      } else if(beerType == "Lager"){
        setForm({
          ...form,
          schedulingParameters: {
            ...globalSchedulingParameters.Lager,
            lagering: e.target.value
          }
        })
      }
    }

  const parametersInputPage = () => {
    console.log("form", form)
    console.log("beerList", beerList)
    navigate("beer-list")

  }



  const beerRecipeRenderView = () => {
    if(beerType == "Ale"){
      return(
        <div>
        <h1>Scheduling Parameters</h1>
        <h2>{beerType}</h2>
        <label>Primary Fermentation</label>
        <input type="number" value={form.schedulingParameters.primaryFermentation} name="primaryFermentation" placeholder="Primary Fermentation" onChange={handlePriFermentation}/>
        <label>Secondary Fermentation</label>
        <input type="number" value={form.schedulingParameters.secondaryFermetation} name="secondaryFermentation" placeholder="Secondary Fermentation" onChange={handleSecondaryFermentation}/>
        <label>Dump Yeast & Hops</label>
        <input type="number" value={form.schedulingParameters.dumpYeastAndHops} name="dumpYeast&Hops" placeholder="Dump Yeast & Hops" onChange={handleDumpYeastAndHops}/>
        <label>Diacetyl Rest</label>
        <input type="number" value={form.schedulingParameters.dRest} name="dRest" placeholder="Diacetyl Rest" onChange={handleDRest}/>
        <label>Cold Crash</label>
        <input type="number" value={form.schedulingParameters.coldCrash} name="coldCrash" placeholder="Cold Crash" onChange={handleColdCrash}/>
        <label>Carbonation</label>
        <input type="number" value={form.schedulingParameters.carbonation} name="primaryFermentation" placeholder="Carbonation" onChange={handleCarbonation}/>
        <button type="button" onClick={parametersInputPage}>Add Beer!</button>
        </div>
      )}
       else if(beerType == "Lager"){
         return(
           <div>
           <h1>Scheudling Parameters</h1>
           <h2>{beerType}</h2>
           <label>Primary Fermentation</label>
           <input type="number" value={form.schedulingParameters.primaryFermentation} name="primaryFermentation" placeholder="Primary Fermentation" onChange={handlePriFermentation}/>
           <label>Diacetyl Rest</label>
           <input type="number" value={form.schedulingParameters.dRest} name="dRest" placeholder="Diacetyl Rest" onChange={handleDRest}/>
           <label>Dump Yeast & Hops</label>
           <input type="number" value={form.schedulingParameters.dumpYeastAndHops} name="dumpYeast&Hops" placeholder="Dump Yeast & Hops" onChange={handleDumpYeastAndHops}/>
           <label>Lagering</label>
           <input type="number" value={form.schedulingParameters.lagering} name="lagering" placeholder="Lagering" onChange={handleLagering}/>
           <label>Cold Crash</label>
           <input type="number" value={form.schedulingParameters.coldCrash} name="coldCrash" placeholder="Cold Crash" onChange={handleColdCrash}/>
           <label>Carbonation</label>
           <input type="number" value={form.schedulingParameters.carbonation} name="primaryFermentation" placeholder="Carbonation" onChange={handleCarbonation}/>
           <button type="button" onClick={parametersInputPage}>Add Beer!</button>
           </div>
         )}
      else {
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

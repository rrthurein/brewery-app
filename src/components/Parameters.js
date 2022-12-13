import React, { useContext } from 'react'
import SelectedRecipeContext from '../SelectedRecipeContext'
import BeerTypeContext from '../BeerTypeContext'
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const Parameters = () => {
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext)
  const { beerType, setBeerType } = useContext(BeerTypeContext)
  const navigate = useNavigate()
  const nullSelectedRecipe = () => {
    setSelectedRecipe(null);
  }

  return (
    <div className="beerInfo-div">
      <h1>{selectedRecipe.beerName} Parameters</h1>
      <div className="keyName">Primary Fermentation</div>
      <hr className="hr"></hr>
      <div className="valueName">{selectedRecipe.schedulingParameters.primaryFermentation} </div>

      {
        beerType == "Ale" ?
        <>
        <label>Secondary Fermentation</label>

        <hr className="hr"></hr>
        <div className="valueName">{selectedRecipe.schedulingParameters.secondaryFermentation} </div>
        </> : null

      }

      <div className="keyName">Dump Yeast & Hops</div>
      <hr className="hr"></hr>
      <div className="valueName">{selectedRecipe.schedulingParameters.dumpYeastAndHops} </div>



      <div className="keyName">Diacetyl Rest</div>
      <hr className="hr"></hr>
      <div className="valueName">{selectedRecipe.schedulingParameters.dRest} </div>

      {
        beerType == "Lager" ?
        <>
        <label>Lagering</label>
        <hr className="hr"></hr>
        <div className="valueName">{selectedRecipe.schedulingParameters.lagering} </div>
        </>: null
      }

      <div className="keyName">Cold Crash</div>
      <hr className="hr"></hr>
      <div className="valueName">{selectedRecipe.schedulingParameters.coldCrash} </div>

      <div className="keyName">Carbonation</div>
      <hr className="hr"></hr>
      <div className="valueName">{selectedRecipe.schedulingParameters.carbonation} </div>

       <div className="buttonDiv">
         <div> <button type="button" onClick={()=>{navigate("/")}}>Back</button></div>
       </div>
     </div>
  )
}

export default Parameters

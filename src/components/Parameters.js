import React, { useContext, useState } from 'react'
import SelectedRecipeContext from '../SelectedRecipeContext'
import BeerTypeContext from '../BeerTypeContext'
import BeerListContext from '../BeerListContext'
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const Parameters = () => {
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext)
  const { beerType, setBeerType } = useContext(BeerTypeContext)
  const { beerList, setBeerList } = useContext(BeerListContext)

  const [editForm, setEditForm] = useState({})
  const [editParameter, setEditParameter] = useState(false)

  const navigate = useNavigate()

  const editHandleClick = () => {
    setEditParameter(!editParameter)
  }
  const editDoneClick = () => {
    setEditParameter(!editParameter)
  }

 const handleEditChange = (e) => {
   let selectedRecipeID = selectedRecipe.id
   const updatedParameter = {
     ...beerList.schedulingParameters,
     [e.target.name] : e.target.value
   }
   beerList[selectedRecipeID].schedulingParameters = updatedParameter
   setBeerList(beerList)
   console.log("beerList[selectedRecipeID].schedulingParameters", beerList[selectedRecipeID].schedulingParameters)
   console.log("beerList", beerList)
    console.log("updatedParameter", updatedParameter)


 }

  return (
    <div className="beerInfo-div">
      <h1>{selectedRecipe.beerName} Parameters</h1>

      <div className="keyName">Primary Fermentation</div>
      {
        editParameter == false ?
        <div className="valueName">{selectedRecipe.schedulingParameters.primaryFermentation}</div>
        : <input type="text" name="primaryFermentation" placeholder="primaryFermentation" onChange={handleEditChange} required/>
      }

      {
        beerType == "Ale" ?
        <>
        <label>Secondary Fermentation</label>
        <div className="valueName">{selectedRecipe.schedulingParameters.secondaryFermentation} </div>
        </> : null
      }

      <div className="keyName">Dump Yeast & Hops</div>
      <div className="valueName">{selectedRecipe.schedulingParameters.dumpYeastAndHops} </div>

      <div className="keyName">Diacetyl Rest</div>
      <div className="valueName">{selectedRecipe.schedulingParameters.dRest} </div>

      {
        beerType == "Lager" ?
        <>
        <label>Lagering</label>

        <div className="valueName">{selectedRecipe.schedulingParameters.lagering} </div>
        </>: null
      }

      <div className="keyName">Cold Crash</div>
      <div className="valueName">{selectedRecipe.schedulingParameters.coldCrash} </div>

      <div className="keyName">Carbonation</div>
      <div className="valueName">{selectedRecipe.schedulingParameters.carbonation} </div>

       <div className="buttonDiv">
         { editParameter == false ?
           <div><button type="button" onClick={editHandleClick}>Edit</button></div>
           : <div><button type="button" onClick={editDoneClick}>Done</button></div>}
         <div> <button type="button" onClick={()=>{navigate("/")}}>Back</button></div>
       </div>
     </div>
  )
}

export default Parameters

import React, { useContext, useState } from 'react'
import SelectedRecipeContext from '../SelectedRecipeContext'
import BeerTypeContext from '../BeerTypeContext'
import BeerListContext from '../BeerListContext'
import { useNavigate, useParams } from 'react-router-dom'; //Navigating Programmatically


const Parameters = () => {
  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext)
  const { beerType, setBeerType } = useContext(BeerTypeContext)
  const { beerList, setBeerList } = useContext(BeerListContext)


  const [editParameterForm, setEditParameterForm] = useState({})
  const [editParameter, setEditParameter] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const beerName = params.beerName

  const editHandleClick = () => {
    setEditParameter(!editParameter)
  }
  const editDoneClick = () => {
    setEditParameter(!editParameter)
  }

 const handleEditChange = (e) => {

   //adds selected input to the editParameterForm
   const newSchedulingParameter = {
     ...editParameterForm,
     [e.target.name] : e.target.value
   }

   //updates the editParameterForm everytime after an input
   setEditParameterForm(newSchedulingParameter)

   //updated the selected beerRecipe schedulingParameters
   const updatedParameter = {
     ...selectedRecipe,
     schedulingParameters : newSchedulingParameter
   }

   //updates beerList with the updated selected beerRecipe's Parameter
   const updatedBeerList = beerList.map((beer) =>{
     if(beer.beerName == updatedParameter.beerName){
       setSelectedRecipe(updatedParameter)
       return updatedParameter
     } else{
       return beer
     }
   })

   //updates the beerList state with the updatedBeerList
   setBeerList(updatedBeerList)
   console.log("beerList", beerList)
 }

 //beerList.splice(id, 1, updatedBeerList)
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
          {
            editParameter == false ?
            <div className="valueName">{selectedRecipe.schedulingParameters.secondaryFermentation}</div>
            : <input type="text" name="secondaryFermetation" placeholder="secondaryFermetation" onChange={handleEditChange} required/>
          }
          </> : null
        }

      <div className="keyName">Dump Yeast & Hops</div>
        {
          editParameter == false ?
          <div className="valueName">{selectedRecipe.schedulingParameters.dumpYeastAndHops} </div>
          : <input type="text" name="dumpYeastAndHops" placeholder="dumpYeastAndHops" onChange={handleEditChange} required/>
        }


        <div className="keyName">Diacetyl Rest</div>
        {
          editParameter == false ?
          <div className="valueName">{selectedRecipe.schedulingParameters.dRest} </div>
          : <input type="text" name="dRest" placeholder="dRest" onChange={handleEditChange} required/>
        }

        {
          beerType == "Lager" ?
          <>
          <label>Lagering</label>
          {
            editParameter == false ?
            <div className="valueName">{selectedRecipe.schedulingParameters.lagering} </div>
            : <input type="text" name="lagering" placeholder="lagering" onChange={handleEditChange} required/>
          }
          </>: null
        }

      <div className="keyName">Cold Crash</div>
        {
          editParameter == false ?
          <div className="valueName">{selectedRecipe.schedulingParameters.coldCrash} </div>
          : <input type="text" name="coldCrash" placeholder="coldCrash" onChange={handleEditChange} required/>
        }

      <div className="keyName">Carbonation</div>
        {
          editParameter == false ?
          <div className="valueName">{selectedRecipe.schedulingParameters.carbonation} </div>
          : <input type="text" name="carbonation" placeholder="carbonation" onChange={handleEditChange} required/>
        }


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

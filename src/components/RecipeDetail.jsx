import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; //Navigating Programmatically
import SelectedRecipeContext from "../SelectedRecipeContext";
import beerStylesData from "../beerStylesData.json";
import BeerTypeContext from "../BeerTypeContext";
import BeerListContext from "../BeerListContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'


const RecipeDetail = () => {

  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const { beerType, setBeerType } = useContext(BeerTypeContext);
  const { beerList, setBeerList } = useContext(BeerListContext);

  const [editParameter, setEditParameter] = useState(false);

  const navigate = useNavigate();

  const params = useParams()
  const beerName = params.beerName


   const editHandleClick = () => {
     setEditParameter(!editParameter)
   }

   const editDoneClick = () => {
     setEditParameter(!editParameter)

   }

   const handleEditChange = (e) => {
     e.preventDefault()

     //adds selected input to the newSelectedRecipe object
     let newSelectedRecipe = {
       ...selectedRecipe,
       [e.target.name] : e.target.value
     }
     setSelectedRecipe(newSelectedRecipe)


     //updated the beerList with newSelectedRecipe
     let updatedSelectedRecipe = {
       ...beerList,
       [e.target.id] : newSelectedRecipe
     }

     //updates beerList with the updatedSelectedRecipe
     const updatedBeerList = beerList.map((beer) =>{
       console.log(beer, newSelectedRecipe.beerName)
       if(beer.id == newSelectedRecipe.id){
         let id = e.target.id
         return updatedSelectedRecipe[id]
       } else{
         return beer
       }
     })

     // updates the beerList state with the updatedBeerList
     console.log(updatedBeerList)
     setBeerList(updatedBeerList)
   }


  const handleClickBrewDay = () => {
    navigate("/calendar")
  }



 return(
   <section className="Detail-div">
     <div className="beerInfo-div">
      <div className="buttonDiv-RecipeDetailButton">
        <h1>Recipe Detail</h1>
            { editParameter == false ?
              <div><button type="button" onClick={editHandleClick}><FontAwesomeIcon icon={faEdit}/></button></div>
              : <div><button type="button" onClick={editDoneClick}>Done</button></div>}
        </div>

         <div className="keyName">Beer Name</div>
         {
           editParameter == false ?
           <div className="valueName">{selectedRecipe.beerName}</div>
           : <input className="valueName" type="text" id={selectedRecipe.id} defaultValue={selectedRecipe.beerName} name="beerName" placeholder="beerName" onChange={handleEditChange} required/>
         }


         <div className="keyName">Beer Style</div>
         {
           editParameter == false ?
           <div className="valueName">{selectedRecipe.beerStyle} </div>
           : <input className="valueName" type="text" id={selectedRecipe.id} defaultValue={selectedRecipe.beerStyle} name="beerStyle" placeholder="beerStyle" onChange={handleEditChange} required/>
         }


         <div className="keyName">Beer ABV</div>
         {
           editParameter == false ?
           <div className="valueName">{selectedRecipe.abv} </div>
           : <input className="valueName" type="text" id={selectedRecipe.id} defaultValue={selectedRecipe.abv} name="abv" placeholder="abv" onChange={handleEditChange} required/>
         }


         <div className="keyName">Grain</div>
         {
           editParameter == false ?
           <div className="valueName">{selectedRecipe.grain} </div>
           : <input className="valueName" type="text" id={selectedRecipe.id} defaultValue={selectedRecipe.grain} name="grain" placeholder="grain" onChange={handleEditChange} required/>
         }


         <div className="keyName">Yeast</div>
         {
           editParameter == false ?
           <div className="valueName">{selectedRecipe.yeast} </div>
           : <input className="valueName" type="text" id={selectedRecipe.id} defaultValue={selectedRecipe.yeast} name="yeast" placeholder="yeast" onChange={handleEditChange} required/>
         }

         <div className="keyName">Hops</div>
         {
           editParameter == false ?
           <div className="valueName">{selectedRecipe.hops} </div>
           : <input className="valueName" type="text" id={selectedRecipe.id} defaultValue={selectedRecipe.hops} name="hops" placeholder="hops" onChange={handleEditChange} required/>
         }


    </div>
  </section>
 )
}

export default RecipeDetail

// <div className="scheduleAndParameter-button">
//   <div>
//     <button type="button" onClick={handleClickBrewDay}>
//       Schedule
//     </button>
//   </div>
//   <div>
//     <button type="button" onClick={() => navigate("/parameters/" + selectedRecipe.beerName)}>
//       Parameters
//     </button>
//   </div>
// </div>

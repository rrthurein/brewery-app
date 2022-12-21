import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; //Navigating Programmatically
import SelectedRecipeContext from "../SelectedRecipeContext";
import beerStylesData from "../beerStylesData.json";
import BeerTypeContext from "../BeerTypeContext";
import BeerListContext from "../BeerListContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'


const RecipeDetail = () => {

  const { selectedRecipe, setSelectedRecipe } = useContext(SelectedRecipeContext);
  const { beerType, setBeerType } = useContext(BeerTypeContext);
  const { beerList, setBeerList } = useContext(BeerListContext);

  const [editParameter, setEditParameter] = useState(false);
  // const [editSelectedRecipe, setEditSelectedRecipe] = useState({});

  const navigate = useNavigate();
  const params = useParams()
  const beerName = params.beerName


  const settingBeerType = () => {
    for(let i = 0;i < beerStylesData.length; i++){
      if(selectedRecipe.beerStyle === Object.values(beerStylesData[i])[1]){
        setBeerType(Object.values(beerStylesData[i])[2])
      }
     }
   }

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

     //updates the newSelectedRecipe object to the
     // setEditSelectedRecipe(newSelectedRecipe)

     //updated the beerList with newSelectedRecipe
     let updatedSelectedRecipe = {
       ...beerList,
       [e.target.id] : newSelectedRecipe
     }


     console.log(updatedSelectedRecipe);

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
    settingBeerType()
  }



 return(
   <section className="RecipeDetail">
     <div>
      <button type="button" onClick={() => navigate("/")}
      style={{marginLeft: 180, fontSize: 20, letterSpacing: "0.2em"}}>
      <FontAwesomeIcon icon={faChevronUp} rotation={270}/> Back
      </button>
     </div>
     <div className="beerInfo-div">
     <div className="buttonDiv-RecipeDetailButton">
      <h1>Recipe Detail</h1>
          { editParameter == false ?
            <div><button type="button" onClick={editHandleClick}>Edit</button></div>
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

          <div className="buttonDiv">
            <div>
              <button type="button" onClick={handleClickBrewDay}>
                Schedule
              </button>
            </div>
            <div>
              <button type="button" onClick={() => navigate("/parameters/" + selectedRecipe.beerName)} style={{width: 92}}>
                Parameters
              </button>
            </div>

      </div>
    </div>
  </section>
 )
}

export default RecipeDetail

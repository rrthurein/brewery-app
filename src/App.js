import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import data from "./data.json";

const startSop = [
  {
    "id": 1,
    "toDo": "Clean Kegs",
  },{
    "id": 2,
    "toDo": "CIP tanks",

  },{
    "id": 3,
    "toDo": "Check Gravity",

  },{
    "id": 4,
    "toDo": "Check the Cold Box",

  },{
    "id": 5,
    "toDo": "Check the fementor tank",
  },

];


function App() {
  const [sop, setSop] = useState(startSop)
  const [toDo, setToDo] = useState('') //state is the information that the page is rendering
  const [completedSops, setCompletedSops] = useState([])

  const handleChange = (e) => {
    setToDo(e.target.value)
  }

  const handleAdd = () => {

    const id = Math.max(...sop.map((t) => t.id)) + 1
    //this creates a new ID for the object that the add button creates. map: return the element you do want
    //whenever handleAdd add one make sure to give it an id that is a valid id that non of the other item have
    const newSop = sop.concat({toDo, id})
     setSop(newSop);

  }

  const addCompletedSop = (item) => {
    const newCompletedSop = completedSops.concat(item)
      // completedSops.push(item)
      setCompletedSops(newCompletedSop)
      console.log("added", completedSops)
  }

  const remove = (id) => {
    const newSopFilter = sop.filter((item)=>{   //filter element
      if(item.id === id){
        return false
      }
      return true
    })
    setSop(newSopFilter)
  }


  //remove the item from array


//whenever you need to pass an argument to a fucntion that you are calling from event handler you need to put it in a an
//the map loops through each item and then
  const sops = sop.map((item) => {
    return (
       <li key={item.id}>
         <input type="checkbox" onChange={()=>{
           remove(item.id)
           addCompletedSop(item);
         }}/>
         {item.toDo}
       </li>
     )
   });

   const completedSopList = completedSops.map((item) =>{
       return (
         <li>
         {item.id}
         {item.toDo}
         </li>
       )
     })
     //creating html here and rendering down

console.log("rendering", completedSopList);



  return (

    <div className="conatiner-sop">
      <header className="App-header">
        <h1>SOP list for the Brewery</h1>
          <div>
          <input id="sop" type="text" value={toDo} onChange={handleChange} />
          <button type="button" onClick={handleAdd}>Add</button>
          </div>
          <ul>
          {
            sops
          }

          </ul>

      </header>
    <div className="container-completedSOP">
    <h1>Completed SOP list for the Brewery</h1>
      <div id="completedSOP">
      {
        completedSopList
      }
      </div>
    </div>

    </div>
  );
}

export default App;

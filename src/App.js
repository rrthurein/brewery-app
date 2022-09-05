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

  const handleChange = (e) => {
    setToDo(e.target.value)
  }

  const handleAdd = () => {
    const newSop = sop.concat({toDo})
        setSop(newSop);
  }

  const remove = (id) => {
    const newSopFilter = sop.filter((item)=>{
      if(item.id === id){
       return false;
      }
      return true
    })
    setSop(newSopFilter)
  }

  const uID = () => {
    const randomID = { id : Math.floor(Math.random() * 10) }
    return randomID;
  }

  //whenever handleAdd add one make sure to give it an id that is a valid id that non of the other item have
  // add ID into the element
//every time i add an object and incremented
//object oriented programming  checklist.add.item
  //remove the item from array
  //filter element
  //map return the element you do want
//key={item.id}
//whenever you need to pass an argument to a fucntion that you are calling from event handler you need to put it in a an
  const sops = sop.map((item) => (
     <li>
     <input type="checkbox" onChange={()=>{
       console.log("Anonymous")
       remove(item.id);
     }}/>
     {item.toDo}</li>)); //creating html here and rendering down

console.log("rendering");



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
          {

          }
          </ul>

      </header>


    </div>
  );
}

export default App;

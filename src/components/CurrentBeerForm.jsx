import React from 'react'

const CurrentBeerForm = (props) => {

  const handleNameChange = props.handleNameChange
  const handleABVChange = props.handleABVChange
  const handleBeerStyleChange = props.handleBeerStyleChange
  const handleBrewingTimeChange = props.handleBrewingTimeChange
  const handleGrainChange = props.handleGrainChange
  const handleYeastChange = props.handleYeastChange
  const handleHopsChange = props.handleHopsChange
  const handleClick = props.handleClick

  return (
    <div className="BeerRecipeForm">
      <h1>Beer Recipe Setup</h1>
        <label>Beer Name:</label>
        <input type="text" name="beerName" placeholder="Beer Name" onChange={handleNameChange} required/>
        <label>Beer Style:</label>
        <select name="beerStyle" onChange={handleBeerStyleChange}>
        <option value="IPA">IPA</option>
        <option value="Pilsner">Pilsner</option>
        <option value="Belgian Blonde">Belgian Blonde</option>
        </select>
        <label>ABV:</label>
        <input type="number" required name="ABV" placeholder="ABV" onChange={handleABVChange}/>
        <label>Brewing Time:</label>
        <input type="text" required name="brewingTime" placeholder="Brewing Time" onChange={handleBrewingTimeChange}/>
        <label>Grain:</label>
        <input type="text" name="grain" placeholder="Grain" required onChange={handleGrainChange}/>
        <label>Yeast:</label>
        <input type="text" name="yeast" placeholder="Yeast" required onChange={handleYeastChange}/>
        <label>Hops:</label>
        <input type="text" name="hops" placeholder="Hops" required onChange={handleHopsChange}/>
        <button type="button" onClick={handleClick}>Add Beer!</button>
      </div>
  )
}

export default CurrentBeerForm

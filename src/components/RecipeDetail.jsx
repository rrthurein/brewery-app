import React from 'react'


const RecipeDetail = (props) => {

 return(

     <div className="beerInfo-div">
       <div className="keyName">Beer Name</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.beerName} </div>

       <div className="keyName">Beer Style</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.beerStyle} </div>

       <div className="keyName">Beer ABV</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.abv} </div>

       <div className="keyName">Brewing</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.brewingTime} </div>

       <div className="keyName">Grain</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.grain} </div>

       <div className="keyName">Yeast</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.yeast} </div>

       <div className="keyName">Hops</div>
       <hr className="hr"></hr>
       <div className="valueName">{props.selectedRecipe.hops}</div>
      </div>


 )
}

export default RecipeDetail

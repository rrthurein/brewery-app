import React from "react";

// set the defaults
const SelectedRecipe = React.createContext({
        selectedRecipe: [],
        setSelectedRecipe: () => {}
      }); //creating context so that the context can give the child component data

export default SelectedRecipe;

import React from "react";

// set the defaults
const AddingBeerBooleanContext = React.createContext({
        addingBeer: false,
        setAddingBeer: () => {}
      });
 //creating context so that the context can give the child component data

export default AddingBeerBooleanContext;

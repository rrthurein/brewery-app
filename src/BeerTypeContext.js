import React from "react";

// set the defaults
const BeerListContext = React.createContext({
        beerType: [],
        setBeerType: () => {}
      },
    ); //creating context so that the context can give the child component data

export default BeerListContext;

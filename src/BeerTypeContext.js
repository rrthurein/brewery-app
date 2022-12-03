import React from 'react'

const BeerTypeContext = React.createContext({
  beerType: [],
  setBeerType: () => {}
})
//creating context so that the context can give the cihld component data

export default BeerTypeContext;
 

import React from 'react'

const GlobalSchedulingParametersContext = React.createContext({
  globalSchedulingParameters: {},
  setGlobalSchedulingParameters: () => {}
})
 //creating context so that the context can give the child component data

export default GlobalSchedulingParametersContext;

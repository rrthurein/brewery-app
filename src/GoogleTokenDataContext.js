import React from 'react'

const GoogleTokenDataContext = React.createContext({
  googleTokenData: {},
  setGoogleTokenData: () => {}
})
//creating context so that the context can give the child component data

export default GoogleTokenDataContext

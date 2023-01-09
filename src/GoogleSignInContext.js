import React from 'react'

const GoogleSignInContext = React.createContext({
  googleSignIn: {},
  setGoogleSignIn: () => {}
})
//creating context so that the context can give the child component data

export default GoogleSignInContext

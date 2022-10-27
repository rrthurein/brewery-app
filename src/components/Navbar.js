import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'thick',
    }
  }

  return (
    <nav>
      <NavLink style={navLinkStyles} to="/home">Home</NavLink>
      <NavLink style={navLinkStyles} to="/brew">Brew</NavLink>
      <NavLink style={navLinkStyles} to="/beer-list">Beer List</NavLink>
    </nav>
  )
}

export default Navbar

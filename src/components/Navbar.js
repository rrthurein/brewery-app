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
      <NavLink style={navLinkStyles} to="/">Beer List</NavLink>
    </nav>

  )
}

export default Navbar

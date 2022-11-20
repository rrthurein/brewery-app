import React from 'react'
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const PopUp = () => {
  const navigate = useNavigate();

  const closeButton = () => {
    navigate("/home")
  }

  return (
    <div className="popup">
      <div>
        <h1>You have sucessfully added your Brew Schedule!</h1>
          <button className="close-btn" onClick={closeButton}>Close</button>
      </div>
    </div>
  )
}

export default PopUp

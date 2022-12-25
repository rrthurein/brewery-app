import React from 'react'
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const SuccessPage = () => {
  const navigate = useNavigate();

  const closeButton = () => {
    navigate("/")
  }

  const openCalendar = () =>{
    console.log("openCalendar")
  }

  return (
    <div className="popup">
      <div>
        <h1>You have sucessfully added your Brew Schedule!</h1>
          <button className="close-btn" onClick={closeButton}>Close</button>
          <button className="go-to-calendar-btn" onClick={openCalendar}> Open Calendar</button>
      </div>
    </div>
  )
}

export default SuccessPage

import React from 'react'
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const SuccessPage = () => {
  const navigate = useNavigate();



  const closeButton = () => {
    localStorage.removeItem('success')
    navigate("/")
  }

  const openCalendar = () =>{
    let successLocalStorageData = localStorage.getItem('success')
    let successLocalStorageParseData = JSON.parse(successLocalStorageData)
    localStorage.removeItem('success')
    navigate("/")
    return window.open(successLocalStorageParseData.result.htmlLink)
  }

  return (
    <div>
      <div className="SuccessPage">
        <h1>You have sucessfully added your Brew Schedule!</h1>
          <button className="close-btn" onClick={closeButton}>Close</button>
          <button className="go-to-calendar-btn" onClick={openCalendar}> Open Calendar</button>
      </div>
    </div>
  )
}

export default SuccessPage

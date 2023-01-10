import React from 'react'
import './PopUp.css'
import { useNavigate } from 'react-router-dom'; //Navigating Programmatically


const PopUp = (props) => {
  const navigate = useNavigate();

  const closeButton = () => {
    localStorage.removeItem('success')
    props.setTrigger(false)
  }

  const openCalendar = () =>{
    let successLocalStorageData = localStorage.getItem('success')
    let successLocalStorageParseData = JSON.parse(successLocalStorageData)
    localStorage.removeItem('success')
    navigate("/")
    return window.open(successLocalStorageParseData.result.htmlLink)
  }

  return (props.trigger) ? (
    <div className="popUp">
      <div className="popUp-inner">
        <h1>You have sucessfully added your Brew Schedule!</h1>
        <br />
          <button className="close-btn" onClick={closeButton}>x</button>
          <button className="go-to-calendar-btn" onClick={openCalendar}> Open Calendar</button>
      </div>
    </div>
  ) : "";
}

export default PopUp

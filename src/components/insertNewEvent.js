import React from 'react';
const { google } = require('googleapis');
import { gapi } from 'gapi-script';
import jwt_decode from "jwt-decode";
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.REACT_APP_CREDENTIALS);
const calendarId = process.env.REACT_APP_CALENDAR_ID
const calendar = google.calendar({version : "v3"});
const CLIENT_ID = "890654996682-urq2der67lj97k6nj0dcrk9kkj6ts3oi.apps.googleusercontent.com"
// const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = "https://www.googleapis.com/auth/calendar"

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
)
//to authorize we are passing in the CREDENTIALS, private_key, and SCOPEs to the Google auth function with JWT


//THIS WILL CONTAIN THE TIME OFFSET FOR THE REGION


const insertNewEvent = () => {

//creating a function that converts the date into the format that GAPI needs.

const dateTimeForCalendar = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10){
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10){
    day = `0${day}`;
  }
  let hour = date.getHours();
  if (day < 10){
    day = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (day < 10){
    day = `0${minute}`;
  }

  const newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.0000`;
  const event = new Date(Date.parse(newDateTime));

  const startDate = event;
  const endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1))

  return {
    'start': startDate,
    'end': endDate
  }

}

const insertEvent = async (event) => {
  try {
    const response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event
    });

    if (response['status'] == 200 && response['statusText'] === 'OK'){
      return "Event Inserted sucessfully";
    } else {
      return "Failed to insert event"
    }
  } catch (error){
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};

let dateTime = dateTimeForCalendar();
//Event for Google calendar
let event = {
  'summary': `This is the lit.`,
  'description': `This is happening!!`,
  'start': {
    'dateTime': dateTime['start'],
    'timeZone': 'United States/California'
  },
  'end': {
    'dateTime': dateTime['end'],
    'timeZone': 'United States/California'
  }
};

const insertNewEvent = async (event) => {
  try {
    const res = await insertEvent(event);
    console.log(res)
  } catch (error) {
    console.log(error);
  }
}


  return (
    <div>{insertNewEvent(event)}</div>
  )
}

export default insertNewEvent

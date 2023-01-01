  import { gapi } from 'gapi-script';
  import jwt_decode from "jwt-decode";
  import App from "./App"


  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"


  const makeApiRequest = async (i, beerEventTimes, accessToken) => {
    gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
        method: "POST",
        body: beerEventTimes[i],
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }, await sleep(i * 1000))
      .then((response) => {
            console.log("sucess", response)
            return [true, response]
          },
        function (err) {
          console.log(err);
          return [false, err];
            }
          )
      }

    const makeEventsDate = (beerLength,beerEventTimes, startDate, endDate, brewDate,
      schedulingParameters, accessToken, i) => {
        if(i === 0){
          startDate.push(new Date(brewDate))
          let endDateValue = brewDate.setDate(brewDate.getDate() + Number(Object.values(schedulingParameters)[i]))
          endDate.push(new Date(endDateValue))
        } else if(i > 0){
          startDate.push(endDate[i - 1])
          const startDateValue = new Date(startDate[i]);
          let endDateValue= startDateValue.setDate(startDateValue.getDate() + Number(Object.values(schedulingParameters)[i]))
          endDate.push(new Date(endDateValue))
        }

        beerEventTimes[i] = {
          summary: Object.keys(schedulingParameters)[i],
          start: {
            dateTime: startDate[i],
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: endDate[i],
            timeZone: 'America/Los_Angeles',
          },
          colorId: 5,
        }

      makeApiRequest(i, beerEventTimes, accessToken)
    }

    const sleep = async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

  export function calculateBrewingSchedule(brewDate, schedulingParameters, accessToken) {
        const beerLength = Object.keys(schedulingParameters).length
        const beerEventTimes = []
        let startDate = []
        let endDate = []

        for(let i = 0; i < beerLength; i++){
          makeEventsDate(beerLength,beerEventTimes, startDate, endDate ,brewDate ,
             schedulingParameters, accessToken, i)
        }

        }

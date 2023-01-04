  import { gapi } from 'gapi-script';


  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"

  const errorFromLocalStorage = JSON.parse(localStorage.getItem('error') || '[]')
  const successFromLocalStorage = JSON.parse(localStorage.getItem('success') || '[]')

  const makeApiRequest = async (i, beerEventTimes, accessToken) => {
    gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
        method: "POST",
        body: beerEventTimes[i],
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      }, await sleep(i * 1000))
      .then((success) => {
            localStorage.setItem("success", JSON.stringify(success))
            return [true, success]
          },
        function (err) {
          console.log(err.result.error.code)
          localStorage.setItem("err", JSON.stringify(err.result.error.code))
          return [false, err];
            }
          )
      }

    const makeEventsDate = (beerLength, beerEventTimes, startDate, endDate, brewDate,
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
          makeEventsDate(beerLength, beerEventTimes, startDate, endDate ,brewDate ,
             schedulingParameters, accessToken, i)
        }

        }

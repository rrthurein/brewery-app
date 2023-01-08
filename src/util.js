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

      const sleep = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

    const makeEventsDate = (beerLength, beerEventTimes, startDate, endDate, brewDate,
      schedulingParameters, accessToken, i, selectedRecipeName, fermentationTank, StageName) => {

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
          summary: "FV: " + fermentationTank + ", Beer Name: " + selectedRecipeName + ", Stage: " + StageName,
          start: {
            dateTime: startDate[i],
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: endDate[i],
            timeZone: 'America/Los_Angeles',
          },
          colorId: fermentationTank,
        }

      makeApiRequest(i, beerEventTimes, accessToken)
    }



  export function calculateBrewingSchedule(brewDate, schedulingParameters, accessToken, selectedRecipeName, fermentationTank) {
        const beerLength = Object.keys(schedulingParameters).length
        const beerEventTimes = []
        let startDate = []
        let endDate = []

        for(let i = 0; i < beerLength; i++){

          let listOfSchedulingParameterNames = ["Primary Fermentation", "Secondary Fermentation", "Dump Yeast and Hops", "D-Rest", "Lagering", "Cold Crash", "Carbonation"]
          let StageName;

          if(Object.keys(schedulingParameters)[i] === "primaryFermentation"){
           StageName = listOfSchedulingParameterNames[0]
          } else if(Object.keys(schedulingParameters)[i] === "secondaryFermentation"){
           StageName = listOfSchedulingParameterNames[1]
          } else if(Object.keys(schedulingParameters)[i] === "dumpYeastAndHops"){
           StageName = listOfSchedulingParameterNames[2]
          } else if(Object.keys(schedulingParameters)[i] === "dRest"){
           StageName = listOfSchedulingParameterNames[3]
          } else if(Object.keys(schedulingParameters)[i] === "lagering"){
           StageName = listOfSchedulingParameterNames[4]
          } else if(Object.keys(schedulingParameters)[i] === "coldCrash"){
           StageName = listOfSchedulingParameterNames[5]
          } else if(Object.keys(schedulingParameters)[i] === "carbonation"){
           StageName = listOfSchedulingParameterNames[6]
          }

          makeEventsDate(beerLength, beerEventTimes, startDate, endDate ,brewDate ,
             schedulingParameters, accessToken, i, selectedRecipeName, fermentationTank, StageName)
        }
      }

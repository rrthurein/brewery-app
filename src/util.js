  import { gapi } from 'gapi-script';
  import jwt_decode from "jwt-decode";
  import App from "./App"


  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"



  const makeApiRequest = async (request, progressCb) => {
    let retryCount = 0;
    while (true) {
      try {
        return await request();
      } catch (error) {
        retryCount++;
        if (retryCount > 5) {
          throw error;
        }
        // Sleep for a short period of time before trying again
        await sleep(1000);
        progressCb({ retryCount });
      }
    }
  }

  const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  export function calculateBrewingSchedule(brewDate, beerType, schedulingParameters, accessToken) {
    console.log(brewDate, beerType, schedulingParameters, accessToken)
      if(beerType === "Lager") {
        console.log(accessToken)
        const lagerLength = Object.keys(schedulingParameters).length
        const lagerEventTimes = []
        let startDate = []
        let endDate = []

        for(let i = 0; i < lagerLength; i++){
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

          lagerEventTimes[i] = {
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
          makeApiRequest(
            () =>
              gapi.client
                .request({
                  path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                  method: "POST",
                  body: lagerEventTimes[i],
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                }),
            (progress) => {
              console.log(`Retrying API request, attempt ${progress.retryCount}`);
            }
          );
        }
      } else if (beerType === "Ale") {
          const aleLength = Object.keys(schedulingParameters).length
          console.log("aleLength", aleLength)
          let aleEventsTime = []
          let startTime = []
          let endTime = []
          console.log(brewDate, startTime, endTime)
          for(let j = 0; j < aleLength; j++){

            if(j === 0){
              startTime.push(new Date(brewDate))
              let endDateValue = brewDate.setDate(brewDate.getDate() + Number(Object.values(schedulingParameters)[j]))
              endTime.push(new Date(endDateValue))
            } else if(j > 0){
              startTime.push(endTime[j - 1])
              let startDateValue = new Date(startTime[j])
              let endDateValue = startDateValue.setDate(startDateValue.getDate() + Number(Object.values(schedulingParameters)[j]))
              endTime.push(new Date(endDateValue))
            }

            aleEventsTime[j] = {
              summary: Object.keys(schedulingParameters)[j],
              start: {
                dateTime: startTime[j],
                timeZone: 'America/Los_Angeles',
              },
              end: {
                dateTime: endTime[j],
                timeZone: 'America/Los_Angeles',
              },
              colorId: 4,
            }

          makeApiRequest(
            () =>
            gapi.client
            .request({
              path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
              method: "POST",
              body: aleEventsTime[j],
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ` + accessToken,
              },
            }),
            (progress) => {
              console.log(`Retrying API request, attempt ${progress.retryCount}`);
            }
          )
         }
      } else if (beerType === "KettleSour"){
          const kettleSourLength = Object.keys(schedulingParameters).length
          let souringWortEvent = []
          let startDate = []
          let endDate = []

          for(let k = 0; k < kettleSourLength; k++){
            if(k = 0){
              startDate.push(new Date(brewDate))
              let endDateValue = brewDate.setDate(brewDate.getDate() + Number(Object.values(schedulingParameters)[k]))
              endDate.push(new Date(endDateValue))
            } else if(k > 0) {
              startDate.push(endDate[k - 1])
              let startDateValue = new Date(startDate[k])
              let endDateValue = startDateValue.setDate(startDateValue.getDate() + Number(Object.values(schedulingParameters)[k]))
              endDate.push(new Date(endDateValue))
            }
            souringWortEvent[k] = {
              summary: Object.keys(schedulingParameters)[k],
              start: {
                dateTime: startDate[k],
                timeZone: 'America/Los_Angeles',
              },
              end: {
                dateTime: endDate[k],
                timeZone: 'America/Los_Angeles',
              },
              colorId: 11,
            }
            makeApiRequest(
              () =>
              gapi.client
              .request({
                path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                method: "POST",
                body: souringWortEvent[k],
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ` + accessToken,
                },
              }),
              (progress) => {
                console.log(`Retrying API request, attempt ${progress.retryCount}`);
              }
            )
          }
      }
  }

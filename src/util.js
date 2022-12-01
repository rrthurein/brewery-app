import { gapi } from 'gapi-script';
import jwt_decode from "jwt-decode";


    const calendarID = process.env.REACT_APP_CALENDAR_ID;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;


    // const calendar = {version : "v3"}
    const CLIENT_ID = "890654996682-urq2der67lj97k6nj0dcrk9kkj6ts3oi.apps.googleusercontent.com"
    // const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
    const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"



    const schedulingParameters = {
      lager: {
        primaryFermentation: 12,
        dRest: 2,
        lagering: 14,
        carbonation: 2
      },
      ale: {
        primaryFermentation: 9,
        dRest: 2,
        coldCrash: 1,
        carbonation: 2
      },
      kettleSour: {
        souringWort: 2,
        primaryFermentation: 7,
        dRest: 2,
        coldCrash: 2,
        carbonation: 2
      }
    }

  export function calculateBrewingSchedule(brewDate, beerType) {
      if(beerType == "lager") {
          const lagerLength = Object.keys(schedulingParameters.lager).length
          const lagerEventTimes = []
          let startDate = []
          let endDate = []

          for(let i = 0; i < lagerLength; i++){
            if(i == 0){
              startDate.push(new Date(brewDate))
              let endDateValue = brewDate.setDate(brewDate.getDate() + Object.values(schedulingParameters.lager)[i])
              endDate.push(new Date(endDateValue))
            } else if(i > 0){
              startDate.push(endDate[i - 1])
              const startDateValue = new Date(startDate[i]);
              let endDateValue= startDateValue.setDate(startDateValue.getDate() + Object.values(schedulingParameters.lager)[i])
              endDate.push(new Date(endDateValue))
            }

            lagerEventTimes[i] = {
              summary: Object.keys(schedulingParameters.lager)[i],
              start: {
                dateTime: startDate[i],
                timeZone: 'America/Los_Angeles',
              },
              end: {
                dateTime: endDate[i],
                timeZone: 'America/Los_Angeles',
              }
            }
            gapi.client
            .request({
              path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
              method: "POST",
              body: lagerEventTimes[i],
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ya29.a0AeTM1ienyVro1J0UiejJeAFFkWJP92IYiFb0hWjaeQ6nRoBU4gdFYPnqSEdmkgMkZ376s8lKFx3GMC3KRusUKHl9fdwD4E2S-bODcNj_EjmKjgKNZAPOJsjReqSLawA61e_nBaozB7onUjQI8O5AcnhHV6jMaCgYKAaASARASFQHWtWOmptAOxZ5WcdNGhnCIa-TZIg0163`,
              },
            })
            .then(
              (response) => {
                console.log("sucess", response)
                return [true, response];
              },
              function (err) {
                console.log(err);
                return [false, err];
              }
            )
          }
        }
      else if (beerType == "ale") {
            const aleLength = Object.keys(schedulingParameters.ale).length
            const aleEventsTime = []
            const startTime = []
            const endTime = []

            for(let i = 0; i < aleLength; i++){
              if(i = 0){
                startTime.push(new Date(brewDate))
                let endDateValue = brewDate.setDate(brewDate.getDate() + Object.values(schedulingParameters.ale)[i])
                endTime.push(new Date(endDateValue))
              } else if(i > 0){
                startTime.push(endTime[i - 1])
                let startDateValue = new Date(startTime[i])
                let endDateValue = startDateValue.setDate(startDateValue.getDate() + Object.values(schedulingParameters.ale)[i])
                endTime.push(new Date(endDateValue))
              }
              aleEventsTime[i] = {
                summary: Object.keys(schedulingParameters.ale)[i],
                start: {
                  dateTime: startTime[i],
                  timeZone: 'America/Los_Angeles',
                },
                end: {
                  dateTime: endTime[i],
                  timeZone: 'America/Los_Angeles',
                },
              }
              gapi.client
              .request({
                path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                method: "POST",
                body: aleEventTime[i],
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ya29.a0AeTM1ienyVro1J0UiejJeAFFkWJP92IYiFb0hWjaeQ6nRoBU4gdFYPnqSEdmkgMkZ376s8lKFx3GMC3KRusUKHl9fdwD4E2S-bODcNj_EjmKjgKNZAPOJsjReqSLawA61e_nBaozB7onUjQI8O5AcnhHV6jMaCgYKAaASARASFQHWtWOmptAOxZ5WcdNGhnCIa-TZIg0163`,
                },
              })
              .then(
                (response) => {
                  console.log("sucess", response)
                  return [true, response];

                },
                function (err) {
                  console.log(err);
                  return [false, err];
                }
              );
            }
      }
      else if (beerType == "kettleSour"){
                  const kettleSourLength = Object.keys(schedulingParameters.kettleSour).length
                  let souringWortEvent = []
                  let startDate = []
                  let endDate = []

                  for(let i = 0; i < kettleSourLength; i++){
                    if(i = 0){
                      startDate.push(new Date(brewDate))
                      let endDateValue = brewDate.setDate(brewDate.getDate() + Object.values(schedulingParameters.kettleSour)[i])
                      endDate.push(new Date(endDateValue))
                    } else if(i > 0) {
                      startDate.push(endDate[i - 1])
                      let startDateValue = new Date(startDate[i])
                      let endDateValue = startDateValue.setDate(startDateValue.getDate() + Object.values(schedulingParameters.kettleSour)[i])
                      endDate.push(new Date(endDateValue))
                    }
                    souringWortEvent[i] = {
                      summary: Object.keys(schedulingParameters.kettleSour)[i],

                      start: {
                        dateTime: startDate[i],
                        timeZone: 'America/Los_Angeles',
                      },
                      end: {
                        dateTime: endDate[i],
                        timeZone: 'America/Los_Angeles',
                      },
                    }
                    gapi.client
                    .request({
                      path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                      method: "POST",
                      body: souringWortEvent[i],
                      headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ya29.a0AeTM1ienyVro1J0UiejJeAFFkWJP92IYiFb0hWjaeQ6nRoBU4gdFYPnqSEdmkgMkZ376s8lKFx3GMC3KRusUKHl9fdwD4E2S-bODcNj_EjmKjgKNZAPOJsjReqSLawA61e_nBaozB7onUjQI8O5AcnhHV6jMaCgYKAaASARASFQHWtWOmptAOxZ5WcdNGhnCIa-TZIg0163`,
                      },
                    })
                    .then(
                      (response) => {
                        console.log("sucess", response)
                        return [true, response];

                      },
                      function (err) {
                        console.log(err);
                        return [false, err];
                      }
                    )
                  }

              }
          }

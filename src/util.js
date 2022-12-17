import { gapi } from 'gapi-script';
import jwt_decode from "jwt-decode";
import App from "./App"


    const calendarID = process.env.REACT_APP_CALENDAR_ID;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

    // const calendar = {version : "v3"}
    const CLIENT_ID = "890654996682-urq2der67lj97k6nj0dcrk9kkj6ts3oi.apps.googleusercontent.com"
    // const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
    const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"


    // const schedulingParameters = {
    //   lager: {
    //     primaryFermentation: 12,
    //     dRest: 2,
    //     lagering: 14,
    //     carbonation: 2
    //   },
    //   ale: {
    //     primaryFermentation: 9,
    //     dRest: 2,
    //     coldCrash: 1,
    //     carbonation: 2
    //   },
    //   kettleSour: {
    //     souringWort: 2,
    //     primaryFermentation: 7,
    //     dRest: 2,
    //     coldCrash: 2,
    //     carbonation: 2
    //   }
    // }
    //
    // export function utilSchedulingParameters(){
    //   let sP = schedulingParameters
    //   console.log(sP)
    // }

  export function calculateBrewingSchedule(brewDate, beerType, schedulingParameters) {
      if(beerType === "Lager") {
          const lagerLength = Object.keys(schedulingParameters).length
          const lagerEventTimes = []
          let startDate = []
          let endDate = []

          for(let i = 0; i < lagerLength; i++){
            if(i === 0){
              startDate.push(new Date(brewDate))
              let endDateValue = brewDate.setDate(brewDate.getDate() + Object.values(schedulingParameters)[i])
              endDate.push(new Date(endDateValue))
            } else if(i > 0){
              startDate.push(endDate[i - 1])
              const startDateValue = new Date(startDate[i]);
              let endDateValue= startDateValue.setDate(startDateValue.getDate() + Object.values(schedulingParameters)[i])
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
            gapi.client
            .request({
              path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
              method: "POST",
              body: lagerEventTimes[i],
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ya29.a0AX9GBdU8iHvjjR38xerVV82IJveVHfQmPJSDL0R4ND8NrjJQyQQvtU5-_xNBOjc6Rkx1TllbTbrMySELhLpi9IKRQ-U0hnjzyvvdfmmmjbiM6_zmaOJigYVXbwlRmTwlLdrMwVi7kSoqZq7nK3gHyAXeaw69I8kaCgYKAVMSAQASFQHUCsbCYhK0hjEKyoG53C6wVMuH_g0166`,
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
                console.log("brewDate", new Date(brewDate),"this data is the selected day of the month", brewDate.getDate())
                let testAddSelectedDay = brewDate.getDate() + Number(Object.values(schedulingParameters)[j])
                console.log("testAddSelectedDay", testAddSelectedDay)
                //setDate and getDate are not logging correct date. when the these two codes are tested in the calendar
                //component it is adding up correctly. Somewhere along the line the data is getting mixed up.
                let endDateValue = brewDate.setDate(testAddSelectedDay)
                console.log("the days data that adds to the selected date", Object.values(schedulingParameters)[j],
                "this data is the selected day of the month", brewDate.getDate(),
              )
                endTime.push(new Date(endDateValue))

              } else if(j > 0){
                startTime.push(endTime[j - 1])
                let startDateValue = new Date(startTime[j])
                let endDateValue = startDateValue.setDate(startDateValue.getDate() + Object.values(schedulingParameters)[j])
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

              console.log("aleEventsTime", aleEventsTime[j])
            }
            //   gapi.client
            //   .request({
            //     path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
            //     method: "POST",
            //     body: aleEventsTime[j],
            //     headers: {
            //       "Content-type": "application/json",
            //       Authorization: `Bearer ya29.a0AX9GBdU8iHvjjR38xerVV82IJveVHfQmPJSDL0R4ND8NrjJQyQQvtU5-_xNBOjc6Rkx1TllbTbrMySELhLpi9IKRQ-U0hnjzyvvdfmmmjbiM6_zmaOJigYVXbwlRmTwlLdrMwVi7kSoqZq7nK3gHyAXeaw69I8kaCgYKAVMSAQASFQHUCsbCYhK0hjEKyoG53C6wVMuH_g0166`,
            //     },
            //   })
            //   .then(
            //     (response) => {
            //       console.log("sucess", response)
            //       return [true, response];
            //
            //     },
            //     function (err) {
            //       console.log(err);
            //       return [false, err];
            //     }
            //   );
            // }

          } else if (beerType === "KettleSour"){
                  const kettleSourLength = Object.keys(schedulingParameters).length
                  let souringWortEvent = []
                  let startDate = []
                  let endDate = []

                  for(let k = 0; k < kettleSourLength; k++){
                    if(k = 0){
                      startDate.push(new Date(brewDate))
                      let endDateValue = brewDate.setDate(brewDate.getDate() + Object.values(schedulingParameters)[k])
                      endDate.push(new Date(endDateValue))
                    } else if(k > 0) {
                      startDate.push(endDate[k - 1])
                      let startDateValue = new Date(startDate[k])
                      let endDateValue = startDateValue.setDate(startDateValue.getDate() + Object.values(schedulingParameters)[k])
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
                    gapi.client
                    .request({
                      path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                      method: "POST",
                      body: souringWortEvent[k],
                      headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ya29.a0AX9GBdU8iHvjjR38xerVV82IJveVHfQmPJSDL0R4ND8NrjJQyQQvtU5-_xNBOjc6Rkx1TllbTbrMySELhLpi9IKRQ-U0hnjzyvvdfmmmjbiM6_zmaOJigYVXbwlRmTwlLdrMwVi7kSoqZq7nK3gHyAXeaw69I8kaCgYKAVMSAQASFQHUCsbCYhK0hjEKyoG53C6wVMuH_g0166`,
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

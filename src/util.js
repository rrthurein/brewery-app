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
    // const startDate = (brewDate) => {
    //   let startDate
    //   if(Object.keys(schedulingParameters.lager)[i] == Object.keys(schedulingParameters.lager)[0]){
    //                return   startDate = new Date(brewDate)
    //   } else if(Object.keys(schedulingParameters.lager)[i]> Object.keys(schedulingParameters.lager)[0]){
    //     startDate.setDate(startDate.getDate() + Object.values(schedulingParameters.lager)[i])
    //    return new Date(startDate)
    //   }
    // }
    // const endDate = (brewDate) => {
    //   let endDate
    //   let eventStartDate
    //   if(Object.keys(schedulingParameters.lager)[i] == Object.keys(schedulingParameters.lager)[0]){
    //     endDate.setDate(endDate.getDate() + Object.values(schedulingParameters.lager)[i])
    //   return startDate = new Date(endDate)
    //    }
    //    else if(){
    //     eventStartDate.setDate(eventStartDate.getDate() + Object.values(schedulingParameters.lager)[i])
    //           new Date(endDate)
    //   }

  export function calculateBrewingSchedule(brewDate, beerType) {
      if(beerType == "lager") {


        const lagerLength = Object.keys(schedulingParameters.lager).length
        const lagerEventTimes = []
        let startDate = []
        let endDate = []
        for(let i = 0; i<=lagerLength; i++){
          if(i == 0){
            startDate.push(new Date(brewDate))
            //startDate = [0] brewDate is 0
            let endDateValue = brewDate + Object.values(schedulingParameters.lager)[i]
            endDate.push(new Date(endDateValue))
            //endDate = [12]
            console.log("startDate[i].getDate()", startDate[i].getDate());

          } else if(i > 0){
            //i now is 1
            startDate.push(endDate[i - 1]) //startDate index is 1 right now
            //startDate = [0] we are pushing 12 into startDate
            //startDate is now [0,12]
            endDate.push(new Date(startDate[i].setDate(startDate[i].getDate() + Object.values(schedulingParameters.lager)[i - 1])))
          //  console.log("startDate[i].getDate()", startDate[i].getDate(), 'Object.values(schedulingParameters.lager)[i])', Object.values(schedulingParameters.lager)[i]);
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

        }





                lagerEventTimes.map((val) => {
                  return val, console.log("val", val);
                });

                console.log("lagerEventTimes", lagerEventTimes, "schedulingParameters.lager length", Object.keys(schedulingParameters.lager)[0])

                const batch = gapi.client.newBatch()

                for(var j = 0; j<lagerEventTimes.length; j++) {
                  batch.add(gapi.client
                    .request({
                      path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                      method: "POST",
                      body: lagerEventTimes[j],
                      headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ya29.a0AeTM1icuOc9WlSWvGTL2MxQYOZwK5JEDg7gQ7CEvw-T0gG7759Hb-El4_82jB36EyriZk6zTQNFtAnYYD4LcZV8xIdl_vFHllmzDItwUtktrSE2EoGoJyjUSTEeKdeQCu0GZIWGdg5PihSQwgm2kG5qpSsiBaCgYKATUSARASFQHWtWOmKWLR_dn_qq4mCEeTy7NsyA0163`,
                      },
                    }))
                }
                    batch.then(
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
      else if (beerType == "ale") {
            let primaryFermentationCurrentDate = new Date(brewDate);
            primaryFermentationCurrentDate.setDate(primaryFermentationCurrentDate.getDate() + schedulingParameters.ale.primaryFermentation )
            let endPrimaryFermentationTime = new Date(primaryFermentationCurrentDate)
            let dRestDate = endPrimaryFermentationTime.setDate(endPrimaryFermentationTime.getDate() + schedulingParameters.ale.dRest)
            let endDRestDate = new Date(dRestDate)
            let coldCrashDate = endDRestDate.setDate(endDRestDate.getDate() + schedulingParameters.ale.coldCrash)
            let endColdCrashDate = new Date(coldCrashDate)
            let carbonationDate = endColdCrashDate.setDate(endColdCrashDate.getDate() + schedulingParameters.ale.carbonation)
            let endDate = new Date(carbonationDate)
            console.log("aleDoneDate", endDate )

            console.log("endPrimaryFermentationTime", endPrimaryFermentationTime, "endDRestDate", endDRestDate, "endColdCrashDate", endColdCrashDate, "endDate", endDate)

            const aleEventsTime = [
              {
                summary: "Primary Fermentation",
                start: {
                  dateTime: brewDate,
                  timeZone: 'America/Los_Angeles',
                },
                end: {
                  dateTime: primaryFermentationCurrentDate,
                  timeZone: 'America/Los_Angeles',
                },

              },
              {
                summary: "D-Rest",
                start: {
                  dateTime: primaryFermentationCurrentDate,
                  timeZone: 'America/Los_Angeles',
                },
                end: {
                  dateTime: endPrimaryFermentationTime,
                  timeZone: 'America/Los_Angeles',
                },
              },
              {
                summary: "Lagering",
                start: {
                  dateTime: endPrimaryFermentationTime,
                  timeZone: 'America/Los_Angeles',
                },
                end: {
                  dateTime: endDRestDate,
                  timeZone: 'America/Los_Angeles',
                },
              },
              {
                summary: "Carbonation",
                start: {
                  dateTime: endDRestDate,
                  timeZone: 'America/Los_Angeles',
                },
                end: {
                  dateTime: endDate,
                  timeZone: 'America/Los_Angeles',
                },
              }
            ]

            let events = aleEventsTime.map((val) => {
              return val, console.log("val", val);
            });

            const batch = gapi.client.newBatch()


            for(var j = 0; j<aleEventsTime.length; j++) {
              batch.add(gapi.client
                .request({
                  path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                  method: "POST",
                  body: aleEventsTime[j],
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ya29.a0AeTM1icuOc9WlSWvGTL2MxQYOZwK5JEDg7gQ7CEvw-T0gG7759Hb-El4_82jB36EyriZk6zTQNFtAnYYD4LcZV8xIdl_vFHllmzDItwUtktrSE2EoGoJyjUSTEeKdeQCu0GZIWGdg5PihSQwgm2kG5qpSsiBaCgYKATUSARASFQHWtWOmKWLR_dn_qq4mCEeTy7NsyA0163`,
                  },
                }))
            }
                batch.then(
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
      else if (beerType == "kettleSour"){
                  let startTimeSouringWortDate = new Date(brewDate)
                  startTimeSouringWortDate.setDate(startTimeSouringWortDate.getDate() + schedulingParameters.kettleSour.primaryFermentation )
                  let endTimeSouringWort = new Date(startTimeSouringWortDate)
                  let primaryFermentationCurrentDate = endTimeSouringWort.setDate(endTimeSouringWort.getDate() + schedulingParameters.kettleSour.primaryFermentation )
                  let endPrimaryFermentation = new Date(primaryFermentationCurrentDate)
                  let dRestDate = endPrimaryFermentation.setDate(endPrimaryFermentation.getDate() + schedulingParameters.kettleSour.dRest)
                  let endDRestDate = new Date(dRestDate)
                  let coldCrashDate = endDRestDate.setDate(endDRestDate.getDate() + schedulingParameters.kettleSour.coldCrash)
                  let endColdCrashDate = new Date(coldCrashDate)
                  let carbonationDate = endColdCrashDate.setDate(endColdCrashDate.getDate() + schedulingParameters.kettleSour.carbonation)
                  let endDate = new Date(carbonationDate)
                  console.log("today's date", brewDate, "kettleSourDoneDate", endDate, "souringWortDate", endTimeSouringWort)

                  const souringWortEvent = [
                    {
                      summary: "Souring Wort",

                      start: {
                        dateTime: brewDate,
                        timeZone: 'America/Los_Angeles',
                      },
                      end: {
                        dateTime: startTimeSouringWortDate,
                        timeZone: 'America/Los_Angeles',
                      },

                    },
                    {
                      summary: "Primary Fermentation",

                      start: {
                        dateTime: startTimeSouringWortDate,
                        timeZone: 'America/Los_Angeles',
                      },
                      end: {
                        dateTime: endTimeSouringWort,
                        timeZone: 'America/Los_Angeles',
                      },
                    },
                    {
                      summary: "D-Rest",

                      start: {
                        dateTime: endTimeSouringWort,
                        timeZone: 'America/Los_Angeles',
                      },
                      end: {
                        dateTime: endPrimaryFermentation,
                        timeZone: 'America/Los_Angeles',
                      },
                    },
                    {
                      summary: "Cold Crash",
                      start: {
                        dateTime: endPrimaryFermentation,
                        timeZone: 'America/Los_Angeles',
                      },
                      end: {
                        dateTime: endDRestDate,
                        timeZone: 'America/Los_Angeles',
                      },
                    },
                    {
                      summary: "Carbonation",
                      start: {
                        dateTime: endDRestDate,
                        timeZone: 'America/Los_Angeles',
                      },
                      end: {
                        dateTime: endDate,
                        timeZone: 'America/Los_Angeles',
                      }
                    }
                  ]

                  let events = souringWortEvent.map((val) => {
                    return val, console.log("val", val);
                  });

                  console.log("souringWortEvent", souringWortEvent )
                  console.log("aleDoneDate", endDate )


                  const batch = gapi.client.newBatch()

                  for(let s = 0; s<souringWortEvent.length; s++){
                    batch.add(gapi.client
                      .request({
                        path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                        method: "POST",
                        body: souringWortEvent[s],
                        headers: {
                          "Content-type": "application/json",
                          Authorization: `Bearer ya29.a0AeTM1icuOc9WlSWvGTL2MxQYOZwK5JEDg7gQ7CEvw-T0gG7759Hb-El4_82jB36EyriZk6zTQNFtAnYYD4LcZV8xIdl_vFHllmzDItwUtktrSE2EoGoJyjUSTEeKdeQCu0GZIWGdg5PihSQwgm2kG5qpSsiBaCgYKATUSARASFQHWtWOmKWLR_dn_qq4mCEeTy7NsyA0163`,
                        },
                      }))
                  }
                      batch.then(
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
                  };

                  // let primaryFermentationCurrentDate = new Date(brewDate) //creating new object - setting aside more spaces in the memory
                  // primaryFermentationCurrentDate.setDate(primaryFermentationCurrentDate.getDate() + schedulingParameters.lager.primaryFermentation)
                  // let endPrimaryFermentationTime = new Date(primaryFermentationCurrentDate)
                  // let dRestDate = endPrimaryFermentationTime.setDate(endPrimaryFermentationTime.getDate() + schedulingParameters.lager.dRest)
                  // let endDRestDate = new Date(dRestDate)
                  // let lageringDate = endDRestDate.setDate(endDRestDate.getDate() + schedulingParameters.lager.lagering)
                  // let endDateLagering = new Date(lageringDate)
                  // endDateLagering.setDate(endDateLagering.getDate() + schedulingParameters.lager.carbonation)
                  // let lagerDoneDate = new Date(endDateLagering)
                  //
                  // console.log(Object.keys(schedulingParameters.lager)[0])
                  //
                  // const lagerEventTimes = [
                  //   {
                  //     summary: "Primary Fermentation",
                  //     start: {
                  //       dateTime: brewDate,
                  //       timeZone: 'America/Los_Angeles',
                  //     },
                  //     end: {
                  //       dateTime: primaryFermentationCurrentDate,
                  //       timeZone: 'America/Los_Angeles',
                  //     },
                  //   },
                  //   {
                  //     summary: "D-Rest",
                  //     start: {
                  //       dateTime: primaryFermentationCurrentDate,
                  //       timeZone: 'America/Los_Angeles',
                  //     },
                  //     end: {
                  //       dateTime: endPrimaryFermentationTime,
                  //       timeZone: 'America/Los_Angeles',
                  //     },
                  //   },
                  //   {
                  //     summary: "Lagering",
                  //     start: {
                  //       dateTime: endPrimaryFermentationTime,
                  //       timeZone: 'America/Los_Angeles',
                  //     },
                  //     end: {
                  //       dateTime: endDRestDate,
                  //       timeZone: 'America/Los_Angeles',
                  //     },
                  //   },
                  //   {
                  //     summary: "Carbonation",
                  //     start: {
                  //       dateTime: endDRestDate,
                  //       timeZone: 'America/Los_Angeles',
                  //     },
                  //     end: {
                  //       dateTime: endDateLagering,
                  //       timeZone: 'America/Los_Angeles',
                  //     },
                  //   }
                  //  ]

  // var makeRequest = function(events) {
  //   let header= {
  //     headers: {
  //       'Authorization': "Bearer ya29.a0AeTM1id7SpqWzpG3ZrQwck_7GYufnCZyJz-yPemmMaL_81LQ9bBHxTXC-swmncOskHKuyDsWBCxBLjZdKaSoYa6N-1sTzLaqG0AnCQYll2Q5mPmB4XMQpeXpxjzPxsqOPzmIm9KJAPZc33VU6nm4cmvyaR99aCgYKAfkSARASFQHWtWOmyKMt4Iirsa3Sayio7IEnRQ0163"
  //     }
  //   };
  //   gapi.client.load('calendar', 'v3', header, () => {
  //     var request = gapi.client.calendar.events.insert({
  //       'calendarId': 'primary',
  //       'resource': events,
  //       'method': 'POST',
  //     });
  //     request.execute(function(resp) {
  //       console.log(resp);
  //     });
  //   });
  // }
  //
  //
  // for(var j = 0; j<events.length; j++) {
  //   makeRequest(events[j]);
  //   console.log(makeRequest);
  // }

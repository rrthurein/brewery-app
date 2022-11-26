import { gapi } from 'gapi-script';
import jwt_decode from "jwt-decode";

  const schedulingParameters = {
    lager: {
      name: "Lager",
      primaryFermentation: 12,
      dRest: 2,
      lagering: 14,
      carbonation: 1
    },
    ale: {
      name: "Ale",
      primaryFermentation: 9,
      dRest: 2,
      coldCrash: 1,
      carbonation: 1,
    },
    kettleSour: {
      name: "Kettle Sour",
      souringWort: 2,
      primaryFermentation: 7,
      dRest: 2,
      coldCrash: 1,
      carbonation: 1,
    }
  }




  const date = new Date();
  console.log(date)

  let primaryFermentationCurrentDate = date.setDate(date.getDate() + schedulingParameters.lager.primaryFermentation)
  console.log("date", date)
  let endPrimaryFermentationTime = new Date(primaryFermentationCurrentDate)
  let dRestDate = endPrimaryFermentationTime.setDate(endPrimaryFermentationTime.getDate() + schedulingParameters.lager.dRest)
  let endDRestDate = new Date(dRestDate)
  let lageringDate = endDRestDate.setDate(endDRestDate.getDate() + schedulingParameters.lager.lagering)
  let endDateLagering = new Date(lageringDate)
  let carbonationDate = endDateLagering.setDate(endDateLagering.getDate() + schedulingParameters.lager.carbonation)
  let lagerDoneDate = new Date(carbonationDate)

  console.log( "endPrimaryFermentationTime", endPrimaryFermentationTime, "endDRestDate", endDRestDate, "lagerDoneDate", lagerDoneDate)


  export function calculateBrewingSchedule(brewDate, beerType) {
    if(beerType == "lager") {
      let primaryFermentationCurrentDate = brewDate.setDate(brewDate.getDate() + schedulingParameters.lager.primaryFermentation )
      let endPrimaryFermentationTime = new Date(primaryFermentationCurrentDate)
      let dRestDate = endPrimaryFermentationTime.setDate(endPrimaryFermentationTime.getDate() + schedulingParameters.lager.dRest)
      let endDRestDate = new Date(dRestDate)
      let lageringDate = endDRestDate.setDate(endDRestDate.getDate() + schedulingParameters.lager.lagering)
      let endDateLagering = new Date(lageringDate)
      let carbonationDate = endDateLagering.setDate(endDateLagering.getDate() + schedulingParameters.lager.carbonation)
      let lagerDoneDate = new Date(carbonationDate)

      console.log("lagerDoneDate", lagerDoneDate)
      return lagerDoneDate;
    }
    else if (beerType == "ale") {
      let primaryFermentationCurrentDate = brewDate.setDate(brewDate.getDate() + schedulingParameters.ale.primaryFermentation )
      let endPrimaryFermentation = new Date(primaryFermentationCurrentDate)
      let dRestDate = endPrimaryFermentation.setDate(endPrimaryFermentation.getDate() + schedulingParameters.ale.dRest)
      let endDRestDate = new Date(dRestDate)
      let coldCrashDate = endDRestDate.setDate(endDRestDate.getDate() + schedulingParameters.ale.coldCrash)
      let endColdCrashDate = new Date(coldCrashDate)
      let carbonationDate = endColdCrashDate.setDate(endColdCrashDate.getDate() + schedulingParameters.ale.carbonation)
      let endDate = new Date(carbonationDate)
      console.log("aleDoneDate", endDate )
      return endDate;
    }
    else if (beerType == "kettleSour"){
      let startTimeSouringWortDate = brewDate.setDate(brewDate.getDate() + schedulingParameters.kettleSour.primaryFermentation )
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
      return endDate;
    }
  };



  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;


  // const calendar = {version : "v3"}
  const CLIENT_ID = "890654996682-urq2der67lj97k6nj0dcrk9kkj6ts3oi.apps.googleusercontent.com"
  // const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"






  export function setDateCalendar() {
    let brewDate = new Date();

    const lagerEventTimes = [
      {
        summary: "Primary Fermentation",
        description: "description",
        start: {
          dateTime: brewDate,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: date,
          timeZone: 'America/Los_Angeles',
        },

      },
      {
        summary: "D-Rest",
        description: "description",
        start: {
          dateTime: date,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: endPrimaryFermentationTime,
          timeZone: 'America/Los_Angeles',
        },
      },
      {
        summary: "Lagering",
        description: "description",
        start: {
          dateTime: endPrimaryFermentationTime,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: endDateLagering,
          timeZone: 'America/Los_Angeles',
        },
      },
      {
        summary: "Carbonation",
        description: "description",
        start: {
          dateTime: endDateLagering,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: lagerDoneDate,
          timeZone: 'America/Los_Angeles',
        },
      }
    ]

      let events = lagerEventTimes.map((val) => {
            return val, console.log("val", val);
          });

          console.log("lagerEventTimes", lagerEventTimes )
            console.log("lagerDoneDate", lagerDoneDate )


    const batch = gapi.client.newBatch()

      batch.add(gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          method: "POST",
          body: lagerEventTimes[0],
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ya29.a0AeTM1icWp3iMValtZ3S4ro5HxyZ5BRRkM7MOKDUvTVkRJeHjcIqHiuydYuwwkCwUjrR3CPQHoGYc9l50JLObOecPoxq5SjGUvD3I_LMsrmxc6tWZi-JrzUu2bBWYNUaFnQvCa44B_Vsj9oNFDesUUWAHripjaCgYKASISARASFQHWtWOmlxG-iGVJtZOofilsUhRnCQ0163`,
          },
        }))
      batch.add(gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
        method: "POST",
        body: lagerEventTimes[1],
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ya29.a0AeTM1icWp3iMValtZ3S4ro5HxyZ5BRRkM7MOKDUvTVkRJeHjcIqHiuydYuwwkCwUjrR3CPQHoGYc9l50JLObOecPoxq5SjGUvD3I_LMsrmxc6tWZi-JrzUu2bBWYNUaFnQvCa44B_Vsj9oNFDesUUWAHripjaCgYKASISARASFQHWtWOmlxG-iGVJtZOofilsUhRnCQ0163`,
        },
      }))
      batch.add(gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
        method: "POST",
        body: lagerEventTimes[2],
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ya29.a0AeTM1icWp3iMValtZ3S4ro5HxyZ5BRRkM7MOKDUvTVkRJeHjcIqHiuydYuwwkCwUjrR3CPQHoGYc9l50JLObOecPoxq5SjGUvD3I_LMsrmxc6tWZi-JrzUu2bBWYNUaFnQvCa44B_Vsj9oNFDesUUWAHripjaCgYKASISARASFQHWtWOmlxG-iGVJtZOofilsUhRnCQ0163`,
        },
      }))
      batch.add(gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
        method: "POST",
        body: lagerEventTimes[3],
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ya29.a0AeTM1icWp3iMValtZ3S4ro5HxyZ5BRRkM7MOKDUvTVkRJeHjcIqHiuydYuwwkCwUjrR3CPQHoGYc9l50JLObOecPoxq5SjGUvD3I_LMsrmxc6tWZi-JrzUu2bBWYNUaFnQvCa44B_Vsj9oNFDesUUWAHripjaCgYKASISARASFQHWtWOmlxG-iGVJtZOofilsUhRnCQ0163`,
        },
      }))
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




  //
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

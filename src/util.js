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




  var date = new Date();
  console.log(date)

  let primaryFermentationCurrentDate = date.setDate(date.getDate() + schedulingParameters.lager.primaryFermentation )
  let endPrimaryFermentationTime = new Date(primaryFermentationCurrentDate)
  let dRestDate = endPrimaryFermentationTime.setDate(endPrimaryFermentationTime.getDate() + schedulingParameters.lager.dRest)
  let endDRestDate = new Date(dRestDate)
  let lageringDate = endDRestDate.setDate(endDRestDate.getDate() + schedulingParameters.lager.lagering)
  let endDateLagering = new Date(lageringDate)
  let carbonationDate = endDateLagering.setDate(endDateLagering.getDate() + schedulingParameters.lager.carbonation)
  let lagerDoneDate = new Date(carbonationDate)

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


  // const calendar = google.calendar({version : "v3"});
  
  // const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"






  export function setDateCalendar() {
    const lagerEventTimes = [
      {
        name: "Primary Fermentation",
        startTime: date,
        endTime: endPrimaryFermentationTime,
        id: 1,
      },
      {
        name: "D-Rest",
        startTime: endPrimaryFermentationTime,
        endTime: endDRestDate,
        id: 2,
      },
      {
        name: "Lagering",
        startTime: endDRestDate,
        endTime: endDateLagering,
        id: 3,
      },
      {
        name: "Carbonation",
        startTime: endDateLagering,
        endTime: lagerDoneDate,
        id: 4,
      }
    ]
    console.log("lagerEventTimes", lagerEventTimes)
      const events = lagerEventTimes.map((val) => {
            return {
              summary: `${val.name}`,
              description: "description",
              start: {
                dateTime: val.startTime,
                timeZone: 'America/Los_Angeles',
              },
              end: {
                dateTime: val.endTime,
                timeZone: 'America/Los_Angeles',
              },
            };

          });
    console.log("events", events)

    const batch = gapi.client.newBatch();

    function initiate() {
        batch.add(gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
        method: "POST",
        body: events,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ya29.a0AeTM1icKk759gNF1PUH-ije7INhnyIaNGXpyxag0SkwInPLyHpDAjlQtcJkAE7zjNkPiVy0BdhqY9RQFHsILFYHFq8XIIe2ChfiQ5-CqKmmuBoPfWDrhDG8f0DfmMe_DmIv-8n6M73lk64nrjPAVYB1G8S42aCgYKAaoSARASFQHWtWOmYPrigaFUcXiQFQ3f1TEESw0163`,
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
      ))

    }
    gapi.load("client", initiate);


  };

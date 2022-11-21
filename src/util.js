const schedulingParameters = {
    lager: {
      primaryFermentation: 12,
      dRest: 2,
      lagering: 14,
      carbonation: 1
    },
    ale: {
      primaryFermentation: 9,
      dRest: 2,
      coldCrash: 1,
      carbonation: 1,
    },
    kettleSour: {
      souringWort: 2,
      primaryFermentation: 7,
      dRest: 2,
      coldCrash: 1,
      carbonation: 1,
    }
  }


var date = new Date();
console.log(date)

export function calculateBrewingSchedule(brewDate, beerType) {
    if(beerType == "lager") {
     let primaryFermentationCurrentDate = brewDate.setDate(brewDate.getDate() + schedulingParameters.lager.primaryFermentation )
     let endStartDateTime = new Date(primaryFermentationCurrentDate)
     let dRestDate = endStartDateTime.setDate(endStartDateTime.getDate() + schedulingParameters.lager.dRest)
     let endDRestDate = new Date(dRestDate)
     let lageringDate = endDRestDate.setDate(endDRestDate.getDate() + schedulingParameters.lager.lagering)
     let endDateLagering = new Date(lageringDate)
     let carbonationDate = endDateLagering.setDate(endDateLagering.getDate() + schedulingParameters.lager.carbonation)
     let endDate = new Date(carbonationDate)
     console.log("lagerDoneDate", endDate )
     return endDate;
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

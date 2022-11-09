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

const calculateBrewingSchedule = (brewDate, beerType) => {
  if(beerType == "lager") {
   let primaryFermentationCurrentDate = brewDate.setDate(brewDate.getDate() + schedulingParameters.lager.primaryFermentation )
   let newDatePrimaryFermentation = new Date(primaryFermentationCurrentDate)
   let dRestDate = newDatePrimaryFermentation.setDate(newDatePrimaryFermentation.getDate() + schedulingParameters.lager.dRest)
   let newDRestDate = new Date(dRestDate)
   let lageringDate = newDRestDate.setDate(newDRestDate.getDate() + schedulingParameters.lager.lagering)
   let newLageringDate = new Date(lageringDate)
   let carbonationDate = newLageringDate.setDate(newLageringDate.getDate() + schedulingParameters.lager.carbonation)
   let endDate = new Date(carbonationDate)
   console.log("doneDate", endDate )
   return endDate;
 } else if (beerType == "ale") {
   let primaryFermentationCurrentDate = brewDate.setDate(brewDate.getDate() + schedulingParameters.ale.primaryFermentation )
   let newDatePrimaryFermentation = new Date(primaryFermentationCurrentDate)
   let dRestDate = newDatePrimaryFermentation.setDate(newDatePrimaryFermentation.getDate() + schedulingParameters.ale.dRest)
   let newDRestDate = new Date(dRestDate)
   let coldCrashDate = newDRestDate.setDate(newDRestDate.getDate() + schedulingParameters.ale.coldCrash)
   let newColdCrashDate = new Date(coldCrashDate)
   let carbonationDate = newColdCrashDate.setDate(newColdCrashDate.getDate() + schedulingParameters.ale.carbonation)
   let endDate = new Date(carbonationDate)
   console.log("doneDate", endDate )
   return endDate;
 } else if (beerType == "kettleSour"){
   let souringWortDate = brewDate.setDate(brewDate.getDate() + schedulingParameters.kettleSour.primaryFermentation )
   let souringWortNewDate = new Date(souringWortDate)
   let primaryFermentationCurrentDate = souringWortNewDate.setDate(souringWortNewDate.getDate() + schedulingParameters.kettleSour.primaryFermentation )
   let newDatePrimaryFermentation = new Date(primaryFermentationCurrentDate)
   let dRestDate = newDatePrimaryFermentation.setDate(newDatePrimaryFermentation.getDate() + schedulingParameters.kettleSour.dRest)
   let newDRestDate = new Date(dRestDate)
   let coldCrashDate = newDRestDate.setDate(newDRestDate.getDate() + schedulingParameters.kettleSour.coldCrash)
   let newColdCrashDate = new Date(coldCrashDate)
   let carbonationDate = newColdCrashDate.setDate(newColdCrashDate.getDate() + schedulingParameters.kettleSour.carbonation)
   let endDate = new Date(carbonationDate)
   console.log("doneDate", endDate )
   return endDate;
 }
}
// console.log(calculateBrewingSchedule(date, "lager"))
calculateBrewingSchedule(date, "kettleSour")

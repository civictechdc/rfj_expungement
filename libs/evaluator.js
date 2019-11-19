
function chainAllDeterminations(caseData, chargeData){
    // a function for collecting the result of all determinations
    return determineActualInnocence(caseData, chargeData)
  };
  
function determineActualInnocence(caseData, chargeData) {
    // determines actual innoncence analysis and failing that 
    // proceeds to interests of justice analysis
    if (chargeData.isConvicted) {
        return determineInterestsOfJustice(caseData, chargeData);
    } else {
        return fourYearsSinceTermination(caseData, chargeData);
    }
}
  
function determineInterestsOfJustice(caseData, chargeData){
    // IoJ has different control flow depending on whether its a felony
    // Route to appropriate evaluator based on felony
    switch (chargeData.classification.toLowerCase()) {
        case "misdemeanor":
        return determineIoJMisdemeanor(caseData, chargeData);
        case "felony":
        return determineIoJFelony(caseData, chargeData);
        default:
        return {
            indicator: null,
            message: "Cannot determine Interests of Justice analysis without a classification: is it a felony, or a misdemeanor?"
        }
    }
};
  
  function determineIoJFelony(caseData, chargeData){
    return {
      indicator: null,
          message: "Cannot determine Interests of Justice analysis for felonies yet"
    }
  };
  
  function determineIoJMisdemeanor(caseData, chargeData){
    return {
      indicator: null,
          message: "Cannot determine Interests of Justice analysis for misdemeanors yet"
    }
  };
  
  function fourYearsSinceTermination(caseData, chargeData) {
    let year = parseInt(caseData.case.terminationDate.split("-")[2]);
    let today = new Date().getFullYear();
    let diff = today - year;
  
    if (diff > 4) {
      return {
        indicator: "ELIGIBLE",
        message: "Eligible under Actual Innocence Analysis, burden of proof is clear and convincing evidence"
      }
    } else {
      return {
        indicator: "ELIGIBLE",
        message: "Eligible under Actual Innocence Analysis, burden of proof is preponderance of evidence"
      }
    }
  }

  export default chainAllDeterminations;
function chainAllDeterminations(caseData, chargeData) {
  // a function for collecting the result of all determinations
  return determineActualInnocence(caseData, chargeData);
}

function determineActualInnocence(caseData, chargeData) {
  // determines actual innoncence analysis and failing that
  // proceeds to interests of justice analysis
  if (chargeData.isConvicted) {
    return determineInterestsOfJustice(caseData, chargeData);
  } else {
    return fourYearsSinceTermination(caseData.case.terminationDate);
  }
}

function determineInterestsOfJustice(caseData, chargeData) {
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
        message:
          "Cannot determine Interests of Justice analysis without a classification: is it a felony, or a misdemeanor?"
      };
  }
}

function determineIoJFelony(caseData, chargeData) {
  if (chargeData.isBRAFelony) {
    return {
      indicator: "ELIGIBLE",
      message: "Eligible under Interests of Justice Analysis"
    };
  } else {
    return {
      indicator: null,
      message:
        "Cannot determine Interests of Justice analysis for non-BRA felonies yet"
    };
  }
}

function determineIoJMisdemeanor(caseData, chargeData) {
  return {
    indicator: null,
    message:
      "Cannot determine Interests of Justice analysis for misdemeanors yet"
  };
}

function fourYearsSinceTermination(terminationDate) {
  let then = new Date(terminationDate),
    now = new Date();
  if (diffYears(then, now) > 4) {
    return {
      indicator: "ELIGIBLE",
      message:
        "Eligible under Actual Innocence Analysis, burden of proof is clear and convincing evidence"
    };
  } else {
    return {
      indicator: "ELIGIBLE",
      message:
        "Eligible under Actual Innocence Analysis, burden of proof is preponderance of evidence"
    };
  }
}

function diffYears(then, later) {
  const seconds = (later.getTime() - then.getTime()) / 1000;
  return seconds / 60 / 60 / 24 / 365.25;
}

export { diffYears, fourYearsSinceTermination, determineActualInnocence };
export default chainAllDeterminations;

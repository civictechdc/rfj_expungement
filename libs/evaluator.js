const unknown = {
  message: "Not enough information.",
  eligible: "unknown"
};

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function diffYears(then, later) {
  const seconds = (later.getTime() - then.getTime()) / 1000;
  return seconds / 60 / 60 / 24 / 365.25;
}

function notEligible(section) {
  // Return a generic "not eligible" object for a section
  return {
    message: "NOT ELIGIBLE under section " + section + ".",
    eligible: "no"
  };
}

function getAnalysis( // Main function that analyzes a case
  convicted,
  terminationDate,
  classification,
  isBRAFelony,
  papered
) {
  return {
    section802: section802ActualInnocence(convicted, terminationDate),
    section803: section803(convicted, classification, isBRAFelony, papered)
  };
}

function section802ActualInnocence(convicted, terminationDate) {
  if (convicted) {
    // 1
    return notEligible("16-802");
  } else {
    let then = terminationDate,
      now = new Date(),
      message =
        "This case is ELIGIBLE under 16-802 if the client can prove that he or she is innocent. ",
      proof;
    if (!isValidDate(terminationDate)) {
      return unknown;
    } else if (diffYears(then, now) > 4) {
      proof = "The burden of proof is clear and convincing evidence.";
    } else {
      proof = "The burden of proof is preponderance of the evidence.";
    }
    return {
      message: message + proof,
      eligible: "yes"
    };
  }
}

function section803(convicted, classification, isBRAFelony, papered) {
  if (classification === "felony") {
    return section803Felony(convicted, classification, isBRAFelony, papered);
  } else if (classification === "misdemeanor") {
    // TODO: IOJ for misdemeanors is unimplemented!!!
    // Unfortunately it is quite complicated, but this should be very high priority
    return {
      message:
        "Sorry! IOJ analysis for misdemeanors is a work in progress at the moment.",
      eligible: "unknown"
    };
  } else {
    return {
      message: "Need to know if offence was a felony or misdemeanor.",
      eligible: "unknown"
    };
  }
}

function section803Felony(convicted, classification, isBRAFelony, papered) {
  if (isBRAFelony) {
    // 1
    return {
      message:
        "Sorry! BRA felonies are expunged as misdemeanors, and IOJ analysis for misdemeanors " +
        " is a work in progress at the moment.",
      eligible: "unknown"
    };
  }
  if (convicted) {
    // 2
    return notEligible("16-803");
  }
  const minYearsOffPapers = papered ? 4 : 3; // 3
  return {
    message:
      "Client is ELIGIBLE if: it has been " +
      minYearsOffPapers +
      " years since the client was off " +
      "papers in this case, 5 years since the client has been off papers for " +
      "any misdemeanor conviction (other than for a minor offense listed in " +
      "§16-801(10)), 10 years since the client has been off papers for any " +
      "felony conviction, and the client not have any pending cases (other " +
      "than for a minor offense listed in §16- 801(10)). ",
    eligible: "unknown"
  };
}

export { diffYears };
export default getAnalysis;

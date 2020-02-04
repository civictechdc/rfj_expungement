import {
  diffYears,
  determineActualInnocence,
  fourYearsSinceTermination
} from "../libs/evaluator";
import chainAllDeterminations from "../libs/evaluator";

test("testing chainAllDeterminations", () => {
  const chargeData = {};
  const caseData = {
    case: {
      terminationDate: "1992-01-02"
    }
  };
  expect(chainAllDeterminations(caseData, chargeData).indicator).toBe(
    "ELIGIBLE"
  );
  expect(determineActualInnocence(caseData, chargeData).indicator).toBe(
    "ELIGIBLE"
  );
});

test("testing fourYearsSinceTermination", () => {
  expect(fourYearsSinceTermination("01/02/1992").message).toBe(
    "Eligible under Actual Innocence Analysis, burden of proof is clear and convincing evidence"
  );
  expect(fourYearsSinceTermination("01/20/2020").message).toBe(
    "Eligible under Actual Innocence Analysis, burden of proof is preponderance of evidence"
  );
});

test("test diffYears", () => {
  const diff = diffYears(new Date("08/16/1721"), new Date("09/17/1727"));
  expect(6 < diff < 7).toBe(true);
});

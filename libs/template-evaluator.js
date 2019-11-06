// A template for writing functions to evaluate
// eligibility.
// Note: specific charges can be passed for rules that
// apply at the charge level

function templateEvaluator(caseData, chargeData) {

	// Using the case data, we can, for example
	// evaluate if a charge is a conviction.
	console.log(
		"Is conviction: ", chargeData.isConviction
		)

	return {
		"indicator": chargeData.isConviction ? "elligible" : "inelligible",
		"message": "Template evaluation"
	};
}

export default templateEvaluator;
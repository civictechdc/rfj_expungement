import React, { createContext } from "react";
import caseContainer from "../static/casecontainer.json";
import chargeContainer from "../static/chargecontainer.json";
import evaluateHelper from "../libs/evaluator.js";

let caseObj = {
  caseData: { ...caseContainer },
  status: { outcome: null, color: "grey", text: "" },
  chargeFormat: { ...chargeContainer } // Remember what a charge looks like
};

const CaseContext = createContext(caseObj);

// A provider with all the methods and states set up for you
class InitializedProvider extends React.Component {
  constructor(props) {
    super(props);

    this.evaluate = () => {
      let chargesData = this.state.caseData.case.charges;
      Object.keys(chargesData).map(charge => {
        this.setState({
          caseData: {
            ...this.state.caseData,
            case: {
              ...this.state.caseData.case,
              charges: {
                ...this.state.caseData.case.charges,
                [charge]: {
                  ...this.state.caseData.case.charges[charge],
                  analysis: evaluateHelper(
                    this.state.caseData,
                    chargesData[charge]
                  )
                }
              }
            }
          }
        });
      });
    };

    this.reset = () => {
      // re-initialize
      this.setState({
        caseData: { ...caseContainer },
        status: { outcome: null, color: "grey", text: "" }
      });
    };

    this.nextPdfLine = y => {
      return y + 3;
    };

    this.saveDataToPDF = () => {
      console.log('save to pdf',this.state.caseData);
      const jsPDF = require("jspdf");
      const pdf = new jsPDF();
      pdf.setFontSize(5);
      // when adding new controller code, it needs to be added to this.state = ...
      let x = 10;
      let y = 0;
      y = this.nextPdfLine(y);
      pdf.text("Evaluator Name", x, y);
      y = this.nextPdfLine(y);
      pdf.text(this.state.caseData.evaluatorName, x, y);
      y = this.nextPdfLine(y);
      pdf.text("Evaluator Comments", x, y);
      y = this.nextPdfLine(y);
      pdf.text(this.state.caseData.evaluatorComments, x, y);
      y = this.nextPdfLine(y);
      pdf.text("Client Name", x, y);
      y = this.nextPdfLine(y);
      pdf.text(this.state.caseData.client.name, x, y);
      y = this.nextPdfLine(y);
      pdf.text("Client Is On Probation", x, y);
      y = this.nextPdfLine(y);
      pdf.text(this.state.caseData.client.isOnProbation + "", x, y);
      y = this.nextPdfLine(y);
      pdf.text("Client PD ID", x, y);
      y = this.nextPdfLine(y);
      pdf.text(this.state.caseData.client.pdId, x, y);
      y = this.nextPdfLine(y);
      pdf.text("Client Date Of Birth", x, y);
      y = this.nextPdfLine(y);
      pdf.text(this.state.caseData.client.dob + "", x, y);
      y = this.nextPdfLine(y);
      pdf.text("Client Case Termination Date", x, y);
      y = this.nextPdfLine(y);
      pdf.text(this.state.caseData.case.terminationDate + "", x, y);
      y = this.nextPdfLine(y);

      let charges = this.state.caseData.case.charges;
      let values = Object.values(charges);
      for(let chargeNum=0;chargeNum<values.length;chargeNum=chargeNum+1){
        let charge = values[chargeNum];
        pdf.text("Charge "+chargeNum, x, y);
        y = this.nextPdfLine(y);
        pdf.text("Offense", x, y);
        y = this.nextPdfLine(y);
        pdf.text(charge.offense + "", x, y);
        y = this.nextPdfLine(y);
        pdf.text("Disposition Date", x, y);
        y = this.nextPdfLine(y);
        pdf.text(charge.dispositionDate + "", x, y);
        y = this.nextPdfLine(y);
        pdf.text("Classification", x, y);
        y = this.nextPdfLine(y);
        pdf.text(charge.classification + "", x, y);
        y = this.nextPdfLine(y);
        pdf.text("Description", x, y);
        y = this.nextPdfLine(y);
        pdf.text(charge.description + "", x, y);
        y = this.nextPdfLine(y);
        pdf.text("Is Papered", x, y);
        y = this.nextPdfLine(y);
        pdf.text(charge.isPapered + "", x, y);
        y = this.nextPdfLine(y);
        pdf.text("Is BRA Felony", x, y);
        y = this.nextPdfLine(y);
        pdf.text(charge.isBRAFelony + "", x, y);
        y = this.nextPdfLine(y);
        pdf.text("Is Convicted", x, y);
        y = this.nextPdfLine(y);
        pdf.text(charge.isConvicted + "", x, y);
        y = this.nextPdfLine(y);
      }
      pdf.save("data.pdf");
    };

    // General purpose updater -- pass an object get a state update
    this.updater = stateobj => {
      this.setState(stateobj, () => {
        this.evaluate(); // TODO: Move this somewhere that calls much less frequently
      });
    };

    this.state = {
      ...caseObj,
      reset: this.reset,
      updater: this.updater,
      saveDataToPDF: this.saveDataToPDF,
    };
  }

  render() {
    return (
      <CaseContext.Provider value={this.state}>
        {this.props.children}
      </CaseContext.Provider>
    );
  }
}

export { CaseContext, InitializedProvider, caseObj };

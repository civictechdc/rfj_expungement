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

    this.keyValue = (pdf,key,value,x1,x2,y) => {
      pdf.text(key, x1, y);
      pdf.text(value, x2, y);
    }

    this.saveDataToPDF = () => {
      console.log('save to pdf',this.state.caseData);
      const jsPDF = require("jspdf");
      const pdf = new jsPDF();
      pdf.setFontSize(8);
      // when adding new controller code, it needs to be added to this.state = ...
      let x = 10;
      let y = 0;
      let xColumn2 = 50;
      y = this.nextPdfLine(y);
      y = this.nextPdfLine(y);
      y = this.nextPdfLine(y);
      this.keyValue(pdf,"Evaluator Name",this.state.caseData.evaluatorName,x,xColumn2,y);
      y = this.nextPdfLine(y);
      this.keyValue(pdf,"Evaluator Comments",this.state.caseData.evaluatorComments,x,xColumn2,y);
      y = this.nextPdfLine(y);
      this.keyValue(pdf,"Client Name",this.state.caseData.client.name,x,xColumn2,y);
      y = this.nextPdfLine(y);
      this.keyValue(pdf,"Client Is On Probation",this.state.caseData.client.isOnProbation+"",x,xColumn2,y);
      y = this.nextPdfLine(y);
      this.keyValue(pdf,"Client PD ID",this.state.caseData.client.pdId,x,xColumn2,y);
      y = this.nextPdfLine(y);
      this.keyValue(pdf,"Client Date Of Birth",this.state.caseData.client.dob+"",x,xColumn2,y);
      y = this.nextPdfLine(y);
      this.keyValue(pdf,"Client Case Termination Date",this.state.caseData.case.terminationDate+"",x,xColumn2,y);
      y = this.nextPdfLine(y);
      y = this.nextPdfLine(y);
      y = this.nextPdfLine(y);
      y = this.nextPdfLine(y);

      let charges = this.state.caseData.case.charges;
      Object.keys(charges).map(key => {
        let charge = charges[key];
        this.keyValue(pdf,"Charge",key,x,xColumn2,y);
        y = this.nextPdfLine(y);
        this.keyValue(pdf,"Offense",charge.offense,x,xColumn2,y);
        y = this.nextPdfLine(y);
        this.keyValue(pdf,"Disposition Date",charge.dispositionDate+"",x,xColumn2,y);
        y = this.nextPdfLine(y);
        this.keyValue(pdf,"Classification",charge.classification+"",x,xColumn2,y);
        y = this.nextPdfLine(y);
        this.keyValue(pdf,"Description",charge.description+"",x,xColumn2,y);
        y = this.nextPdfLine(y);
        this.keyValue(pdf,"Is Papered",charge.isPapered+"",x,xColumn2,y);
        y = this.nextPdfLine(y);
        this.keyValue(pdf,"Is BRA Felony",charge.isBRAFelony+"",x,xColumn2,y);
        y = this.nextPdfLine(y);
        this.keyValue(pdf,"Is Convicted",charge.isConvicted+"",x,xColumn2,y);
        y = this.nextPdfLine(y);
        y = this.nextPdfLine(y);
      })
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

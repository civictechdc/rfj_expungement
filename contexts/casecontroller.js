import React, { createContext } from "react";
import caseContainer from "../static/casecontainer.json";
import chargeContainer from "../static/chargecontainer.json";
import evaluateHelper from "../libs/evaluator.js";

let caseObj = {
  caseData: { ...caseContainer },
  lastUpdated: new Date(),
  status: { outcome: null, color: "grey", text: "" },
  // Remember what a charge looks like
  chargeFormat: { ...chargeContainer }
};

const CaseContext = createContext(caseObj);

// A provider with all the methods and states set up for you
class InitializedProvider extends React.Component {
  constructor(props) {
    super(props);

    this.evaluate = () => {
      let chargesData = this.state.caseData.case.charges;
      Object.keys(chargesData).map(charge => {
        let analysis = evaluateHelper(this.state.caseData, chargesData[charge]);
        this.setState({
          caseData: {
            ...this.state.caseData,
            case: {
              ...this.state.caseData.case,
              charges: {
                ...this.state.caseData.case.charges,
                [charge]: {
                  ...this.state.caseData.case.charges[charge],
                  analysis: analysis
                }
              }
            }
          }
        });
      });
    };

    // re-initialize
    this.reset = () => {
      this.setState({
        caseData: { ...caseContainer },
        status: { outcome: null, color: "grey", text: "" },
        lastUpdated: new Date()
      });
    };

    this.saveDataToPDF = () => {
      // when adding new controller code, it needs to be added to this.state = ...
      const jsPDF = require("jspdf");
      const pdf = new jsPDF();
      pdf.text("Client Name", 10, 10);
      pdf.text(this.state.caseData.client.name, 50, 10);
      pdf.save("data.pdf");
      // or try
      // https://www.npmjs.com/package/pdf-lib
    };

    this.saveScreenToPDF = () => {
      // when adding new controller code, it needs to be added to this.state = ...
      const html2pdf = require("html2pdf.js");
      var opt = {
        margin: 1,
        filename: "screen.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };
      var element = document.getElementById("element-to-print");
      html2pdf()
        .from(element)
        .set(opt)
        .save();
    };

    this.pushCharge = charge => {
      this.setState({
        caseData: {
          ...this.state.caseData,
          case: {
            ...this.state.caseData.case,
            charges: {
              ...this.state.caseData.case.charges,
              [charge]: { ...this.state.chargeFormat }
            }
          }
        }
      });
      this.setState({ lastUpdated: new Date() });
      return { ...this.chargeFormat };
    };

    // General purpose updater -- pass an object get a state update
    this.updater = stateobj => {
      this.setState(stateobj, () => {
        // TODO: Move this somewhere that calls much less frequently
        this.evaluate();
      });
    };

    this.state = {
      ...caseObj,
      pushCharge: this.pushCharge,
      reset: this.reset,
      updater: this.updater,
      saveDataToPDF: this.saveDataToPDF,
      saveScreenToPDF: this.saveScreenToPDF
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

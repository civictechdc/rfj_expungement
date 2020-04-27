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

    this.pushCharge = () => {
      let chargeNum = Object.keys(this.state.caseData.case.charges).length + 1;
      let oldState = this.state.caseData.case.charges;
      let newState = this.state.caseData.case.charges;
      newState[`Charge ${chargeNum}`] = this.state.chargeFormat;
      this.setState({ oldState, newState });

      this.setState((state, props) => ({
        counter: state.counter + props.increment
      }));
    };

    // General purpose updater -- pass an object get a state update
    this.updater = stateobj => {
      this.setState(stateobj, () => {
        this.evaluate(); // TODO: Move this somewhere that calls much less frequently
      });
    };

    this.state = {
      ...caseObj,
      pushCharge: this.pushCharge,
      reset: this.reset,
      updater: this.updater
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

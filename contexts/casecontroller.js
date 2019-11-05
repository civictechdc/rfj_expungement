import { createContext } from "react";
import caseContainer from "../static/casecontainer.json";
import chargeContainer from "../static/chargecontainer.json";

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
      // TODO implement rules.json
    };

    // re-initialize
    this.reset = () => {
      this.setState({
        caseData: { ...caseContainer },
        status: { outcome: null, color: "grey", text: "" },
        lastUpdated: new Date()
      });
    };

    this.pushCharge = (charge) => {
      this.setState({
        caseData: {
          ...this.state.caseData,
          case: {
            ...this.state.caseData.case,
            charges: {
              ...this.state.caseData.case.charges,
              [charge]: {  ...this.state.chargeFormat }
            }
          }
        }
      });
      //this.state.caseData.case.charges.push({ ...caseObj.chargeFormat });
      this.setState({ lastUpdated: new Date() });
      return { ...this.chargeFormat };
    };

    // General purpose updater -- pass an object get a state update
    this.updater = stateobj => {
      this.setState(stateobj, () => {
        console.log(this.state);
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

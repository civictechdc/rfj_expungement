import React, { useState, useContext, useEffect } from "react";
import { CaseContext } from "../contexts/casecontroller";

// mui
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// inputs
import TextField from "@material-ui/core/TextField";
import { FormControlLabel } from "@material-ui/core";
import ComposedDatePicker from "./ComposedDatePicker.js";
import Switch from "@material-ui/core/Switch";

// components
import CaseRow from "./CaseRow";

function CaseTable(props) {
  const value = useContext(CaseContext);

  const [evaluatorName, setEvaluatorName] = useState(
    value.caseData.evaluatorName
  );
  const [terminationDate, setTerminationDate] = useState(
    value.caseData.case.terminationDate
  );
  const [birthDate, setBirthDate] = useState(value.caseData.client.dob);
  const [isOnProbation, setOnProbation] = useState(
    value.caseData.client.isOnProbation
  );
  const [clientName, setClientName] = useState(value.caseData.client.name);
  const [pdId, setPdId] = useState(value.caseData.client.pdId);
  const [comments, setComments] = useState(value.caseData.evaluatorComments);
  const [charges, setCharges] = useState(value.caseData.case.charges);

  useEffect(() => {
    setEvaluatorName(props.caseData.evaluatorName);
    setOnProbation(props.caseData.client.isOnProbation);
    setClientName(props.caseData.client.name);
    setPdId(props.caseData.client.pdId);
    setComments(props.caseData.evaluatorComments);
    setTerminationDate(props.caseData.case.terminationDate);
    setBirthDate(props.caseData.client.dob);
    setCharges(props.caseData.case.charges);
  }, [props]);

  const pushCharge = () => {
    let chargeNum = Object.keys(value.caseData.case.charges).length + 1;
    let newChargeKey = `Charge ${chargeNum}`;
    persist(newChargeKey, value.chargeFormat);
    // save all data, including new charge,
    // to update display without changing original json caseContainer
  };

  const persistEvaluatorName = name => {
    value.updater({
      caseData: {
        ...value.caseData,
        evaluatorName: name,
        case: {
          ...value.caseData.case
        },
        client: {
          ...value.caseData.client
        }
      }
    });
  };

  const persist = (newChargeKey, newCharge) => {
    value.updater({
      caseData: {
        ...value.caseData,
        evaluatorName: evaluatorName,
        evaluatorComments: comments,
        case: {
          ...value.caseData.case,
          charges: {
            ...value.caseData.case.charges,
            [newChargeKey]: newCharge
          },
          terminationDate: terminationDate
        },
        client: {
          ...value.caseData.client,
          dob: birthDate,
          isOnProbation: isOnProbation,
          name: clientName,
          pdId: pdId
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h4">Case Info:</Typography>}
      ></CardHeader>
      <Grid container direction="column">
        <TextField
          label="Evaluator Name"
          value={evaluatorName}
          onChange={e => {
            setEvaluatorName(e.target.value);
            persistEvaluatorName(e.target.value);
          }}
        />
        <TextField
          label="Advice to client or notes about case"
          multiline
          value={comments}
          onChange={e => {
            setComments(e.target.value);
          }}
        />
        <TextField
          label="Client Name"
          autoComplete="off"
          value={clientName}
          onChange={e => {
            setClientName(e.target.value);
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isOnProbation}
              onChange={e => {
                setOnProbation(e.target.checked);
              }}
              inputProps={{ "aria-label": "isOnProbation checkbox" }}
            />
          }
          label="Is on Probation"
        ></FormControlLabel>
        <TextField
          label="Client PD ID"
          autoComplete="off"
          value={pdId}
          onChange={e => {
            setPdId(e.target.value);
          }}
        />
        <ComposedDatePicker
          label={"Client DOB"}
          hoist={e => {
            setBirthDate(e);
          }}
          initialDate={birthDate}
        />
        <ComposedDatePicker
          label={"Case Terminated On"}
          hoist={e => {
            setTerminationDate(e);
          }}
          initialDate={terminationDate}
        />
      </Grid>

      {/* Cases in Context object */}
      <div>
        {Object.keys(charges).map((charge, idx) => {
          return (
            <CaseRow
              charge={charge}
              terminationDate={terminationDate}
              key={`${idx}-charge`}
            />
          );
        })}
      </div>

      <CardActionArea onClick={pushCharge}>
        <Typography variant="h6">+ New Charge</Typography>
      </CardActionArea>
    </Card>
  );
}

export default CaseTable;

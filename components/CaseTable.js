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

  const [name, setName] = useState(value.caseData.evaluatorName);
  const [terminationDate, setTerminationDate] = useState(
    value.caseData.case.terminationDate
  );
  const [birthDate, setBirthDate] = useState(
    value.caseData.client.dob
  );
  const [isOnProbation, setOnProbation] = useState(
    value.caseData.client.isOnProbation
  );
  const [clientName, setClientName] = useState(value.caseData.client.name);
  const [pdId, setPdId] = useState(value.caseData.client.pdId);
  const [comments, setComments] = useState(value.caseData.evaluatorComments);

  useEffect(() => {
    setName(props.caseData.evaluatorName);
    setOnProbation(props.caseData.client.isOnProbation);
    setClientName(props.caseData.client.name);
    setPdId(props.caseData.client.pdId);
    setComments(props.caseData.evaluatorComments);
    setTerminationDate(props.caseData.case.terminationDate);
    setBirthDate(props.caseData.client.dob);
  }, [props]);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h4">Case Info:</Typography>}
      ></CardHeader>
      <Grid container direction="column">
        <TextField 
          label="Evaluator Name" 
          value={name} 
          onChange={e => setName(e.target.value)}
          />
        <TextField 
          label="Advice to client or notes about case" 
          multiline 
          value={comments} 
          onChange={e => setComments(e.target.value)}
        />
        <TextField 
          label="Client Name" 
          autoComplete="off"
          value={clientName} 
          onChange={e => setClientName(e.target.value)}
       />
        <FormControlLabel
          control={
            <Switch 
              checked={isOnProbation}
              onChange={e => setOnProbation(e.target.checked)}
              inputProps={{ "aria-label": "isOnProbation checkbox" }} 
            />
          }
          label="Is on Probation"
        ></FormControlLabel>
        <TextField 
          label="Client PD ID" 
          autoComplete="off" 
          value={pdId} 
          onChange={e => setPdId(e.target.value)}
        />
        <ComposedDatePicker 
          label={"Client DOB"} 
          hoist={e => setBirthDate(e)}
          initialDate={birthDate} 
        />
        <ComposedDatePicker
          label={"Case Terminated On"}
          hoist={e => setTerminationDate(e)}
          initialDate={terminationDate}
        />
      </Grid>

      {/* Cases in Context object */}
      <div>
        {Object.keys(value.caseData.case.charges).map((charge, idx) => {
          return (
            <CaseRow
              charge={charge}
              terminationDate={terminationDate}
              key={`${idx}-charge`}
            />
          );
        })}
      </div>

      <CardActionArea onClick={value.pushCharge}>
        <Typography variant="h6">+ New Charge</Typography>
      </CardActionArea>
    </Card>
  );
}

export default CaseTable;

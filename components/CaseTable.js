import React, { useState, useContext } from "react";
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

function CaseTable() {
  const value = useContext(CaseContext);

  const [terminationDate, setTerminationDate] = useState(
    value.caseData.case.terminationDate
  );

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h4">Case Info:</Typography>}
      ></CardHeader>
      <Grid container direction="column">
        <TextField label="Evaluator Name" />
        <TextField label="Advice to client or notes about case" multiline />
        <TextField label="Client Name" autoComplete="off" />
        <FormControlLabel
          control={
            <Switch inputProps={{ "aria-label": "isOnProbation checkbox" }} />
          }
          label="Is on Probation"
        ></FormControlLabel>
        <TextField label="Client PD ID" autoComplete="off" />
        <ComposedDatePicker label={"Client DOB"} />
        <ComposedDatePicker
          label={"Case Terminated On"}
          hoist={e => setTerminationDate(e)}
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

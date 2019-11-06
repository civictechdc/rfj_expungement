import React, { useState, useContext, Fragment } from "react";
import { CaseContext } from "../contexts/casecontroller";

// mui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// inputs
import { Button, FormControlLabel } from "@material-ui/core";
import ComposedDatePicker from "./ComposedDatePicker.js";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

// components

const useStyles = makeStyles(theme => ({
  table: {}
}));

function ClientInfoTable(props) {
  const classes = useStyles();
  const value = useContext(CaseContext);
  const [dob, setDob] = useState(value.caseData.client.dob);
  const [isOnProbation, setOnProbation] = useState(
    value.caseData.client.isOnProbation
  );
  const [clientName, setClientName] = useState(value.caseData.client.name);
  const [pdId, setPdId] = useState(value.caseData.client.pdId);
  // can we get away with omitting pending cases?

  const persist = () => {
    value.updater({
      caseData: {
        ...value.caseData,
        client: {
          ...value.caseData.client,
          dob: dob,
          isOnProbation: isOnProbation,
          name: clientName,
          pdId: pdId
        }
      }
    });
  };

  return (
    <Fragment>
      <Typography variant="h5">Client Info:</Typography>
      <Grid container justify="space-around" direction="column">
        <TextField
          id="name-field"
          autoComplete='off'
          label="Client Name"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isOnProbation}
              onChange={e => setOnProbation(e.target.checked)}
              value="isOnProbation"
              inputProps={{ "aria-label": "isOnProbation checkbox" }}
            />
          }
          label="Is on Probation"
        ></FormControlLabel>
        <TextField
          id="pdid-field"
          autoComplete='off'
          label="Client PD ID"
          value={pdId}
          onChange={e => setPdId(e.target.value)}
          margin="normal"
        />
        <ComposedDatePicker
          ctxKeys={["caseData", "client", "dob"]}
          label={"Client DOB"}
          initialDate={dob}
          hoist={setDob}
        />
      </Grid>
      <Button onClick={persist}>
        <Typography>Persist Casedata</Typography>
      </Button>
    </Fragment>
  );
}

export default ClientInfoTable;

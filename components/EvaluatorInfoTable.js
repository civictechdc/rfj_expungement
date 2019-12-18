import React, { useState, useContext, Fragment, useRef } from "react";
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

function EvaluatorInfoTable(props) {
  const classes = useStyles();
  const value = useContext(CaseContext);
  const [name, setName] = useState(value.caseData.evaluatorName);
  let timerRef = useRef( null );
  let TIMEOUT_DURATION = 1000;

  const persist = (name) => {
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setName(name);

    // Only update the store when we need to
    timerRef.current = setTimeout(() => {
      value.updater({
        caseData: {
          ...value.caseData,
          evaluatorName: name
        }
      });
    }, TIMEOUT_DURATION);
  };

  return (
    <Fragment>
      <Typography variant="h5">Evaluator Info:</Typography>
      <Grid container justify="space-around" direction="column">
        <TextField
          id="name-field"
          label="Evaluator Name"
          value={name}
          onChange={e => persist(e.target.value)}
          margin="normal"
        />
        </Grid>
    </Fragment>
  );
}

export default EvaluatorInfoTable;

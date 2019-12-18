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

function EvaluatorCommentsTable(props) {
  const classes = useStyles();
  const value = useContext(CaseContext);
  const [name, setName] = useState(value.caseData.evaluatorComments);

  const persist = name => {
    setName(name);
    value.updater({
      caseData: {
        ...value.caseData,
        evaluatorComments: name
      }
    });
  };

  return (
    <Fragment>
      <Typography variant="h5">Evaluator Comments:</Typography>
      <Grid container justify="space-around" direction="column">
        <TextField
          id="comments-field"
          multiline
          value={name}
          onChange={e => persist(e.target.value)}
          margin="normal"
        />
      </Grid>
    </Fragment>
  );
}

export default EvaluatorCommentsTable;

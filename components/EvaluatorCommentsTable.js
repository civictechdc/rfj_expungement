import React, { useState, useContext, Fragment } from "react";
import { CaseContext } from "../contexts/casecontroller";

// mui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// inputs
import TextField from "@material-ui/core/TextField";

function EvaluatorCommentsTable() {
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

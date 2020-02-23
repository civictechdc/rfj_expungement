import React, { useState, useContext, useEffect, Fragment } from "react";
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
  const [comments, setComments] = useState(value.caseData.evaluatorComments);

  useEffect(() => {
    // for reset button
    // https://stackoverflow.com/questions/54625831/how-to-sync-props-to-state-using-react-hooks-setstate
    // useEffect is called after every render
    // [props] below says this useEffect will only run when props have changed
    // props are coming in from parent html attribute
    // useContext syncs the field to global, preventing local differences .. bad
    // useState allows user to make local edits
    // persist writes the useState values to the controller and context
    // reset takes the json values from file and passes them as new props object to components
    // therefore reset depends on props at every level and useEffect based on props
    setComments(props.caseData.evaluatorComments);
  }, [props]);

  const persist = comments => {
    setComments(comments);
    value.updater({
      caseData: {
        ...value.caseData,
        evaluatorComments: comments
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
          value={comments}
          onChange={e => persist(e.target.value)}
          margin="normal"
        />
      </Grid>
    </Fragment>
  );
}

export default EvaluatorCommentsTable;

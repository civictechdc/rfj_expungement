import React, { useState, useContext, useEffect } from "react";
import { CaseContext } from "../contexts/casecontroller";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

// utils
import getNestedObject from "../libs/get-nested";

// mui
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  item: {}
}));

function ComposedDatePicker(props) {
  const classes = useStyles();
  const [dateState, setDateState] = useState(
    props.initialDate ? props.initialDate : new Date()
  );

  const handleDateChange = date => {
    setDateState(date);
    props.hoist(date);
  };

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
    setDateState(props.initialDate);
  }, [props]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={props.label ? props.label : "Unlabeled Picker"}
        openTo="year"
        value={dateState}
        views={["year", "month", "date"]}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default ComposedDatePicker;

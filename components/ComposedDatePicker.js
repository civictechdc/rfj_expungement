import React, { useState, useContext } from "react";
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={props.label ? props.label : "Unlabeled Picker"}
        value={dateState}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default ComposedDatePicker;

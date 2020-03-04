import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

function ComposedDatePicker(props) {
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

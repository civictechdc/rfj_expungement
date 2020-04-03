import React, { useState } from "react";

import chargeContainer from "../static/chargecontainer.json";
import getAnalysis from "../libs/evaluator";

// components
import ComposedDatePicker from "./ComposedDatePicker.js";
import Indicator from "./Indicator";

// mui
import { FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

function CaseRow(props) {
  const [showForm, setShowForm] = useState(false); // default to collapsed

  // Charge properties
  const [description, setDescription] = useState(chargeContainer.description);
  const [classification, setClassification] = useState(
    chargeContainer.classification
  );
  const [isBRAFelony, setIsBRAFelony] = useState(chargeContainer.isBRAFelony);
  const [convicted, setConvicted] = useState(chargeContainer.isConvicted);
  const [papered, setPapered] = useState(chargeContainer.isPapered);
  const [offense, setOffense] = useState(chargeContainer.offense);
  const [chargeDispositionDate, setChargeDispositionDate] = useState(
    chargeContainer.dispositionDate
  );

  function analysis() {
    return getAnalysis(
      convicted,
      props.terminationDate,
      classification,
      isBRAFelony,
      papered
    );
  }

  return (
    <Card>
      <CardHeader
        title={props.charge}
        action={
          <IconButton
            aria-label="Show form"
            onClick={() => setShowForm(!showForm)}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
      />
      <Collapse in={showForm} timeout="auto" unmountOnExit>
        <CardContent>
          <Indicator analysis={analysis()} />

          <Grid container direction="column">
            <TextField
              id="offense-field"
              autoComplete="off"
              label="Offense"
              value={offense}
              onChange={e => setOffense(e.target.value)}
              margin="normal"
            />
            <ComposedDatePicker
              ctxKeys={["caseData", "case", "charges", props.charge]}
              label={"Disposition Date"}
              initialDate={chargeDispositionDate}
              hoist={e => setChargeDispositionDate(e)}
            />
            <TextField
              id="classification-field"
              select
              autoComplete="off"
              label="Classification"
              value={classification}
              SelectProps={{ native: true }}
              onChange={e => setClassification(e.target.value)}
              margin="normal"
            >
              <option key="" value=""></option>
              <option key="1" value="felony">
                Felony
              </option>
              <option key="2" value="misdemeanor">
                Misdemeanor
              </option>
            </TextField>
            <TextField
              id="description-field"
              autoComplete="off"
              label="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={papered}
                  onChange={e => setPapered(e.target.checked)}
                  value="Papered"
                  inputProps={{ "aria-label": "Papered checkbox" }}
                />
              }
              label="Is Papered"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={isBRAFelony}
                  onChange={e => setIsBRAFelony(e.target.checked)}
                  value="ChargeIsBRAFelony"
                  inputProps={{ "aria-label": "ChargeIsBRAFelony checkbox" }}
                />
              }
              label="Is BRA Felony"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={convicted}
                  onChange={e => setConvicted(e.target.checked)}
                  value="Convicted"
                  inputProps={{ "aria-label": "Convicted checkbox" }}
                />
              }
              label="Is Convicted"
            ></FormControlLabel>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CaseRow;

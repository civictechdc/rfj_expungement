import React, { useState, useContext } from "react";
import { CaseContext } from "../contexts/casecontroller";

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
  const value = useContext(CaseContext);
  let charge = value.caseData.case.charges[props.title];
  const [showForm, setShowForm] = useState(false); // default to collapsed

  // Charge properties
  const [description, setDescription] = useState(charge.description);
  const [classification, setClassification] = useState(
    charge.classification
  );
  const [isBRAFelony, setIsBRAFelony] = useState(charge.isBRAFelony);
  const [convicted, setConvicted] = useState(charge.isConvicted);
  const [papered, setPapered] = useState(charge.isPapered);
  const [offense, setOffense] = useState(charge.offense);
  const [dispositionDate, setDispositionDate] = useState(
    charge.dispositionDate
  );

  const persistClassification = classification => {
    setClassification(classification);
    charge.classification = classification;
    value.updater({caseData : value.caseData});
  }

  const persistDescription = description => {
    setDescription(description);
    charge.description = description;
    value.updater({caseData : value.caseData});
  }

  const persistIsBRAFelony = isBRAFelony => {
    setIsBRAFelony(isBRAFelony);
    charge.isBRAFelony = isBRAFelony;
    value.updater({caseData : value.caseData});
  }

  const persistConvicted = isConvicted => {
    setConvicted(isConvicted);
    charge.isConvicted = isConvicted;
    value.updater({caseData : value.caseData});
  }

  const persistPapered = isPapered => {
    setPapered(isPapered);
    charge.isPapered = isPapered;
    value.updater({caseData : value.caseData});
  }

  const persistOffense = offense => {
    setOffense(offense);
    charge.offense = offense;
    value.updater({caseData : value.caseData});
  }

  const persistDispositionDate = dispositionDate => {
    setDispositionDate(dispositionDate);
    charge.dispositionDate = dispositionDate;
    value.updater({caseData : value.caseData});
  }

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
        title={props.title}
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
              onChange={e => persistOffense(e.target.value)}
              margin="normal"
            />
            <ComposedDatePicker
              ctxKeys={["caseData", "case", "charges", charge]}
              label={"Disposition Date"}
              initialDate={dispositionDate}
              hoist={e => persistDispositionDate(e)}
            />
            <TextField
              id="classification-field"
              select
              autoComplete="off"
              label="Classification"
              value={classification}
              SelectProps={{ native: true }}
              onChange={e => persistClassification(e.target.value)}
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
              onChange={e => persistDescription(e.target.value)}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={papered}
                  onChange={e => persistPapered(e.target.checked)}
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
                  onChange={e => persistIsBRAFelony(e.target.checked)}
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
                  onChange={e => persistConvicted(e.target.checked)}
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

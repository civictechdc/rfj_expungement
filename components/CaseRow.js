import React, { useState, useContext, useEffect } from "react";
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
  let charge = props.charges[props.title] || {};
  const [showForm, setShowForm] = useState(true);

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

  useEffect(() => {
    if(props.charges && props.charges[props.title]){
      setDescription(props.charges[props.title].description);
      setClassification(props.charges[props.title].classification);
      setIsBRAFelony(props.charges[props.title].isBRAFelony);
      setConvicted(props.charges[props.title].isConvicted);
      setPapered(props.charges[props.title].isPapered);
      setOffense(props.charges[props.title].offense);
      setDispositionDate(props.charges[props.title].dispositionDate);  
    }
  }, [props]);

  const getUpdater = () => {
    return {
      caseData: {
        ...value.caseData,
        case: {
          ...value.caseData.case,
          charges: {
            ...value.caseData.case.charges,
          },
        },
        client: {
          ...value.caseData.client,
        }
      }
    };
  }


  const persistClassification = classification => {
    setClassification(classification);
    let update = getUpdater();
    let updateCharge = update.caseData.case.charges[props.title];
    updateCharge.classification = classification;
    value.updater(update);
  }

  const persistDescription = description => {
    setDescription(description);
    let update = getUpdater();
    let updateCharge = update.caseData.case.charges[props.title];
    updateCharge.description = description;
    value.updater(update);
  }

  const persistIsBRAFelony = isBRAFelony => {
    setIsBRAFelony(isBRAFelony);
    let update = getUpdater();
    let updateCharge = update.caseData.case.charges[props.title];
    updateCharge.isBRAFelony = isBRAFelony;
    value.updater(update);
  }

  const persistConvicted = isConvicted => {
    setConvicted(isConvicted);
    let update = getUpdater();
    let updateCharge = update.caseData.case.charges[props.title];
    updateCharge.isConvicted = isConvicted;
    value.updater(update);
  }

  const persistPapered = isPapered => {
    setPapered(isPapered);
    let update = getUpdater();
    let updateCharge = update.caseData.case.charges[props.title];
    updateCharge.isPapered = isPapered;
    value.updater(update);
  }

  const persistOffense = offense => {
    setOffense(offense);
    let update = getUpdater();
    let updateCharge = update.caseData.case.charges[props.title];
    updateCharge.offense = offense;
    value.updater(update);
  }

  const persistDispositionDate = dispositionDate => {
    setDispositionDate(dispositionDate);
    let update = getUpdater();
    let updateCharge = update.caseData.case.charges[props.title];
    updateCharge.dispositionDate = dispositionDate;
    value.updater(update);
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

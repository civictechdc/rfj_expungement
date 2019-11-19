import React, { useState, useContext, useEffect } from "react";
import { CaseContext } from "../contexts/casecontroller";

import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import ComposedDatePicker from "./ComposedDatePicker.js";
import { Button, FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

const CaseRow = (props) => {
  const [showForm, setShowForm] = useState(false);
  const value = useContext(CaseContext);
  
  // Charge properties
  const chargeObj = value.caseData.case.charges[props.charge]
  const [chargeDescription, setChargeDescription] = useState(chargeObj.description);
  const [chargeClassification, setChargeClassification] = useState(
    chargeObj.classification
    );
  const [chargeIsBRAFelony, setIsBRAFelony] = useState(chargeObj.isBRAFelony);
  const [chargeIsConvicted, setChargeIsConvicted] = useState(chargeObj.isConvicted);
  const [chargeIsPapered, setChargeIsPapered] = useState(chargeObj.isPapered);
  const [chargeOffense, setChargeOffense] = useState(chargeObj.offense);
  const [chargeDispositionDate, setChargeDispositionDate] = useState(
    chargeObj.dispositionDate);

  const handleExpandClick = () => {
    setShowForm(!showForm);
  };

  useEffect(()=>{
      value.updater({
        caseData: {
          ...value.caseData,
          case: {
            ...value.caseData.case,
            charges: {
              ...value.caseData.case.charges,
              [props.charge]:{
                description: chargeDescription,
                classification: chargeClassification,
                isBRAFelony: chargeIsBRAFelony,
                isConvicted: chargeIsConvicted,
                isPapered: chargeIsPapered,
                dispositionDate: chargeDispositionDate,
                offense: chargeOffense,

              }
            }
          }
        }
      })
    }, [chargeDescription, chargeClassification, chargeIsBRAFelony,
    chargeIsConvicted, chargeIsPapered, chargeOffense, chargeDispositionDate]
  )



  return (
    <Card>
      <CardHeader
        title={props.charge}
        action={
          <IconButton aria-label="Show form" onClick={handleExpandClick}>
            <ExpandMoreIcon />
          </IconButton>
        }
      />
      <Collapse in={showForm} timeout="auto" unmountOnExit>
      <CardContent>
      <Grid container justify="space-around" direction="column">
      <TextField
          id="offense-field"
          autoComplete='off'
          label="Offense"
          value={chargeOffense}
          onChange={e => setChargeOffense(e.target.value)}
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
          autoComplete='off'
          label="Classification"
          value={chargeClassification}
          onChange={e => setChargeClassification(e.target.value)}
          margin="normal"
        />
        <TextField
          id="description-field"
          autoComplete='off'
          label="Description"
          value={chargeDescription}
          onChange={e => setChargeDescription(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={chargeIsPapered}
              onChange={
                e => setChargeIsPapered(e.target.checked)
              }
              value="ChargeIsPapered"
              inputProps={{ "aria-label": "ChargeIsPapered checkbox" }}
            />
          }
          label="Is Papered"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Switch
              checked={chargeIsBRAFelony}
              onChange={
                e => setIsBRAFelony(e.target.checked)
              }
              value="ChargeIsBRAFelony"
              inputProps={{ "aria-label": "ChargeIsBRAFelony checkbox" }}
            />
          }
          label="Is BRA Felony"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Switch
              checked={chargeIsConvicted}
              onChange={
                e => setChargeIsConvicted(e.target.checked)
              }
              value="ChargeIsConvicted"
              inputProps={{ "aria-label": "ChargeIsConvicted checkbox" }}
            />
          }
          label="Is Convicted"
        ></FormControlLabel>
      </Grid>
      </CardContent>
      </Collapse>
    </Card>
  );
};

export default CaseRow;

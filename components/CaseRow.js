import React, { useState, Fragment } from "react";
import chargeContainer from "../static/chargecontainer.json";
import { getAnalysis } from "../libs/evaluator";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import AlbumRoundedIcon from "@material-ui/icons/AlbumRounded";
import TextField from "@material-ui/core/TextField";
import ComposedDatePicker from "./ComposedDatePicker.js";
import { FormControlLabel } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

function CaseRow(props) {
  const [showForm, setShowForm] = useState(false); // default to collapsed

  // Charge properties
  const [description, setDescription] = useState(chargeContainer.description);
  const [classification, setClassification] = useState(
    chargeContainer.classification
  );
  const [isBRAFelony, setIsBRAFelony] = useState(chargeContainer.isBRAFelony);
  const [chargeIsConvicted, setChargeIsConvicted] = useState(
    chargeContainer.isConvicted
  );
  const [chargeIsPapered, setChargeIsPapered] = useState(
    chargeContainer.isPapered
  );
  const [offense, setOffense] = useState(chargeContainer.offense);
  const [chargeDispositionDate, setChargeDispositionDate] = useState(
    chargeContainer.dispositionDate
  );

  const analysis = () => {
    return getAnalysis(
      description,
      classification,
      isBRAFelony,
      chargeIsConvicted,
      chargeIsPapered,
      offense,
      chargeDispositionDate
    );
  };

  function getAnalysisMessage() {
    return analysis().message;
  }

  function getIndicatorColor() {
    return analysis().indicator;
  }

  return (
    <Card>
      <CardHeader
        title={props.charge}
        action={
          <Fragment>
            <AlbumRoundedIcon htmlColor={getIndicatorColor()} />
            <IconButton
              aria-label="Show form"
              onClick={() => setShowForm(!showForm)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Fragment>
        }
      />
      <Collapse in={showForm} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{getAnalysisMessage()}</Typography>
          <Grid container justify="space-around" direction="column">
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
              <option key="" value="Select Classification"></option>
              <option key="1" value="Felony">
                Felony
              </option>
              <option key="2" value="Misdemeanor">
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
                  checked={chargeIsPapered}
                  onChange={e => setChargeIsPapered(e.target.checked)}
                  value="ChargeIsPapered"
                  inputProps={{ "aria-label": "ChargeIsPapered checkbox" }}
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
                  checked={chargeIsConvicted}
                  onChange={e => setChargeIsConvicted(e.target.checked)}
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
}

export default CaseRow;

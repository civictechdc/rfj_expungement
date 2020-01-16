import React, { useState, useContext, useEffect, Fragment } from "react";
import { CaseContext } from "../contexts/casecontroller";

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
import { Button, FormControlLabel } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";

const CaseRow = props => {
  const [showForm, setShowForm] = useState(false);
  const value = useContext(CaseContext);

  // Charge properties
  const chargeObj = value.caseData.case.charges[props.charge];
  const [chargeDescription, setChargeDescription] = useState(
    chargeObj.description
  );
  const [chargeClassification, setChargeClassification] = useState(
    chargeObj.classification
  );
  const [chargeIsBRAFelony, setIsBRAFelony] = useState(chargeObj.isBRAFelony);
  const [chargeIsConvicted, setChargeIsConvicted] = useState(
    chargeObj.isConvicted
  );
  const [chargeIsPapered, setChargeIsPapered] = useState(chargeObj.isPapered);
  const [chargeOffense, setChargeOffense] = useState(chargeObj.offense);
  const [chargeDispositionDate, setChargeDispositionDate] = useState(
    chargeObj.dispositionDate
  );

  const handleExpandClick = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    value.updater({
      caseData: {
        ...value.caseData,
        case: {
          ...value.caseData.case,
          charges: {
            ...value.caseData.case.charges,
            [props.charge]: {
              description: chargeDescription,
              classification: chargeClassification,
              isBRAFelony: chargeIsBRAFelony,
              isConvicted: chargeIsConvicted,
              isPapered: chargeIsPapered,
              dispositionDate: chargeDispositionDate,
              offense: chargeOffense
            }
          }
        }
      }
    });
  }, [
    chargeDescription,
    chargeClassification,
    chargeIsBRAFelony,
    chargeIsConvicted,
    chargeIsPapered,
    chargeOffense,
    chargeDispositionDate
  ]);

  const renderIndicator = () => {
    let chargeData = value.caseData.case.charges[props.charge];
    if (chargeData.hasOwnProperty("analysis")) {
      console.log("Found an analysis for this charge!");
      switch (chargeData.analysis.indicator) {
        case "ELIGIBLE":
          return "blue";
        case "INELIGIBLE":
          return "red";
        default:
          return "grey";
      }
    }
  };

  const renderAnalysisMessage = () => {
    let chargeData = value.caseData.case.charges[props.charge];
    if (chargeData.hasOwnProperty("analysis")) {
      return <Typography>{chargeData.analysis.message}</Typography>;
    }
  };

  return (
    <Card>
      <CardHeader
        title={props.charge}
        action={
          <Fragment>
            <AlbumRoundedIcon htmlColor={renderIndicator()} />
            <IconButton aria-label="Show form" onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </IconButton>
          </Fragment>
        }
      />
      <Collapse in={showForm} timeout="auto" unmountOnExit>
        <CardContent>
          {renderAnalysisMessage()}
          <Grid container justify="space-around" direction="column">
            <TextField
              id="offense-field"
              autoComplete="off"
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
              select
              autoComplete="off"
              label="Classification"
              value={chargeClassification}
              SelectProps={{
                native: true
              }}
              onChange={e => setChargeClassification(e.target.value)}
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
              value={chargeDescription}
              onChange={e => setChargeDescription(e.target.value)}
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
                  checked={chargeIsBRAFelony}
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
};

export default CaseRow;

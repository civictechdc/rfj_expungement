import React, { useEffect, useState, useContext } from "react";
import { CaseContext } from "../contexts/casecontroller";

// mui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// inputs
import { Button, FormControlLabel } from "@material-ui/core";
import ComposedDatePicker from "./ComposedDatePicker.js";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

// components
import CaseRow from "./CaseRow";
import ClientInfoTable from "./ClientInfoTable";

const useStyles = makeStyles(theme => ({
  table: {}
}));

function CaseTable(props) {
  const classes = useStyles();
  const value = useContext(CaseContext);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h4">Case Info:</Typography>}
      ></CardHeader>
      <div>
        <ClientInfoTable />
        {/* Cases in Context object */}
        <div>
          {value.caseData.case.charges.map((charge, idx) => {
            return <CaseRow key={`${idx}-chrge`} charge={charge} />;
          })}
        </div>

        <CardActionArea
          onClick={() => {
            console.log(value);
            value.pushCharge();
          }}
        >
          <Typography variant="h6">+ New Charge</Typography>
        </CardActionArea>
      </div>
    </Card>
  );
}

export default CaseTable;

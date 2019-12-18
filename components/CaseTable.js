import React, { useEffect, useState, useContext } from "react";
import { CaseContext } from "../contexts/casecontroller";

// mui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

// inputs
import { Button, FormControlLabel } from "@material-ui/core";
import ComposedDatePicker from "./ComposedDatePicker.js";
import Switch from "@material-ui/core/Switch";

// components
import CaseRow from "./CaseRow";
import ClientInfoTable from "./ClientInfoTable";
import EvaluatorInfoTable from "./EvaluatorInfoTable";
import EvaluatorCommentsTable from "./EvaluatorCommentsTable";


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
        <EvaluatorInfoTable />

        <EvaluatorCommentsTable />
        
        <ClientInfoTable />
        {/* Cases in Context object */}
        <div>
          {Object.keys(value.caseData.case.charges).map((charge, idx) => {
            return <CaseRow key={`${idx}-chrge`} charge={charge} />;
          })}
        </div>

        

        <CardActionArea
          onClick={() => {
            let chargeNum = Object.keys(value.caseData.case.charges).length
            value.pushCharge(`Charge ${chargeNum}`);
          }}
        >
          <Typography variant="h6">+ New Charge</Typography>
        </CardActionArea>
      </div>
    </Card>
  );
}

export default CaseTable;

import React from "react";

// components
import CaseTable from "./CaseTable.js";

// mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(12)
  }
}));

function BodyView() {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Grid>
        <CaseTable />
      </Grid>
    </div>
  );
}

export default BodyView;

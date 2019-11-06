import React, { Fragment } from "react";

// components
import CaseRow from "./CaseRow.js";
import CaseTable from "./CaseTable.js";

// mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(12),
    height: '100%'
  }
}));

function BodyView(props) {
  const classes = useStyles();
  return (
    <Fragment>
    <div className={classes.body}>
      <Grid>
        <CaseTable />
      </Grid>
    </div>
    <div>Produced with ❤️ in Washington DC by <a href="https://codefordc.org/"> Code For DC</a></div>
    </Fragment>
  );
}

export default BodyView;

import React, { Fragment } from "react";

// components
import CaseRow from "./CaseRow.js";
import CaseTable from "./CaseTable.js";

// mui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(5),
    height: '100%',
    overflow: 'auto',
    position: 'relative'
  }
}));

function BodyView(props) {
  const classes = useStyles();
  return (
    <Fragment>
    <Container className={classes.body}>
      <Grid container direction='column'>
        <CaseTable />
      </Grid>
    <div>Produced with ❤️ in Washington DC by <a href="https://codefordc.org/"> Code For DC</a></div>
    </Container>
    </Fragment>
  );
}

export default BodyView;

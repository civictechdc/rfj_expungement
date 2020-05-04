import React, { useContext } from "react";

import { CaseContext } from "../contexts/casecontroller";

// components
import CaseTable from "./CaseTable.js";

// mui
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(5),
    height: "100%",
    overflow: "auto",
    position: "relative"
  }
}));

function BodyView() {
  const value = useContext(CaseContext);
  const classes = useStyles();
  return (
    <Container className={classes.body}>
      <CaseTable caseData={value.caseData}/>
      <div>
        Produced with ❤️ in Washington DC by{" "}
        <a href="https://codefordc.org/">Code For DC</a>
      </div>
    </Container>
  );
}

export default BodyView;

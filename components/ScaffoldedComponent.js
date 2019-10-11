import React, { Fragment, useContext } from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";

// context
import { CaseContext } from "../contexts/casecontroller";

const useStyles = makeStyles(theme => ({
}));

export default function NavBar(props) {
  const classes = useStyles();
  let value = useContext(CaseContext);

  return (
        <CaseContext.Consumer>
          {value => {
            return (
                <div>
                    Yo yo yo!
                </div>
            );
          }}
        </CaseContext.Consumer>
  );
}

import React from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// context
import { CaseContext } from "../contexts/casecontroller";

const useStyles = makeStyles(theme => ({
  root: {
    color: "#320570",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: "100",
    display: "flex",
    flexDirection: "row"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#000000"
  },
  typography: {
    flexGrow: 1,
    margin: 0
  },
  button: {
    color: "#320570",
    flexGrow: 1
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <CaseContext.Consumer>
          {value => {
            return (
              <div style={{ display: "flex", flexGrow: 3, padding: "0 2vw" }}>
                <Typography variant="h6" className={classes.title}>
                  <p>Evaluator: {value.caseData.evaluatorName}</p>
                </Typography>

                <Typography
                  variant="h6"
                  className={classes.status}
                  style={{ color: value.status.color }}
                >
                  <p>Status: {value.status.text}</p>
                </Typography>
              </div>
            );
          }}
        </CaseContext.Consumer>

        <div style={{ display: "flex", flexGrow: 1 }}>
          <Button color="inherit" className={classes.button}>
            To Top
          </Button>

          <CaseContext.Consumer>
            {value => {
              return (
                <Button
                  color="inherit"
                  className={classes.button}
                  onClick={value.reset}
                >
                  Reset Form
                </Button>
              );
            }}
          </CaseContext.Consumer>
          <CaseContext.Consumer>
            {value => {
              return (
                <Button
                  color="inherit"
                  className={classes.button}
                  onClick={value.saveDataToPDF}
                >
                  Save Fields to PDF
                </Button>
              );
            }}
          </CaseContext.Consumer>
        </div>
      </Toolbar>
    </AppBar>
  );
}

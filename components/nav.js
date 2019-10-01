import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
    color: "#320570"
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

export default function NavBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <div style={{ display: "flex", flexGrow: 3, padding: "0 2vw" }}>
            <Typography variant="h6" className={classes.title}>
              {props.name}
            </Typography>

            <Typography
              variant="h6"
              className={classes.status}
              style={{ color: props.status.color }}
            >
              {props.status.text}
            </Typography>
          </div>

          <div style={{ display: "flex", flexGrow: 1 }}>
            <Button color="inherit" className={classes.button}>
              To Top
            </Button>

            <Button color="inherit" className={classes.button}>
              Reset Form
            </Button>

            <Button color="inherit" className={classes.button}>
              Save to PDF
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

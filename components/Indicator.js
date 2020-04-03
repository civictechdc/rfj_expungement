import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const iconMap = {
  unknown: <HelpOutlineIcon htmlColor="grey" />,
  yes: <CheckCircleOutlineIcon htmlColor="green" />,
  no: <BlockIcon htmlColor="red" />
};

function IndicatorSection(props) {
  return (
    <>
      <Grid item xs={3}>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid item xs={1}>
        {iconMap[props.section.eligible]}
      </Grid>
      <Grid item xs={8}>
        <Typography>{props.section.message}</Typography>
      </Grid>
    </>
  );
}

function Indicator(props) {
  return (
    <Grid container spacing={0}>
      <IndicatorSection
        title="16-802 (Actual Innocence)"
        section={props.analysis.section802}
      />
      <IndicatorSection
        title="16-803 (Interest of Justice)"
        section={props.analysis.section803}
      />
    </Grid>
  );
}

export default Indicator;

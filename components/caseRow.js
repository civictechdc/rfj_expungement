import React, { useState } from "react";

import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const CaseRow = () => {
  const [showForm, setShowForm] = useState(false);

  const handleExpandClick = () => {
    setShowForm(!showForm);
  };

  return (
    <Card>
      <CardHeader
        title={"Charge"}
        action={
          <IconButton aria-label="Show form" onClick={handleExpandClick}>
            <ExpandMoreIcon />
          </IconButton>
        }
      />
      <Collapse in={showForm} timeout="auto" unmountOnExit>
        {"WOOOT"}
      </Collapse>
    </Card>
  );
};

export default CaseRow;

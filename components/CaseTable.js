import React, { useContext } from "react";
import { CaseContext } from "../contexts/casecontroller";

// mui
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

// components
import CaseRow from "./CaseRow";

function CaseTable() {
  const value = useContext(CaseContext);

  return (
    <Card>
      <CardHeader title={<Typography variant="h4">Case Info:</Typography>} />
      <div>
        {/* Cases in Context object */}
        <div>
          {value.caseData.case.charges.map((charge, idx) => {
            return <CaseRow key={`${idx}-chrge`} charge={charge} />;
          })}
        </div>

        <CardActionArea
          onClick={() => {
            console.log(value);
            value.pushCharge();
          }}
        >
          <Typography variant="h6">+ New Charge</Typography>
        </CardActionArea>
      </div>
    </Card>
  );
}

export default CaseTable;

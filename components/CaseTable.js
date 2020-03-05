import React, { useContext } from "react";
import { CaseContext } from "../contexts/casecontroller";

// mui
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

// components
import CaseRow from "./CaseRow";
import ClientInfoTable from "./ClientInfoTable";
import EvaluatorInfoTable from "./EvaluatorInfoTable";
import EvaluatorCommentsTable from "./EvaluatorCommentsTable";

function CaseTable() {
  const value = useContext(CaseContext);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h4">Case Info:</Typography>}
      ></CardHeader>
      <div>
        <EvaluatorInfoTable />

        <EvaluatorCommentsTable />

        <ClientInfoTable />
        {/* Cases in Context object */}
        <div>
          {Object.keys(value.caseData.case.charges).map((charge, idx) => {
            return <CaseRow key={`${idx}-charge`} charge={charge} />;
          })}
        </div>

        <CardActionArea
          onClick={() => {
            let chargeNum = Object.keys(value.caseData.case.charges).length + 1;
            value.pushCharge(`Charge ${chargeNum}`);
          }}
        >
          <Typography variant="h6">+ New Charge</Typography>
        </CardActionArea>
      </div>
    </Card>
  );
}

export default CaseTable;

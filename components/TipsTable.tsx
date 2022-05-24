import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Tip } from "../types/tips";

type TipsList = {
  prevTips: Tip[];
};

const TipsTable: React.FC<TipsList> = ({ prevTips }) => {
  const listOfTips = prevTips.map((data) => (
    <tr className="tableRow" key={data.UUID}>
      <td>{data.RaceID}</td>
      <td>{data.formula}</td>
      <td>{data.method}</td>
      <td>{data.nagoshi}</td>
      <td>{data.multi}</td>
      <td>{data.First}</td>
      <td>{data.Second}</td>
      <td>{data.Third}</td>
      <td>{data.amount}</td>
    </tr>
  ));
  return (
    <Paper className="table--wrapper">
      <h4>Previous Entries</h4>
      <table>
        <thead>
          <tr>
            <th>Race ID</th>
            <th>Formula</th>
            <th>Method</th>
            <th>Nagashi</th>
            <th>Multi</th>
            <th>1st</th>
            <th>2nd</th>
            <th>3rd</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{listOfTips}</tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Button variant="contained">DOWNLOAD</Button>
        <Button variant="contained">CLEAR</Button>
      </div>
    </Paper>
  );
};

export default TipsTable;

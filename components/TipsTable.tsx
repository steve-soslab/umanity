import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Tip } from "../types/tips";
import { loadingState } from "../types/loading";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

type TipsList = {
  prevTips: Tip[];
  deleteTipsHandler: () => void;
  loading: loadingState;
  downloadCsvHandler: () => void;
  readTipsListHandler: () => void;
};

const TipsTable: React.FC<TipsList> = ({
  prevTips,
  deleteTipsHandler,
  loading,
  downloadCsvHandler,
  readTipsListHandler,
}) => {
  const listOfTips = prevTips.map((data) => {
    const deleteSingleEntryHandler = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ UUID: data.UUID }),
      };

      await fetch("/api/deleteSingleEntry", requestOptions);
      readTipsListHandler();
    };

    return (
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
        <td>
          <IconButton onClick={deleteSingleEntryHandler}>
            <ClearIcon />
          </IconButton>
        </td>
      </tr>
    );
  });
  return (
    <Paper className="table--wrapper">
      <h4>Previous Entries</h4>
      <table>
        <thead>
          <tr>
            <th>Race ID</th>
            <th>Bet Type</th>
            <th>Method</th>
            <th>Nagashi</th>
            <th>Multi</th>
            <th>1st</th>
            <th>2nd</th>
            <th>3rd</th>
            <th>Stake ¥</th>
            <th>DELETE</th>
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
        <Button onClick={downloadCsvHandler} variant="contained">
          DOWNLOAD
        </Button>
        {loading.clear ? (
          <Button variant="outlined">
            <CircularProgress size="1.5rem" />
          </Button>
        ) : (
          <Button onClick={deleteTipsHandler} variant="contained">
            CLEAR
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default TipsTable;

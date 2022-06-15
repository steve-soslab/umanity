import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Tip } from "../types/tips";
import { loadingState } from "../types/loading";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { error } from "../types/error";
import TableComments from "./TableComments";
import umanityRunnerCodeConverter from "../lib/umanityRunnerCodeConverter";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type TipsList = {
  prevTips: Tip[];
  deleteTipsHandler: () => void;
  loading: loadingState;
  downloadCsvHandler: () => void;
  readTipsListHandler: () => void;
  error: error;
};

const TipsTable: React.FC<TipsList> = ({
  prevTips,
  deleteTipsHandler,
  loading,
  downloadCsvHandler,
  readTipsListHandler,
  error,
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
        <td>{data.banker}</td>
        <td>
          {data.multi === 0 ? (
            <CancelIcon color="primary" />
          ) : (
            <CheckCircleIcon color="success" />
          )}
        </td>
        <td>
          {data.confirmationFlag === 0 ? (
            <CancelIcon color="primary" />
          ) : (
            <CheckCircleIcon color="success" />
          )}
        </td>
        <td>
          {data.tipOfTheDay === 0 ? (
            <CancelIcon color="primary" />
          ) : (
            <CheckCircleIcon color="success" />
          )}
        </td>
        <td>{umanityRunnerCodeConverter(data.First)}</td>
        <td>{umanityRunnerCodeConverter(data.Second)}</td>
        <td>{umanityRunnerCodeConverter(data.Third)}</td>
        <td>
          <TableComments tip={data} />
        </td>
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
      <h4>Tips | Strategy</h4>
      <table>
        <thead>
          <tr>
            <th>Race ID</th>
            <th>Bet Type</th>
            <th>Method</th>
            <th>Banker</th>
            <th>Multi</th>
            <th>Confirmed</th>
            <th>TOTD</th>
            <th>1st</th>
            <th>2nd</th>
            <th>3rd</th>
            <th>Comments</th>
            <th>Stake ¥ x 100</th>
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
          GENERATE .CSV
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
      {error.download && (
        <h6 style={{ textAlign: "end" }}>
          Sorry there was an error, please try again later
        </h6>
      )}
    </Paper>
  );
};

export default TipsTable;

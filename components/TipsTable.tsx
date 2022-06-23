import React, { useState } from "react";
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
import betTypeConverter from "../lib/betTypeConverter";
import methodConverter from "../lib/methodConverter";
import bankerConverter from "../lib/bankerConverter";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

type TipsList = {
  prevTips: Tip[];
  deleteTipsHandler: () => void;
  loading: loadingState;
  downloadFirstCsvHandler: () => void;
  downloadSecondCsvHandler: () => void;
  readTipsListHandler: () => void;
  error: error;
};

const TipsTable: React.FC<TipsList> = ({
  prevTips,
  deleteTipsHandler,
  loading,
  downloadFirstCsvHandler,
  downloadSecondCsvHandler,
  readTipsListHandler,
  error,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dialogToggle = () => setOpen((state) => !state);
  const betTickets = prevTips.filter((data) => data.bet_ticket);

  const deleteTips = () => {
    deleteTipsHandler();
    setOpen(false);
  };

  const listOfTips = betTickets.map((data) => {
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
        <td>{data.event}</td>
        <td>{betTypeConverter(data.formula)}</td>
        <td>{methodConverter(data.method)}</td>
        <td>{bankerConverter(data.banker)}</td>

        <td>
          {umanityRunnerCodeConverter(data.First)}{" "}
          {data.First !== "000000000000000000" && data.FirstName}
        </td>
        <td>
          {umanityRunnerCodeConverter(data.Second)}{" "}
          {data.Second !== "000000000000000000" && data.SecondName}
        </td>
        <td>
          {umanityRunnerCodeConverter(data.Third)}{" "}
          {data.Third !== "000000000000000000" && data.ThirdName}
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
  const tipMarkers = prevTips.filter((data) => !data.bet_ticket);
  const listOfTipMarkets = tipMarkers.map((data) => {
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
        <td>{data.event}</td>

        <td>
          {data.tipOfTheDay === 0 ? (
            <CancelIcon color="primary" />
          ) : (
            <CheckCircleIcon color="success" />
          )}
        </td>

        <td>
          <TableComments tip={data} />
        </td>
        <td>{data.value}</td>
        <td>
          <IconButton onClick={deleteSingleEntryHandler}>
            <ClearIcon />
          </IconButton>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Paper className="table--wrapper">
          <h4>Bet | Strategy | Tickets</h4>
          <table>
            <thead>
              <tr>
                <th>Race</th>
                <th>Bet Type</th>
                <th>Method</th>
                <th>Banker</th>

                <th>1st</th>
                <th>2nd</th>
                <th>3rd</th>

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
            <Button onClick={downloadFirstCsvHandler} variant="contained">
              GENERATE BET TICKET .CSV
            </Button>

            <Button onClick={dialogToggle} variant="contained">
              CLEAR
            </Button>
          </div>
          {error.download && (
            <h6 style={{ textAlign: "end" }}>
              Sorry there was an error, please try again later
            </h6>
          )}
        </Paper>
      </div>
      <Paper className="table--wrapper">
        <h4>Tips Marks</h4>
        <table>
          <thead>
            <tr>
              <th>Race</th>

              <th>Tip of the day</th>
              <th>Comments</th>
              <th>Value</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>{listOfTipMarkets}</tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Button onClick={downloadSecondCsvHandler} variant="contained">
            GENERATE TIP MARKS .CSV
          </Button>

          <Button onClick={dialogToggle} variant="contained">
            CLEAR
          </Button>
        </div>
        {error.download && (
          <h6 style={{ textAlign: "end" }}>
            Sorry there was an error, please try again later
          </h6>
        )}
      </Paper>
      <Dialog onClose={dialogToggle} open={open}>
        <DialogTitle>Are you sure?</DialogTitle>
        <div style={{ padding: "20px" }}>
          <p>If yes, all data will be deleted from the database</p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              sx={{ width: "100px" }}
              variant="contained"
              color="primary"
              onClick={dialogToggle}
            >
              NO
            </Button>
            {loading.clear ? (
              <Button sx={{ width: "100px" }} variant="outlined" color="error">
                <CircularProgress size="8px" />
              </Button>
            ) : (
              <Button
                onClick={deleteTips}
                sx={{ width: "100px" }}
                variant="contained"
                color="error"
              >
                YES
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TipsTable;

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { loadingState } from "../types/loading";

import { error } from "../types/error";
import { Tip } from "../types/tips";

type UmanityFormTwoProps = {
  tip: Tip;
  setTip: (data: Tip) => void;
  createTipHandler: () => void;
  loading: loadingState;
  error: error;
  runnerNames: any;
};

const UmanityFormTwo: React.FC<UmanityFormTwoProps> = ({
  tip,
  setTip,
  createTipHandler,
  loading,
  error,
  runnerNames,
}) => {
  const handleFirstChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, First: event.target.value });
  };
  const handleSecondChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, Second: event.target.value });
  };
  const handleThirdChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, Third: event.target.value });
  };
  const multiHandler = (e) => {
    if (e.target.checked) {
      setTip({ ...tip, multi: 1 });
    } else {
      setTip({ ...tip, multi: 0 });
    }
  };
  const runnerNameSelector = () => {
    let runnerArray = [];
    runnerNames.forEach((element, i) => {
      let field = "000000000000000000";
      field = field.substring(0, i) + "1" + field.substring(i + 1);
      runnerArray.push(
        <MenuItem value={"100000000000000000"}>runnerNames</MenuItem>
      );
      return runnerArray.map((row) => {
        return row;
      });
    });
  };
  const runnerHackyCode = () => {
    return (
      <React.Fragment>
        <MenuItem value={"000000000000000000"}>-</MenuItem>
        <MenuItem value={"100000000000000000"}>
          {runnerNames[0]?.competitor.name
            ? runnerNames[0].competitor.name
            : "Runner 1"}
        </MenuItem>
        <MenuItem value={"010000000000000000"}>
          {runnerNames[1]?.competitor.name
            ? runnerNames[1].competitor.name
            : "Runner 2"}
        </MenuItem>
        <MenuItem value={"001000000000000000"}>
          {runnerNames[2]?.competitor.name
            ? runnerNames[2].competitor.name
            : "Runner 2"}
        </MenuItem>
        <MenuItem value={"000100000000000000"}>
          {runnerNames[3]?.competitor.name
            ? runnerNames[3].competitor.name
            : "Runner 4"}
        </MenuItem>
        <MenuItem value={"000010000000000000"}>
          {runnerNames[4]?.competitor.name
            ? runnerNames[4].competitor.name
            : "Runner 5"}
        </MenuItem>
        <MenuItem value={"000001000000000000"}>
          {runnerNames[5]?.competitor.name
            ? runnerNames[5].competitor.name
            : "Runner 6"}
        </MenuItem>
        <MenuItem value={"000000100000000000"}>
          {runnerNames[6]?.competitor.name
            ? runnerNames[6].competitor.name
            : "Runner 7"}
        </MenuItem>
        <MenuItem value={"000000010000000000"}>
          {runnerNames[7]?.competitor.name
            ? runnerNames[7].competitor.name
            : "Runner 8"}
        </MenuItem>
        <MenuItem value={"000000001000000000"}>
          {runnerNames[8]?.competitor.name
            ? runnerNames[8].competitor.name
            : "Runner 9"}
        </MenuItem>
        <MenuItem value={"000000000100000000"}>
          {runnerNames[9]?.competitor.name
            ? runnerNames[9].competitor.name
            : "Runner 10"}
        </MenuItem>
        <MenuItem value={"000000000010000000"}>
          {runnerNames[10]?.competitor.name
            ? runnerNames[10].competitor.name
            : "Runner 11"}
        </MenuItem>
        <MenuItem value={"000000000001000000"}>
          {runnerNames[11]?.competitor.name
            ? runnerNames[11].competitor.name
            : "Runner 12"}
        </MenuItem>
        <MenuItem value={"000000000000100000"}>
          {runnerNames[12]?.competitor.name
            ? runnerNames[12].competitor.name
            : "Runner 13"}
        </MenuItem>
        <MenuItem value={"000000000000010000"}>
          {runnerNames[13]?.competitor.name
            ? runnerNames[13].competitor.name
            : "Runner 14"}
        </MenuItem>
        <MenuItem value={"000000000000001000"}>
          {runnerNames[14]?.competitor.name
            ? runnerNames[14].competitor.name
            : "Runner 15"}
        </MenuItem>
        <MenuItem value={"000000000000000100"}>
          {runnerNames[15]?.competitor.name
            ? runnerNames[15].competitor.name
            : "Runner 16"}
        </MenuItem>
        <MenuItem value={"000000000000000010"}>
          {runnerNames[16]?.competitor.name
            ? runnerNames[16].competitor.name
            : "Runner 17"}
        </MenuItem>
        <MenuItem value={"000000000000000001"}>
          {runnerNames[17]?.competitor.name
            ? runnerNames[17].competitor.name
            : "Runner 18"}
        </MenuItem>
      </React.Fragment>
    );
  };

  return (
    <Paper className="form">
      <FormGroup>
        <FormControlLabel
          labelPlacement="start"
          control={<Switch onChange={multiHandler} checked={tip.multi === 1} />}
          label="Multi"
        />
      </FormGroup>
      <FormControl sx={{ mb: 2 }} fullWidth>
        <InputLabel id="1st Place">1st Place</InputLabel>
        <Select
          labelId="1st Place"
          value={tip.First}
          label="1st Place"
          onChange={handleFirstChange}
        >
          {runnerHackyCode()}
        </Select>
      </FormControl>
      <FormControl sx={{ mb: 2 }} fullWidth>
        <InputLabel id="2nd Place">2nd Place</InputLabel>
        <Select
          labelId="2nd Place"
          value={tip.Second}
          label="2nd Place"
          onChange={handleSecondChange}
        >
          {runnerHackyCode()}
        </Select>
      </FormControl>
      <FormControl sx={{ mb: 2 }} fullWidth>
        <InputLabel id="3rd Place">3rd Place</InputLabel>
        <Select
          labelId="3rd Place"
          value={tip.Third}
          label="3rd Place"
          onChange={handleThirdChange}
        >
          {runnerHackyCode()}
        </Select>
      </FormControl>
      <TextField
        sx={{ mb: 2 }}
        label="Stake"
        value={tip.amount}
        onChange={(e) => {
          setTip({ ...tip, amount: parseInt(e.target.value) });
        }}
        fullWidth
        type="number"
      />
      {error.submit && <h6>Sorry, there was an error, please try later</h6>}
      {loading.submit ? (
        <Button variant="outlined">
          <CircularProgress size="1.5rem" />
        </Button>
      ) : (
        <Button onClick={createTipHandler} variant="contained">
          SUBMIT
        </Button>
      )}
    </Paper>
  );
};

export default UmanityFormTwo;

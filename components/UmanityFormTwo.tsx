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

import { Tip } from "../types/tips";

type UmanityFormTwoProps = {
  tip: Tip;
  setTip: (data: Tip) => void;
  createTipHandler: () => void;
  loading: loadingState;
};

const UmanityFormTwo: React.FC<UmanityFormTwoProps> = ({
  tip,
  setTip,
  createTipHandler,
  loading,
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
          <MenuItem value={"000000000000000000"}>-</MenuItem>
          <MenuItem value={"100000000000000000"}>RUNNER 1</MenuItem>
          <MenuItem value={"010000000000000000"}>RUNNER 2</MenuItem>
          <MenuItem value={"001000000000000000"}>RUNNER 3</MenuItem>
          <MenuItem value={"000100000000000000"}>RUNNER 4</MenuItem>
          <MenuItem value={"000010000000000000"}>RUNNER 5</MenuItem>
          <MenuItem value={"000001000000000000"}>RUNNER 6</MenuItem>
          <MenuItem value={"000000100000000000"}>RUNNER 7</MenuItem>
          <MenuItem value={"000000010000000000"}>RUNNER 8</MenuItem>
          <MenuItem value={"000000001000000000"}>RUNNER 9</MenuItem>
          <MenuItem value={"000000000100000000"}>RUNNER 10</MenuItem>
          <MenuItem value={"000000000010000000"}>RUNNER 11</MenuItem>
          <MenuItem value={"000000000001000000"}>RUNNER 12</MenuItem>
          <MenuItem value={"000000000000100000"}>RUNNER 13</MenuItem>
          <MenuItem value={"000000000000010000"}>RUNNER 14</MenuItem>
          <MenuItem value={"000000000000001000"}>RUNNER 15</MenuItem>
          <MenuItem value={"000000000000000100"}>RUNNER 16</MenuItem>
          <MenuItem value={"000000000000000010"}>RUNNER 17</MenuItem>
          <MenuItem value={"000000000000000001"}>RUNNER 18</MenuItem>
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
          <MenuItem value={"000000000000000000"}>-</MenuItem>
          <MenuItem value={"100000000000000000"}>RUNNER 1</MenuItem>
          <MenuItem value={"010000000000000000"}>RUNNER 2</MenuItem>
          <MenuItem value={"001000000000000000"}>RUNNER 3</MenuItem>
          <MenuItem value={"000100000000000000"}>RUNNER 4</MenuItem>
          <MenuItem value={"000010000000000000"}>RUNNER 5</MenuItem>
          <MenuItem value={"000001000000000000"}>RUNNER 6</MenuItem>
          <MenuItem value={"000000100000000000"}>RUNNER 7</MenuItem>
          <MenuItem value={"000000010000000000"}>RUNNER 8</MenuItem>
          <MenuItem value={"000000001000000000"}>RUNNER 9</MenuItem>
          <MenuItem value={"000000000100000000"}>RUNNER 10</MenuItem>
          <MenuItem value={"000000000010000000"}>RUNNER 11</MenuItem>
          <MenuItem value={"000000000001000000"}>RUNNER 12</MenuItem>
          <MenuItem value={"000000000000100000"}>RUNNER 13</MenuItem>
          <MenuItem value={"000000000000010000"}>RUNNER 14</MenuItem>
          <MenuItem value={"000000000000001000"}>RUNNER 15</MenuItem>
          <MenuItem value={"000000000000000100"}>RUNNER 16</MenuItem>
          <MenuItem value={"000000000000000010"}>RUNNER 17</MenuItem>
          <MenuItem value={"000000000000000001"}>RUNNER 18</MenuItem>
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
          <MenuItem value={"000000000000000000"}>-</MenuItem>
          <MenuItem value={"100000000000000000"}>RUNNER 1</MenuItem>
          <MenuItem value={"010000000000000000"}>RUNNER 2</MenuItem>
          <MenuItem value={"001000000000000000"}>RUNNER 3</MenuItem>
          <MenuItem value={"000100000000000000"}>RUNNER 4</MenuItem>
          <MenuItem value={"000010000000000000"}>RUNNER 5</MenuItem>
          <MenuItem value={"000001000000000000"}>RUNNER 6</MenuItem>
          <MenuItem value={"000000100000000000"}>RUNNER 7</MenuItem>
          <MenuItem value={"000000010000000000"}>RUNNER 8</MenuItem>
          <MenuItem value={"000000001000000000"}>RUNNER 9</MenuItem>
          <MenuItem value={"000000000100000000"}>RUNNER 10</MenuItem>
          <MenuItem value={"000000000010000000"}>RUNNER 11</MenuItem>
          <MenuItem value={"000000000001000000"}>RUNNER 12</MenuItem>
          <MenuItem value={"000000000000100000"}>RUNNER 13</MenuItem>
          <MenuItem value={"000000000000010000"}>RUNNER 14</MenuItem>
          <MenuItem value={"000000000000001000"}>RUNNER 15</MenuItem>
          <MenuItem value={"000000000000000100"}>RUNNER 16</MenuItem>
          <MenuItem value={"000000000000000010"}>RUNNER 17</MenuItem>
          <MenuItem value={"000000000000000001"}>RUNNER 18</MenuItem>
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

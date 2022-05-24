import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const UmanityForm = ({ tip, setTip }) => {
  const handleFormulaChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, formula: JSON.parse(event.target.value) });
  };
  const handleMethodChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, method: JSON.parse(event.target.value) });
  };
  const handleNagashiChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, nagoshi: JSON.parse(event.target.value) });
  };
  return (
    <Paper className="form">
      <h4>Enter your tips</h4>
      <TextField
        className="form--fields"
        label="Race ID"
        value={tip.RaceID}
        onChange={(e) => setTip({ ...tip, RaceID: e.target.value })}
        fullWidth
      />
      <FormControl className="form--fields" fullWidth>
        <InputLabel id="Formula">Formula</InputLabel>
        <Select
          labelId="Formula"
          value={JSON.stringify(tip.formula)}
          label="Formula"
          onChange={handleFormulaChange}
        >
          <MenuItem value={1}>WIN</MenuItem>
          <MenuItem value={2}>DOUBLE WIN</MenuItem>
          <MenuItem value={3}>FRAME REAM</MenuItem>
          <MenuItem value={4}>MAREN</MenuItem>
          <MenuItem value={5}>WIDE</MenuItem>
          <MenuItem value={6}>HOURSE SINGLE</MenuItem>
          <MenuItem value={7}>TRIPLE DOUBLE</MenuItem>
          <MenuItem value={8}>TRIPLE SINGLE</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="form--fields" fullWidth>
        <InputLabel id="Method">Method</InputLabel>
        <Select
          labelId="Method"
          value={JSON.stringify(tip.method)}
          label="Method"
          onChange={handleMethodChange}
        >
          <MenuItem value={1}>NORMAL</MenuItem>
          <MenuItem value={2}>FORMATION</MenuItem>
          <MenuItem value={3}>BOX</MenuItem>
          <MenuItem value={4}>NAGASHI</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="form--fields" fullWidth>
        <InputLabel id="Nagashi">Nagashi</InputLabel>
        <Select
          labelId="Nagashi"
          value={JSON.stringify(tip.nagoshi)}
          label="Nagashi"
          onChange={handleNagashiChange}
        >
          <MenuItem value={0}>UNSPECIFIED</MenuItem>
          <MenuItem value={1}>1st</MenuItem>
          <MenuItem value={2}>2nd</MenuItem>
          <MenuItem value={3}>3rd</MenuItem>
          <MenuItem value={4}>1 AXIS</MenuItem>
          <MenuItem value={5}>2nd AXIS</MenuItem>
          <MenuItem value={6}>1st and 2nd</MenuItem>
          <MenuItem value={7}>1st and 3rd</MenuItem>
          <MenuItem value={8}>2nd and 3rd</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default UmanityForm;

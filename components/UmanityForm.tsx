import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { error } from "../types/error";
import { Tip } from "../types/tips";
import { raceSelectorForm } from "../types/raceSelectorForm";
import generateDate from "../lib/generateDate";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import TipMark from "./TipMark";
import Fab from "@mui/material/Fab";

type UmanityFormProps = {
  error: error;
  tip: Tip;
  prevTips: Tip[];
  setTip: (data: Tip) => void;
  raceSelectorForm: raceSelectorForm;
  runnerNames: any;
  createTipMark: () => void;
};

const UmanityForm: FC<UmanityFormProps> = ({
  tip,
  setTip,
  prevTips,
  runnerNames,
  error,
  raceSelectorForm,
  createTipMark,
}) => {
  const handleFormulaChange = (event: SelectChangeEvent) => {
    if (parseInt(event.target.value) > 2 && parseInt(event.target.value) < 7) {
      return setTip({
        ...tip,
        Third: "000000000000000000",
        ThirdName: "",
        formula: JSON.parse(event.target.value),
      });
    }
    if (parseInt(event.target.value) < 3) {
      return setTip({
        ...tip,
        Second: "000000000000000000",
        SecondName: "",
        Third: "000000000000000000",
        ThirdName: "",
        formula: JSON.parse(event.target.value),
      });
    }
    setTip({ ...tip, formula: JSON.parse(event.target.value) });
  };
  const handleMethodChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, method: JSON.parse(event.target.value) });
  };
  const handleNagashiChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, banker: JSON.parse(event.target.value) });
  };
  const multiHandler = (e) => {
    if (e.target.checked) {
      setTip({ ...tip, multi: 1 });
    } else {
      setTip({ ...tip, multi: 0 });
    }
  };
  const formatDate = () => {
    const newDate = new Date(raceSelectorForm.date);
    const getDate = newDate.getDate();
    const getMonth = newDate.getMonth() + 1;
    const getYear = newDate.getFullYear();
    return `${getDate}/${getMonth}/${getYear}`;
  };
  const confirmationFlagHandler = (e) => {
    if (e.target.checked === true) {
      setTip({ ...tip, confirmationFlag: 1 });
    } else {
      setTip({ ...tip, confirmationFlag: 0 });
    }
  };
  const tipOfTheDaHandler = (e) => {
    if (e.target.checked === true) {
      setTip({ ...tip, tipOfTheDay: 1 });
    } else {
      setTip({ ...tip, tipOfTheDay: 0 });
    }
  };

  const checkTOTD = () => {
    const filterdRes: Tip[] = prevTips.filter(
      (data) => data.event === tip.event
    );
    const TOTD: Tip[] = filterdRes.filter((data) => data.tipOfTheDay === 1);

    return TOTD;
  };
  const TOTDcheck = checkTOTD();
  return (
    <Paper className="form">
      <h4>
        {raceSelectorForm.venueName} {formatDate()} Race:{" "}
        {raceSelectorForm.raceNumber}
      </h4>
      <TextField
        sx={{ mb: 2 }}
        className="form--fields"
        label="Race ID"
        error={error.raceId_formValidation}
        helperText={
          error.raceId_formValidation && "Enter a Race ID in order to submit"
        }
        value={tip.RaceID}
        onChange={(e) => setTip({ ...tip, RaceID: e.target.value })}
        fullWidth
      />
      <FormControl sx={{ mb: 2 }} fullWidth>
        <InputLabel id="Formula">Bet Type</InputLabel>
        <Select
          labelId="Formula"
          value={JSON.stringify(tip.formula)}
          label="Formula"
          onChange={handleFormulaChange}
        >
          <MenuItem value={1}>WIN</MenuItem>
          <MenuItem value={2}>PLACE</MenuItem>
          <MenuItem value={3}>BRACKET QUINELLA</MenuItem>
          <MenuItem value={4}>QUINELLA</MenuItem>
          <MenuItem value={5}>QUINELLA PLACE</MenuItem>
          <MenuItem value={6}>EXACTA</MenuItem>
          <MenuItem value={7}>TRIO</MenuItem>
          <MenuItem value={8}>TRIFECTA</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mb: 2 }} fullWidth>
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
          <MenuItem value={4}>BANKER</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mb: 2 }} fullWidth>
        <InputLabel id="Nagashi">Banker</InputLabel>
        <Select
          labelId="Nagashi"
          value={JSON.stringify(tip.banker)}
          label="Nagashi"
          onChange={handleNagashiChange}
        >
          <MenuItem value={0}>-</MenuItem>
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

      <TipMark
        createTipMark={createTipMark}
        tip={tip}
        setTip={setTip}
        runnerNames={runnerNames}
      />
    </Paper>
  );
};

export default UmanityForm;

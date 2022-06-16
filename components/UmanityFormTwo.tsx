import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { loadingState } from "../types/loading";
import CommentModal from "./CommentModal";
import OkGoodSelector from "./OkGoodSelector";
import { error } from "../types/error";
import { Tip } from "../types/tips";
import PlaceSelector from "./PlaceSelector";

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
    console.log(event.target.value);
    setTip({ ...tip, Second: event.target.value });
  };
  const handleThirdChange = (event: SelectChangeEvent) => {
    setTip({ ...tip, Third: event.target.value });
  };

  return (
    <Paper
      sx={{
        display: "flex",

        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="form"
    >
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="1st Place">1st Place</InputLabel>
            <PlaceSelector
              first
              runnerNames={runnerNames}
              tip={tip}
              setTip={setTip}
            />
          </FormControl>
          <CommentModal tip={tip} setTip={setTip} position="FirstComment" />
        </div>
        <div style={{ display: "flex" }}>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="2nd Place">2nd Place</InputLabel>
            <PlaceSelector
              second
              runnerNames={runnerNames}
              tip={tip}
              setTip={setTip}
            />
          </FormControl>
          <CommentModal tip={tip} setTip={setTip} position="SecondComment" />
        </div>
        <div style={{ display: "flex" }}>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="3rd Place">3rd Place</InputLabel>
            <PlaceSelector
              third
              runnerNames={runnerNames}
              tip={tip}
              setTip={setTip}
            />
          </FormControl>
          <CommentModal tip={tip} setTip={setTip} position="ThirdComment" />
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CommentModal
            tip={tip}
            setTip={setTip}
            position="comments"
            eventComment
          />
          <OkGoodSelector tip={tip} setTip={setTip} runnerNames={runnerNames} />
        </div>
      </div>
      <div>
        {error.submit && <h6>Sorry, there was an error, please try later</h6>}
        {loading.submit ? (
          <Button sx={{ mt: 2 }} variant="outlined">
            <CircularProgress size="1.5rem" />
          </Button>
        ) : (
          <Button sx={{ mt: 2 }} onClick={createTipHandler} variant="contained">
            SUBMIT
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default UmanityFormTwo;

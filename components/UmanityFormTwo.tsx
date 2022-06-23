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
import OkGoodSelector from "./OkGoodSelector";
import { error } from "../types/error";
import { Tip } from "../types/tips";
import Fab from "@mui/material/Fab";
import PlaceSelector from "./PlaceSelector";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import TipMark from "./TipMark";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

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
  return (
    <Paper className="form">
      <h4>Tips Input | Delivery</h4>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="1st">1st</InputLabel>
            <PlaceSelector
              first
              runnerNames={runnerNames}
              tip={tip}
              setTip={setTip}
            />
          </FormControl>
        </div>
        <div style={{ display: "flex" }}>
          <FormControl disabled={tip.formula <= 2} sx={{ mb: 2 }} fullWidth>
            <InputLabel id="2nd">2nd</InputLabel>
            <PlaceSelector
              second
              runnerNames={runnerNames}
              tip={tip}
              setTip={setTip}
            />
          </FormControl>
        </div>
        <div style={{ display: "flex" }}>
          <FormControl disabled={tip.formula <= 6} sx={{ mb: 2 }} fullWidth>
            <InputLabel id="3rd">3rd</InputLabel>
            <PlaceSelector
              third
              runnerNames={runnerNames}
              tip={tip}
              setTip={setTip}
            />
          </FormControl>
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginBottom: "10px",
          }}
        >
          <Fab
            sx={{ fontSize: "12px", width: "22%" }}
            variant="extended"
            color="primary"
            onClick={createTipHandler}
          >
            <ConfirmationNumberIcon sx={{ mr: 1 }} />
            Bet ticket
          </Fab>
        </div>
      </div>
      <div>
        {error.submit && <h6>Sorry, there was an error, please try later</h6>}
      </div>
    </Paper>
  );
};

export default UmanityFormTwo;

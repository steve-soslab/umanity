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
            <Select
              labelId="1st Place"
              value={tip.First}
              label="1st Place"
              onChange={handleFirstChange}
            >
              <MenuItem value={"000000000000000000"}>-</MenuItem>
              <MenuItem value={"100000000000000000"}>
                {runnerNames[0]?.competitor.name
                  ? `1: ${runnerNames[0].competitor.name}`
                  : "Runner 1"}
              </MenuItem>
              <MenuItem value={"010000000000000000"}>
                {runnerNames[1]?.competitor.name
                  ? `2: ${runnerNames[1].competitor.name}`
                  : "Runner 2"}
              </MenuItem>
              <MenuItem value={"001000000000000000"}>
                {runnerNames[2]?.competitor.name
                  ? `3: ${runnerNames[2].competitor.name}`
                  : "Runner 2"}
              </MenuItem>
              <MenuItem value={"000100000000000000"}>
                {runnerNames[3]?.competitor.name
                  ? `4: ${runnerNames[3].competitor.name}`
                  : "Runner 4"}
              </MenuItem>
              <MenuItem value={"000010000000000000"}>
                {runnerNames[4]?.competitor.name
                  ? `5: ${runnerNames[4].competitor.name}`
                  : "Runner 5"}
              </MenuItem>
              <MenuItem value={"000001000000000000"}>
                {runnerNames[5]?.competitor.name
                  ? `6: ${runnerNames[5].competitor.name}`
                  : "Runner 6"}
              </MenuItem>
              <MenuItem value={"000000100000000000"}>
                {runnerNames[6]?.competitor.name
                  ? `7: ${runnerNames[6].competitor.name}`
                  : "Runner 7"}
              </MenuItem>
              <MenuItem value={"000000010000000000"}>
                {runnerNames[7]?.competitor.name
                  ? `8: ${runnerNames[7].competitor.name}`
                  : "Runner 8"}
              </MenuItem>
              <MenuItem value={"000000001000000000"}>
                {runnerNames[8]?.competitor.name
                  ? `9: ${runnerNames[8].competitor.name}`
                  : "Runner 9"}
              </MenuItem>
              <MenuItem value={"000000000100000000"}>
                {runnerNames[9]?.competitor.name
                  ? `10: ${runnerNames[9].competitor.name}`
                  : "Runner 10"}
              </MenuItem>
              <MenuItem value={"000000000010000000"}>
                {runnerNames[10]?.competitor.name
                  ? `11: ${runnerNames[10].competitor.name}`
                  : "Runner 11"}
              </MenuItem>
              <MenuItem value={"000000000001000000"}>
                {runnerNames[11]?.competitor.name
                  ? `12: ${runnerNames[11].competitor.name}`
                  : "Runner 12"}
              </MenuItem>
              <MenuItem value={"000000000000100000"}>
                {runnerNames[12]?.competitor.name
                  ? `13: ${runnerNames[12].competitor.name}`
                  : "Runner 13"}
              </MenuItem>
              <MenuItem value={"000000000000010000"}>
                {runnerNames[13]?.competitor.name
                  ? `14: ${runnerNames[13].competitor.name}`
                  : "Runner 14"}
              </MenuItem>
              <MenuItem value={"000000000000001000"}>
                {runnerNames[14]?.competitor.name
                  ? `15: ${runnerNames[14].competitor.name}`
                  : "Runner 15"}
              </MenuItem>
              <MenuItem value={"000000000000000100"}>
                {runnerNames[15]?.competitor.name
                  ? `16: ${runnerNames[15].competitor.name}`
                  : "Runner 16"}
              </MenuItem>
              <MenuItem value={"000000000000000010"}>
                {runnerNames[16]?.competitor.name
                  ? `17: ${runnerNames[16].competitor.name}`
                  : "Runner 17"}
              </MenuItem>
              <MenuItem value={"000000000000000001"}>
                {runnerNames[17]?.competitor.name
                  ? `18: ${runnerNames[17].competitor.name}`
                  : "Runner 18"}
              </MenuItem>
            </Select>
          </FormControl>
          <CommentModal tip={tip} setTip={setTip} position="FirstComment" />
        </div>
        <div style={{ display: "flex" }}>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="2nd Place">2nd Place</InputLabel>
            <Select
              labelId="2nd Place"
              value={tip.Second}
              label="2nd Place"
              onChange={handleSecondChange}
            >
              <MenuItem value={"000000000000000000"}>-</MenuItem>
              <MenuItem value={"100000000000000000"}>
                {runnerNames[0]?.competitor.name
                  ? `1: ${runnerNames[0].competitor.name}`
                  : "Runner 1"}
              </MenuItem>
              <MenuItem value={"010000000000000000"}>
                {runnerNames[1]?.competitor.name
                  ? `2: ${runnerNames[1].competitor.name}`
                  : "Runner 2"}
              </MenuItem>
              <MenuItem value={"001000000000000000"}>
                {runnerNames[2]?.competitor.name
                  ? `3: ${runnerNames[2].competitor.name}`
                  : "Runner 2"}
              </MenuItem>
              <MenuItem value={"000100000000000000"}>
                {runnerNames[3]?.competitor.name
                  ? `4: ${runnerNames[3].competitor.name}`
                  : "Runner 4"}
              </MenuItem>
              <MenuItem value={"000010000000000000"}>
                {runnerNames[4]?.competitor.name
                  ? `5: ${runnerNames[4].competitor.name}`
                  : "Runner 5"}
              </MenuItem>
              <MenuItem value={"000001000000000000"}>
                {runnerNames[5]?.competitor.name
                  ? `6: ${runnerNames[5].competitor.name}`
                  : "Runner 6"}
              </MenuItem>
              <MenuItem value={"000000100000000000"}>
                {runnerNames[6]?.competitor.name
                  ? `7: ${runnerNames[6].competitor.name}`
                  : "Runner 7"}
              </MenuItem>
              <MenuItem value={"000000010000000000"}>
                {runnerNames[7]?.competitor.name
                  ? `8: ${runnerNames[7].competitor.name}`
                  : "Runner 8"}
              </MenuItem>
              <MenuItem value={"000000001000000000"}>
                {runnerNames[8]?.competitor.name
                  ? `9: ${runnerNames[8].competitor.name}`
                  : "Runner 9"}
              </MenuItem>
              <MenuItem value={"000000000100000000"}>
                {runnerNames[9]?.competitor.name
                  ? `10: ${runnerNames[9].competitor.name}`
                  : "Runner 10"}
              </MenuItem>
              <MenuItem value={"000000000010000000"}>
                {runnerNames[10]?.competitor.name
                  ? `11: ${runnerNames[10].competitor.name}`
                  : "Runner 11"}
              </MenuItem>
              <MenuItem value={"000000000001000000"}>
                {runnerNames[11]?.competitor.name
                  ? `12: ${runnerNames[11].competitor.name}`
                  : "Runner 12"}
              </MenuItem>
              <MenuItem value={"000000000000100000"}>
                {runnerNames[12]?.competitor.name
                  ? `13: ${runnerNames[12].competitor.name}`
                  : "Runner 13"}
              </MenuItem>
              <MenuItem value={"000000000000010000"}>
                {runnerNames[13]?.competitor.name
                  ? `14: ${runnerNames[13].competitor.name}`
                  : "Runner 14"}
              </MenuItem>
              <MenuItem value={"000000000000001000"}>
                {runnerNames[14]?.competitor.name
                  ? `15: ${runnerNames[14].competitor.name}`
                  : "Runner 15"}
              </MenuItem>
              <MenuItem value={"000000000000000100"}>
                {runnerNames[15]?.competitor.name
                  ? `16: ${runnerNames[15].competitor.name}`
                  : "Runner 16"}
              </MenuItem>
              <MenuItem value={"000000000000000010"}>
                {runnerNames[16]?.competitor.name
                  ? `17: ${runnerNames[16].competitor.name}`
                  : "Runner 17"}
              </MenuItem>
              <MenuItem value={"000000000000000001"}>
                {runnerNames[17]?.competitor.name
                  ? `18: ${runnerNames[17].competitor.name}`
                  : "Runner 18"}
              </MenuItem>
            </Select>
          </FormControl>
          <CommentModal tip={tip} setTip={setTip} position="SecondComment" />
        </div>
        <div style={{ display: "flex" }}>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="3rd Place">3rd Place</InputLabel>
            <Select
              labelId="3rd Place"
              value={tip.Third}
              label="3rd Place"
              onChange={handleThirdChange}
            >
              <MenuItem value={"000000000000000000"}>-</MenuItem>
              <MenuItem value={"100000000000000000"}>
                {runnerNames[0]?.competitor.name
                  ? `1: ${runnerNames[0].competitor.name}`
                  : "Runner 1"}
              </MenuItem>
              <MenuItem value={"010000000000000000"}>
                {runnerNames[1]?.competitor.name
                  ? `2: ${runnerNames[1].competitor.name}`
                  : "Runner 2"}
              </MenuItem>
              <MenuItem value={"001000000000000000"}>
                {runnerNames[2]?.competitor.name
                  ? `3: ${runnerNames[2].competitor.name}`
                  : "Runner 2"}
              </MenuItem>
              <MenuItem value={"000100000000000000"}>
                {runnerNames[3]?.competitor.name
                  ? `4: ${runnerNames[3].competitor.name}`
                  : "Runner 4"}
              </MenuItem>
              <MenuItem value={"000010000000000000"}>
                {runnerNames[4]?.competitor.name
                  ? `5: ${runnerNames[4].competitor.name}`
                  : "Runner 5"}
              </MenuItem>
              <MenuItem value={"000001000000000000"}>
                {runnerNames[5]?.competitor.name
                  ? `6: ${runnerNames[5].competitor.name}`
                  : "Runner 6"}
              </MenuItem>
              <MenuItem value={"000000100000000000"}>
                {runnerNames[6]?.competitor.name
                  ? `7: ${runnerNames[6].competitor.name}`
                  : "Runner 7"}
              </MenuItem>
              <MenuItem value={"000000010000000000"}>
                {runnerNames[7]?.competitor.name
                  ? `8: ${runnerNames[7].competitor.name}`
                  : "Runner 8"}
              </MenuItem>
              <MenuItem value={"000000001000000000"}>
                {runnerNames[8]?.competitor.name
                  ? `9: ${runnerNames[8].competitor.name}`
                  : "Runner 9"}
              </MenuItem>
              <MenuItem value={"000000000100000000"}>
                {runnerNames[9]?.competitor.name
                  ? `10: ${runnerNames[9].competitor.name}`
                  : "Runner 10"}
              </MenuItem>
              <MenuItem value={"000000000010000000"}>
                {runnerNames[10]?.competitor.name
                  ? `11: ${runnerNames[10].competitor.name}`
                  : "Runner 11"}
              </MenuItem>
              <MenuItem value={"000000000001000000"}>
                {runnerNames[11]?.competitor.name
                  ? `12: ${runnerNames[11].competitor.name}`
                  : "Runner 12"}
              </MenuItem>
              <MenuItem value={"000000000000100000"}>
                {runnerNames[12]?.competitor.name
                  ? `13: ${runnerNames[12].competitor.name}`
                  : "Runner 13"}
              </MenuItem>
              <MenuItem value={"000000000000010000"}>
                {runnerNames[13]?.competitor.name
                  ? `14: ${runnerNames[13].competitor.name}`
                  : "Runner 14"}
              </MenuItem>
              <MenuItem value={"000000000000001000"}>
                {runnerNames[14]?.competitor.name
                  ? `15: ${runnerNames[14].competitor.name}`
                  : "Runner 15"}
              </MenuItem>
              <MenuItem value={"000000000000000100"}>
                {runnerNames[15]?.competitor.name
                  ? `16: ${runnerNames[15].competitor.name}`
                  : "Runner 16"}
              </MenuItem>
              <MenuItem value={"000000000000000010"}>
                {runnerNames[16]?.competitor.name
                  ? `17: ${runnerNames[16].competitor.name}`
                  : "Runner 17"}
              </MenuItem>
              <MenuItem value={"000000000000000001"}>
                {runnerNames[17]?.competitor.name
                  ? `18: ${runnerNames[17].competitor.name}`
                  : "Runner 18"}
              </MenuItem>
            </Select>
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
        <CommentModal
          tip={tip}
          setTip={setTip}
          position="comments"
          eventComment
        />
      </div>
      <div>
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
      </div>
    </Paper>
  );
};

export default UmanityFormTwo;

import React, { Fragment, FC, useState } from "react";
import { Tip } from "../types/tips";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Fab from "@mui/material/Fab";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type OkGoodSelectorProps = {
  runnerNames: { competitor: { name: string; competitor_id: number } }[];
  tip: Tip;
  setTip: (state: Tip) => void;
};

const OkGoodSelector: FC<OkGoodSelectorProps> = ({
  runnerNames,
  tip,
  setTip,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleModal = () => setOpen((state) => !state);

  const OK = runnerNames.map((data, index) => {
    const baseString = "000000000000000000";
    let selectedString: string;

    const positiveString =
      baseString.substring(0, index) + "1" + baseString.substring(index + 1);
    const clickHandler = (e) => {
      if (e.target.checked) {
        selectedString = positiveString;
        setTip({ ...tip, ok: [...tip.ok, selectedString] });
      } else {
        setTip({
          ...tip,
          ok: tip.ok.filter((state) => state !== positiveString),
        });
      }
    };
    return (
      <FormControlLabel
        disabled={
          tip.good.includes(positiveString) ||
          tip.First === positiveString ||
          tip.Second === positiveString ||
          tip.Third === positiveString
        }
        key={data.competitor.competitor_id}
        control={
          <Checkbox
            checked={tip.ok.includes(positiveString)}
            onChange={clickHandler}
          />
        }
        label={data.competitor.name}
      />
    );
  });
  const GOOD = runnerNames.map((data, index) => {
    const baseString = "000000000000000000";
    let selectedString: string;

    const positiveString =
      baseString.substring(0, index) + "1" + baseString.substring(index + 1);
    const clickHandler = (e) => {
      if (e.target.checked) {
        selectedString = positiveString;
        setTip({ ...tip, good: [...tip.good, selectedString] });
      } else {
        setTip({
          ...tip,
          good: tip.good.filter((state) => state !== positiveString),
        });
      }
    };
    return (
      <FormControlLabel
        key={data.competitor.competitor_id}
        control={
          <Checkbox
            disabled={
              tip.ok.includes(positiveString) ||
              tip.First === positiveString ||
              tip.Second === positiveString ||
              tip.Third === positiveString
            }
            checked={tip.good.includes(positiveString)}
            onChange={clickHandler}
          />
        }
        label={data.competitor.name}
      />
    );
  });
  return (
    <Fragment>
      <Fab onClick={toggleModal} variant="extended">
        <ControlPointIcon sx={{ mr: 1 }} />
        Ok/Good Runners
      </Fab>
      <Modal open={open} onClose={toggleModal}>
        <div
          style={{
            width: "40%",
            minWidth: "550px",

            margin: "10vh auto",
          }}
        >
          <p onClick={toggleModal} className="closeButton">
            CLOSE
          </p>
          <Paper
            sx={{
              p: "20px",

              maxHeight: "600px",
              overflowY: "scroll",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <h2>Ok Runners</h2>
                <FormGroup>{OK}</FormGroup>
              </div>
              <div>
                <h2>Good Runners</h2>
                <FormGroup>{GOOD}</FormGroup>
              </div>
            </div>
          </Paper>
        </div>
      </Modal>
    </Fragment>
  );
};

export default OkGoodSelector;

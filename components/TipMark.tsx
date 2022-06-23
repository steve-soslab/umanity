import React, { Fragment, FC, useState } from "react";
import { Tip } from "../types/tips";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Fab from "@mui/material/Fab";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

const toolTipText = "◎ 1st Pick\n〇 2nd pick\n▲ 3rd Pick\n△ Good\n✖ OK";

type TipMarkProps = {
  runnerNames: {
    competitor: { name: string; competitor_id: number };
    handicap_weight: { kg: number; lb: number };
    jockey: { jockey_id: number; name: "string" };
    silk_uri: string;
  }[];
  tip: Tip;
  setTip: (state: Tip) => void;
};
type TipMarkElementProps = {
  runnerNames: {
    competitor: { name: string; competitor_id: number };
    handicap_weight: { kg: number; lb: number };
    jockey: { jockey_id: number; name: "string" };
    silk_uri: string;
  };
  tip: Tip;
  setTip: (state: Tip) => void;
  index: number;
};

const TipMarkElement: FC<TipMarkElementProps> = ({
  runnerNames,
  tip,
  setTip,
  index,
}) => {
  const header = `${index + 1}. ${runnerNames.competitor.name}`;
  const changeHandler = (event) => {
    return setTip({
      ...tip,
      tipMark: { ...tip.tipMark, [index + 1]: event.target.value },
    });
  };
  const TipMarkValues = Object.values(tip.tipMark);
  const TipMarkFirst = TipMarkValues.includes("◎");
  const TipMarkSecond = TipMarkValues.includes("〇");
  const TipMarkThird = TipMarkValues.includes("▲");
  const captionStyle = {
    fontSize: "8px",
    margin: 0,
  };
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #808080",
        padding: "10px",
        marginBottom: "10px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <Image
          alt={`${runnerNames.competitor.name}'s silk`}
          src={runnerNames.silk_uri}
          height={20}
          width={20}
        />
        <p style={{ margin: "0 0 0 10px" }}>{header}</p>
      </div>
      <div
        style={{
          width: "700px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p style={captionStyle}>W: {runnerNames.handicap_weight.kg}Kg</p>
          <p style={captionStyle}>J: {runnerNames.jockey.name}</p>
        </div>
        <div style={{ display: "flex" }}>
          <Tooltip placement="top" title={toolTipText}>
            <FormControl sx={{ width: "150px", mr: 2 }}>
              <InputLabel>Tip Mark</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tip.tipMark[index + 1]}
                label="Tip Mark"
                onChange={changeHandler}
              >
                <MenuItem disabled={TipMarkFirst} value="◎">
                  ◎
                </MenuItem>
                <MenuItem disabled={TipMarkSecond} value="〇">
                  〇
                </MenuItem>
                <MenuItem disabled={TipMarkThird} value="▲">
                  ▲
                </MenuItem>
                <MenuItem value="△">△</MenuItem>
                <MenuItem value="✖">✖</MenuItem>
                <MenuItem value="">-</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
          <TextField
            value={tip.eventComments[index + 1]}
            onChange={(event) =>
              setTip({
                ...tip,
                eventComments: {
                  ...tip.eventComments,
                  [index + 1]: event.target.value,
                },
              })
            }
            placeholder="Runner Comments"
            sx={{ width: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

const TipMark: FC<TipMarkProps> = ({ runnerNames, tip, setTip }) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleModal = () => setOpen((state) => !state);
  const tipOfTheDaHandler = (event) => {
    if (event.target.checked) {
      setTip({ ...tip, tipOfTheDay: 1 });
    } else {
      setTip({ ...tip, tipOfTheDay: 0 });
    }
  };
  const runnerMapped = runnerNames.map((data, index) => (
    <TipMarkElement
      key={data.competitor.competitor_id}
      runnerNames={data}
      tip={tip}
      setTip={setTip}
      index={index}
    />
  ));

  return (
    <Fragment>
      <Fab
        sx={{ fontSize: "12px", width: "22%" }}
        onClick={toggleModal}
        variant="extended"
      >
        <ControlPointIcon sx={{ mr: 1 }} />
        Tip Mark
      </Fab>
      <Modal open={open} onClose={toggleModal}>
        <div
          style={{
            width: "40%",
            minWidth: "1000px",

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Tip Marks</h2>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <TextField
                  label="Value"
                  type="number"
                  value={tip.value}
                  onChange={(e) =>
                    setTip({ ...tip, value: parseInt(e.target.value) })
                  }
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={tipOfTheDaHandler}
                        checked={tip.tipOfTheDay === 1}
                      />
                    }
                    label="Tip of the day"
                  />
                </FormGroup>
              </div>
            </div>

            {runnerMapped}
            <TextField
              label="Event Comment"
              value={tip.eventComments.event}
              fullWidth
              onChange={(event) =>
                setTip({
                  ...tip,
                  eventComments: {
                    ...tip.eventComments,
                    event: event.target.value,
                  },
                })
              }
            />
          </Paper>
        </div>
      </Modal>
    </Fragment>
  );
};

export default TipMark;

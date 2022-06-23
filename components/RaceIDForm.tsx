import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { raceSelectorForm } from "../types/raceSelectorForm";

type RaceIdProps = {
  raceSelectorForm: raceSelectorForm;
  setRaceSelectorForm: (state: raceSelectorForm) => void;
  setRunnerNames: any;
  setStep: (step: number) => void;
};

const RaceIDForm: React.FC<RaceIdProps> = ({
  setRunnerNames,
  setStep,
  raceSelectorForm,
  setRaceSelectorForm,
}) => {
  const [event, setEvent] = useState(null);

  const getRaceNumbers = async () => {
    if (raceSelectorForm.date === "") {
      return;
    }
    const data = await fetch(
      `https://dw.betia.co/api/meetings?filters[meeting_date]=${raceSelectorForm.date}&filters[venue_types]=THOROUGHBRED&filters[countries]=JPN`
    );
    const res = await data.json();

    setRaceSelectorForm({ ...raceSelectorForm, meeting: res.data.meetings });
  };

  const eventHandler = (e) => {
    setRaceSelectorForm({
      ...raceSelectorForm,
      venueName: raceSelectorForm.meeting[e.target.value].name,
    });
    setEvent(e.target.value);
  };

  const raceNumberHandler = (e) => {
    setRaceSelectorForm({
      ...raceSelectorForm,
      eventNumber: e.target.value.event_id,
      raceNumber: e.target.value.number,
    });
  };

  const SubmitHandler = async () => {
    const data = await fetch(
      `https://dw.betia.co/api/events/${raceSelectorForm.eventNumber}`
    );
    const res = await data.json();

    setRunnerNames(
      Object.values(
        res.data.events[raceSelectorForm.eventNumber].event_competitors
      )
    );
    setStep(1);
  };

  useEffect(() => {
    getRaceNumbers();
  }, [raceSelectorForm.date]);

  return (
    <Paper className="form">
      <TextField
        value={raceSelectorForm.date}
        onChange={(e) =>
          setRaceSelectorForm({ ...raceSelectorForm, date: e.target.value })
        }
        fullWidth
        type="date"
        sx={{ mb: 2 }}
      />
      {raceSelectorForm.meeting && (
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="Meeting-ID">Meeting</InputLabel>
          <Select onChange={eventHandler} labelId="Meeting-ID" label="Meeting">
            {Object.values(raceSelectorForm.meeting).map((data: any) => (
              <MenuItem
                key={data.meeting_id}
                value={data.meeting_id}
              >{`${data.name}: ${data.meeting_id}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {event && (
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="Event-ID">Race Number</InputLabel>
          <Select
            onChange={raceNumberHandler}
            labelId="Event-ID"
            label="Race Number"
          >
            {Object.values(raceSelectorForm.meeting[event].events).map(
              (data: any) => (
                <MenuItem
                  key={data.number}
                  value={data}
                >{`Race Number: ${data.number}`}</MenuItem>
              )
            )}
          </Select>
        </FormControl>
      )}
      {raceSelectorForm.raceNumber && (
        <Button onClick={SubmitHandler} fullWidth variant="contained">
          Submit
        </Button>
      )}
    </Paper>
  );
};

export default RaceIDForm;

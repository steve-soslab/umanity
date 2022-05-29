import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const RaceIDForm = ({ setRunnerNames, setStep }) => {
  const [date, setDate] = useState<string>("");
  const [meeting, setMeeting] = useState(null);
  const [event, setEvent] = useState(null);
  const [raceNumber, setRaceNumber] = useState(null);
  const [raceInfo, setRaceInfo] = useState(null);

  const getRaceNumbers = async () => {
    if (date === "") {
      return;
    }
    const data = await fetch(
      `https://dw.betia.co/api/meetings?filters[meeting_date]=${date}&filters[venue_types]=THOROUGHBRED&filters[countries]=JPN`
    );
    const res = await data.json();

    setMeeting(res.data.meetings);
  };

  const getEventInfo = async () => {};

  const eventHandler = (e) => {
    setEvent(e.target.value);
  };

  const raceNumberHandler = (e) => {
    setRaceNumber(e.target.value);
  };

  const SubmitHandler = async () => {
    const data = await fetch(`https://dw.betia.co/api/events/${raceNumber}`);
    const res = await data.json();
    console.log(Object.values(res.data.events[raceNumber].event_competitors));
    setRunnerNames(
      Object.values(res.data.events[raceNumber].event_competitors)
    );
    setStep(1);
  };

  useEffect(() => {
    getRaceNumbers();
  }, [date]);

  useEffect(() => {
    getEventInfo();
  }, [event]);

  return (
    <Paper className="form">
      <TextField
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        type="date"
        sx={{ mb: 2 }}
      />
      {meeting && (
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="Meeting-ID">Meeting</InputLabel>
          <Select onChange={eventHandler} labelId="Meeting-ID" label="Meeting">
            {Object.values(meeting).map((data: any) => (
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
          <InputLabel id="Event-ID">Meeting</InputLabel>
          <Select onChange={raceNumberHandler} labelId="Event-ID" label="Event">
            {Object.values(meeting[event].events).map((data: any) => (
              <MenuItem
                key={data.number}
                value={data.event_id}
              >{`Race Number: ${data.number}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {raceNumber && (
        <Button onClick={SubmitHandler} fullWidth variant="contained">
          Submit
        </Button>
      )}
    </Paper>
  );
};

export default RaceIDForm;

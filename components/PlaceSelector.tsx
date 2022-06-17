import React, { FC } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Tip } from "../types/tips";
import Select, { SelectChangeEvent } from "@mui/material/Select";
type PlaceSelectorProps = {
  runnerNames: { competitor: { name: string; competitor_id: number } }[];
  tip: Tip;
  setTip: (state: Tip) => void;
  first?: boolean;
  second?: boolean;
  third?: boolean;
};

const PlaceSelector: FC<PlaceSelectorProps> = ({
  runnerNames,
  tip,
  setTip,
  first,
  second,
  third,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const newTip = JSON.parse(event.target.value);
    if (first) {
      return setTip({ ...tip, First: newTip.id, FirstName: newTip.name });
    }
    if (second) {
      setTip({ ...tip, Second: newTip.id, SecondName: newTip.name });
    }
    if (third) {
      setTip({ ...tip, Third: newTip.id, ThirdName: newTip.name });
    }
  };

  const valueCalc = () => {
    if (first) {
      return JSON.stringify({ id: tip.First, name: tip.FirstName });
    }
    if (second) {
      return JSON.stringify({ id: tip.Second, name: tip.SecondName });
    }
    if (third) {
      return JSON.stringify({ id: tip.Third, name: tip.ThirdName });
    }
  };
  const value = valueCalc();
  const labelCalc = () => {
    if (first) {
      return "1st Place";
    }
    if (second) {
      return "2nd Place";
    }
    if (third) {
      return "3rd Place";
    }
  };
  const label = labelCalc();

  const runnerMap = runnerNames.map((data, index) => {
    const baseString = "000000000000000000";

    const positiveString =
      baseString.substring(0, index) + "1" + baseString.substring(index + 1);
    const disabledCalc = () => {
      if (first) {
        if (tip.Second === positiveString) {
          return true;
        }
        if (tip.Third === positiveString) {
          return true;
        }
        return false;
      }
      if (second) {
        if (tip.First === positiveString) {
          return true;
        }
        if (tip.Third === positiveString) {
          return true;
        }
        return false;
      }
      if (third) {
        if (tip.Second === positiveString) {
          return true;
        }
        if (tip.First === positiveString) {
          return true;
        }
        return false;
      }
    };
    const disabledState = disabledCalc();
    const returnObj = { id: positiveString, name: data.competitor.name };
    const StringObj = JSON.stringify(returnObj);
    return (
      <MenuItem
        disabled={
          tip.good.includes(positiveString) ||
          tip.good.includes(positiveString) ||
          disabledState
        }
        value={StringObj}
        key={data.competitor.competitor_id}
      >
        {`${index + 1}: ${data.competitor.name}`}
      </MenuItem>
    );
  });
  return (
    <Select label={label} value={value} onChange={handleChange}>
      <MenuItem value="000000000000000000">-</MenuItem>
      {runnerMap}
    </Select>
  );
};

export default PlaceSelector;

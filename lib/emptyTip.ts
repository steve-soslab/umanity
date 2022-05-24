import { Tip } from "../types/tips";

export const emptyTip = () => {
  const newTip: Tip = {
    UUID: new Date().getTime(),
    RaceID: "",
    formula: 1,
    method: 1,
    nagoshi: 0,
    multi: 0,
    First: "100000000000000000",
    Second: "100000000000000000",
    Third: "100000000000000000",
    amount: 0,
  };
  return newTip;
};

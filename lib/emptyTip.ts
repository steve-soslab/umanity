import { Tip } from "../types/tips";

/**
 * This helps us to create an empty tip for the tip creation form and reset the values after submitting the form to Dynamo
 * @returns Empty tip state
 */

export const emptyTip = () => {
  const newTip: Tip = {
    UUID: new Date().getTime(),
    RaceID: "",
    formula: 1,
    method: 1,
    banker: 0,
    multi: 0,
    First: "000000000000000000",
    FirstComment: "",
    Second: "000000000000000000",
    SecondComment: "",
    Third: "000000000000000000",
    ThirdComment: "",
    comments: "",
    amount: 0,
    confirmationFlag: 0,
    tipOfTheDay: 0,
    ok: [],
    good: [],
    sub: "",
  };
  return newTip;
};

import { Tip } from "../types/tips";

const generateComment = (tip: Tip) => {
  let csv = `${tip.RaceID},`;
  tip.First.split("").forEach((c, index) => {
    let symbol = '" "';
    if (c === "1") {
      symbol = '" ◎ "';
    }

    if (tip.Second[index] === "1") {
      symbol = '" 〇 "';
    }
    if (tip.Third[index] === "1") {
      symbol = '" △ "';
    }
    csv += symbol + "," + '" "' + ",";
  });
  return `${csv}0,0,0\n`;
};

export default generateComment;

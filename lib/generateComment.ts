import { Tip } from "../types/tips";

const generateComment = (tip: Tip) => {
  let csv = `${tip.RaceID},`;
  tip.First.split("").forEach((c, index) => {
    let symbol = '"","",';
    if (c === "1") {
      symbol = `"◎","${tip.FirstComment}",`;
    }

    if (tip.Second[index] === "1") {
      symbol = `"〇","${tip.SecondComment}",`;
    }
    if (tip.Third[index] === "1") {
      symbol = `"▲","${tip.ThirdComment}",`;
    }
    csv += symbol;
  });
  return `${csv}"${tip.comments}",${tip.amount},${tip.confirmationFlag},${tip.tipOfTheDay}\n`;
};

export default generateComment;

import { Tip } from "../types/tips";

/**
 * This generates a single CSV line for the comments csv which is one of the 2 CSV's downloaded when you click Generate .CSV
 * @param tip The tip that you want to generate a csv for
 * @returns Single comment line for the CSV
 */

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
    if (symbol === '"","",') {
      const baseString = "000000000000000000";
      const positiveString =
        baseString.substring(0, index) + "1" + baseString.substring(index + 1);

      if (tip.ok.includes(positiveString)) {
        symbol = '"✖","",';
      }
      if (tip.good.includes(positiveString)) {
        symbol = '"△","",';
      }
      csv += symbol;
    } else {
      csv += symbol;
    }
  });
  return `${csv}"${tip.comments}",${tip.amount},${tip.confirmationFlag},${tip.tipOfTheDay}\n`;
};

export default generateComment;

import { Tip } from "../types/tips";
const generateCsv = (tip: Tip) => {
  return `${tip.RaceID},${tip.formula},${tip.method},${tip.nagoshi},${tip.multi},${tip.First},${tip.Second},${tip.Third},${tip.amount}\n`;
};

export default generateCsv;

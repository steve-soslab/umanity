import { Tip } from "../types/tips";

/**
 * This generates a single CSV line for the tip csv which is one of the 2 CSV's downloaded when you click Generate .CSV
 * @param tip The tip that you want to generate a csv for
 * @returns
 */

const generateCsv = (tip: Tip) => {
  return `${tip.RaceID},${tip.formula},${tip.method},${tip.banker},${tip.multi},${tip.First},${tip.Second},${tip.Third},${tip.amount}\n`;
};

export default generateCsv;

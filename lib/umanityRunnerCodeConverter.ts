/**
 * Converts the Umanitys runner code into something user friendly
 * @param code Umanity's unique runner code, eg "100000000000000000"
 * @returns "Runner 1"
 */

const umanityRunnerCodeConverter = (code: string) => {
  let uCode = "-";
  code.split("").forEach((c, index) => {
    if (c === "1") {
      uCode = JSON.stringify(index + 1);
    }
  });
  return uCode === "-" ? "-" : `Runner ${uCode}`;
};

export default umanityRunnerCodeConverter;

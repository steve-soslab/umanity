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

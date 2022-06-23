const methodConverter = (bet: number) => {
  if (bet === 1) return "NORMAL";
  if (bet === 2) return "FORMATION";
  if (bet === 3) return "BOX";
  if (bet === 4) return "BANKER";
};

export default methodConverter;

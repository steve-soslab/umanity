const bankerConverter = (bet: number) => {
  if (bet === 0) return "-";
  if (bet === 1) return "1st";
  if (bet === 2) return "2nd";
  if (bet === 3) return "3rd";
  if (bet === 4) return "1 AXIS";
  if (bet === 5) return "2nd AXIS";
  if (bet === 6) return "1st and 2nd";
  if (bet === 7) return "1st and 3rd";
  if (bet === 8) return "2nd and 3rd";
};

export default bankerConverter;

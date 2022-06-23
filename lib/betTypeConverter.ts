const betTypeConverter = (bet: number) => {
  if (bet === 1) return "WIN";
  if (bet === 2) return "PLACE";
  if (bet === 3) return "BRACKET QUINELLA";
  if (bet === 4) return "QUINELLA";
  if (bet === 5) return "QUINELLA PLACE";
  if (bet === 6) return "EXACTA";
  if (bet === 7) return "TRIO";
  if (bet === 8) return "TRIFECTA";
};

export default betTypeConverter;

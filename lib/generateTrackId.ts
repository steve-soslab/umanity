const generateTrackId = (venueName) => {
  let res = { venue: "", error: false };
  if (venueName === "Tokyo") {
    res.venue = "05021";
    return res;
  }
  if (venueName === "Niigata") {
    res.venue = "04010";
    return res;
  }

  if (venueName === "Chukyo") {
    res.venue = "07030";
    return res;
  }
  res.error = true;
  return res;
};

export default generateTrackId;

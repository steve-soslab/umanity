import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const venueConverter = (venue) => {
  if (venue === "Tokyo") {
    return "Tok";
  }
  if (venue === "Niigata") {
    return "Nii";
  }
  if (venue === "Chukyo") {
    return "Chu";
  }
  return "error";
};

const umanityDateGenerator = (date: string) => {
  const currentDate = new Date(date);
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  if (
    JSON.stringify(currentDay).length === 2 &&
    JSON.stringify(currentMonth).length === 2
  ) {
    return `${currentYear}/${currentMonth}/${currentDay}`;
  }
  if (JSON.stringify(currentDay).length === 1) {
    return `${currentYear}/${currentMonth}/0${currentDay}`;
  }
  if (JSON.stringify(currentMonth).length === 1) {
    return `${currentYear}/0${currentMonth}/${currentDay}`;
  }
};
const umanityDateChecker = (date: string) => {
  const currentDate = new Date(date);
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  if (
    JSON.stringify(currentDay).length === 2 &&
    JSON.stringify(currentMonth).length === 2
  ) {
    return `${currentYear}${currentMonth}${currentDay}`;
  }
  if (JSON.stringify(currentDay).length === 1) {
    return `${currentYear}${currentMonth}0${currentDay}`;
  }
  if (JSON.stringify(currentMonth).length === 1) {
    return `${currentYear}0${currentMonth}${currentDay}`;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { raceDate } = req.body;
  const { venue } = req.body;
  const { raceNumber } = req.body;

  const formattedVenue = venueConverter(venue);
  if (formattedVenue === "error") {
    return res.status(501).json({ error: "Venue isn't mapped" });
  }

  const formattedDate = umanityDateGenerator(raceDate);

  await axios(
    `https://umanity.jp/en/racedata/race_5.php?date=${formattedDate}`
  ).then(async (response) => {
    const html = response.data;
    let $ = cheerio.load(html);
    const text = $(`.race_racenum:contains("${formattedVenue}")`).attr("href");
    const umanityURL = text.split("=")[1];
    const first15Digits = umanityURL.slice(0, 15);
    const first14Digits = umanityURL.slice(0, 14);
    const dateChecker = umanityURL.slice(0, 8);
    const correctDate = umanityDateChecker(raceDate);

    if (dateChecker === correctDate) {
      if (raceNumber.toString().length === 1) {
        res.status(200).json({ message: `${first15Digits}${raceNumber}` });
      } else {
        res.status(200).json({ message: `${first14Digits}${raceNumber}` });
      }
    } else {
      res.status(200).json({ error: "Race not found on this date" });
    }
  });
}

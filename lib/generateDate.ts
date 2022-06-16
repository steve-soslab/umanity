/**
 * Mostly used for formatting the date title in the CSV downloaded
 * @returns A formatted date
 */

const generateDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return `${day}-${month}-${year}`;
};

export default generateDate;

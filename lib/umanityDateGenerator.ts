const umanityDateGenerator = (date: string) => {
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

export default umanityDateGenerator;

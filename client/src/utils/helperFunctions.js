export const convertFromBooleanToDisplay = (display) => {
  return display ? "block" : "none";
};
export const convertDateToISOString = (day) => {
  const date = day.getDate();
  const month = day.getMonth();
  const year = day.getFullYear();

  let monthString = `${month + 1}`;
  if (monthString.length === 1) monthString = `0${monthString}`;
  let dateString = `${date}`;
  if (dateString.length === 1) dateString = `0${dateString}`;

  return `${year}-${monthString}-${dateString}`;
};

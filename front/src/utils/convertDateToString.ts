export const convertDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year} оны ${month + 1}-р сарын ${day}`;
};

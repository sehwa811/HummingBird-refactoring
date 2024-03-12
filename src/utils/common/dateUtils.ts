export const getWeekday = (dateString: string): string => {
  const weekdays = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
  const date = new Date(dateString);
  return weekdays[date.getDay()];
};

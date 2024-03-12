export function ChangeDateFormat(date: string): string {
  const realDate = new Date(date);
  const year = realDate.getFullYear();
  const month = realDate.getMonth() + 1;
  const dateNumber = realDate.getDate();
  const displayDate = year + "." + month + "." + dateNumber;
  return displayDate;
}

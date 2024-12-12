import { formatISO, isMatch, isMonday, previousMonday } from "date-fns";

export const getCurrentWeekDates = (
  date: string | Date = new Date(),
): [string, string] => {
  const today =
    date instanceof Date
      ? formatISO(new Date(), { representation: "date" })
      : date;

  if (!isMatch(today, "yyyy-mm-dd")) {
    throw new Error(`Invalid date format. Expected format is "YYYY-MM-DD"`);
  }

  const monday = isMonday(today)
    ? today
    : formatISO(previousMonday(today), {
        representation: "date",
      });

  return [monday, today];
};

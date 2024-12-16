import { getMeteors } from "../repositories/meteors.repository.ts";
import { Meteor } from "../types/meteors.ts";
import { getCurrentWeekDates } from "../utils/parsers/parseDate.ts";
import { filterMeteors } from "../utils/parsers/parseMeteors.ts";

export const getReducedMeteors = async (
  date?: string,
  count?: string,
  isDangerous?: string,
): Promise<Meteor[]> => {
  const [startDate, endDate] = getCurrentWeekDates(date);

  const data = await getMeteors(startDate, endDate);
  const parsedMeteors = filterMeteors(data, count, isDangerous);

  return parsedMeteors;
};

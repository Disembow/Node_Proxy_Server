import { getMeteors } from "../repositories/meteors.repository.js";
import { getCurrentWeekDates } from "../utils/parseDate.js";
import { filterMeteors } from "../utils/parseMeteors.js";

export const getReducedMeteors = async (date, count, isDangerous) => {
  const [startDate, endDate] = getCurrentWeekDates(date);

  const data = await getMeteors(startDate, endDate);
  const parsedMeteors = filterMeteors(data, count, isDangerous);

  return parsedMeteors;
};

import { getMeteors } from "../repositories/meteors.repository.js";
import { parseMeteors } from "../utils/parseMeteors.js";

export const getReducedMeteors = async (startDate, endDate) => {
  const data = await getMeteors(startDate, endDate);
  const parsedMeteors = parseMeteors(data);

  return parsedMeteors;
};

import { getReducedMeteors } from "../services/meteors.service.js";

const DEFAULT_START_DATE = "2024-11-17";
const DEFAULT_END_DATE = "2024-11-18";

export const getMeteors = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const response = await getReducedMeteors(
      startDate || DEFAULT_START_DATE,
      endDate || DEFAULT_END_DATE
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

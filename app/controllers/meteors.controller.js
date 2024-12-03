import { getReducedMeteors } from "../services/meteors.service.js";

export const getMeteors = async (req, res, next) => {
  try {
    const { date, count, isDangerous } = req.query;

    const response = await getReducedMeteors(date, count, isDangerous);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

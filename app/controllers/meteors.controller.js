import config from "../config/config.js";
import { getReducedMeteors } from "../services/meteors.service.js";

const { START_DATE, END_DATE } = config;

export const getMeteors = async (req, res, next) => {
  try {
    const response = await getReducedMeteors(START_DATE, END_DATE);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

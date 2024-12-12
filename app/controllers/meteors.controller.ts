import { NextFunction, Request, Response } from "express";
import { getReducedMeteors } from "../services/meteors.service.ts";

interface MeteorsQuery {
  date?: string;
  count?: string;
  isDangerous?: string;
}

export const getMeteors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { date, count, isDangerous }: MeteorsQuery = req.query;

    const response = await getReducedMeteors(date, count, isDangerous);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getMeteorsView = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { date, count, isDangerous }: MeteorsQuery = req.query;

    const response = await getReducedMeteors(date, count, isDangerous);

    res.render("meteors.njk", { meteors: response });
  } catch (error) {
    next(error);
  }
};

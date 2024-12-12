import { NextFunction, Request, Response } from "express";
import { fetchRoverImage } from "../services/rovers.service.ts";

export const getRoverFormView = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.render("roverForm.njk");
  } catch (error) {
    next(error);
  }
};

export const getRoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { apikey, sol } = req.body;
    const photo = await fetchRoverImage(apikey, sol || undefined);

    res.json({ photo });
  } catch (error) {
    next(error);
  }
};

export const getRoverImageView = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { apikey, sol } = req.body;
    const photo = await fetchRoverImage(apikey, sol);

    if (photo) {
      res.render("roverImage.njk", { photo });
    } else {
      res.render("notFoundPage.njk");
    }
  } catch (error) {
    next(error);
  }
};

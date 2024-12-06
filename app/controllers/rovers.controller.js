import { fetchRoverImage } from "../services/rovers.service.js";

export const getRoverFormView = async (req, res, next) => {
  try {
    res.render("roverForm.njk");
  } catch (error) {
    next(error);
  }
};

export const getRoverImage = async (req, res, next) => {
  try {
    const { apikey, sol } = req.body;
    const photo = await fetchRoverImage(apikey, sol || undefined);

    return res.json({ photo });
  } catch (error) {
    next(error);
  }
};

export const getRoverImageView = async (req, res, next) => {
  try {
    const { apikey, sol } = req.body;
    const photo = await fetchRoverImage(apikey, sol || undefined);

    if (photo) {
      res.render("roverImage.njk", { photo });
    } else {
      res.render("notFoundPage.njk");
    }
  } catch (error) {
    next(error);
  }
};

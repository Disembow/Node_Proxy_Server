import { fetchRoverImage } from "../services/rovers.service.js";

export const getRoverImage = async (req, res, next) => {
  try {
    const { apikey, sol } = req.body;
    const photo = await fetchRoverImage(apikey, sol);

    return res.json({ photo });
  } catch (error) {
    next(error);
  }
};

import { fetchRoverImage } from "../services/rovers.service.js";

export const getRoverImage = async (req, res, next) => {
  try {
    const { apikey } = req.body;
    const photo = await fetchRoverImage(apikey);

    return res.json({ photo });
  } catch (error) {
    next(error);
  }
};

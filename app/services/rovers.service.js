import { DEFAULT_SOL } from "../constants/queryConstants.js";
import { getRoverImage } from "../repositories/rovers.repository.js";
import { parseRecentImage } from "../utils/parsers/parseRecentImage.js";

export const fetchRoverImage = async (apikey, sol) => {
  const normalizedSol = sol?.trim() || DEFAULT_SOL;
  const data = await getRoverImage(apikey, normalizedSol);
  const image = parseRecentImage(data.data.photos);

  return image?.img_src || null;
};

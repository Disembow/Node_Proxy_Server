import { getRoverImage } from "../repositories/rovers.repository.js";
import { parseRecentImage } from "../utils/parseRecentImage.js";

export const fetchRoverImage = async (apikey) => {
  const data = await getRoverImage(apikey);
  const image = parseRecentImage(data.data.photos);

  return image.img_src;
};

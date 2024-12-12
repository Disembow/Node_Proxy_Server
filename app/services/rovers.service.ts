import { DEFAULT_SOL } from "../constants/queryConstants.ts";
import { getRoverImage } from "../repositories/rovers.repository.ts";
import { parseRecentImage } from "../utils/parsers/parseRecentImage.ts";

export const fetchRoverImage = async (
  apikey: string,
  sol: string,
): Promise<string | null> => {
  const normalizedSol = sol?.trim() || DEFAULT_SOL;
  const data = await getRoverImage(apikey, normalizedSol);
  const image = parseRecentImage(data.data.photos);

  return image?.img_src || null;
};

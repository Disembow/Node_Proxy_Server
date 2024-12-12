import { RoverImage } from "app/types/rover.ts";

export const parseRecentImage = (data: RoverImage[]) => {
  if (!data || data.length === 0) {
    return null;
  }

  return data.sort(
    (a, b) =>
      new Date(b.earth_date).getTime() - new Date(a.earth_date).getTime(),
  )[0];
};

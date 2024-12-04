export const parseRecentImage = (data) => {
  if (!data || data.length === 0) {
    return null;
  }

  let result, lastDate;

  data.forEach((item) => {
    if (!lastDate) {
      lastDate = new Date(item.earth_date);
      result = item;
    }

    if (lastDate < new Date(item.earth_date)) result = item;
  });

  return result;
};

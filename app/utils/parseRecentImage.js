export const parseRecentImage = (data) => {
  if (!data || data.length === 0) {
    return null;
  }

  return data.sort(
    (a, b) => new Date(b.earth_date) - new Date(a.earth_date)
  )[0];
};

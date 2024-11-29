import config from "../config/config.js";

export const getApiUrl = (startDate, endDate) => {
  const { BASE_API_URL, API_KEY } = config;

  const requestUrl = `${BASE_API_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

  return requestUrl;
};

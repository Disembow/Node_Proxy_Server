import axios from "axios";
import config from "../config/config.ts";
import { getMeteors } from "./meteors.repository.ts";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Meteors Repository should", () => {
  const { BASE_API_URL, API_KEY } = config;
  const startDate = "2024-12-01";
  const endDate = "2024-12-07";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetch and return data", async () => {
    // Arrange
    const mockResponse = {
      data: {
        near_earth_objects: {
          "2024-12-01": [{ id: "1", name: "Asteroid 1" }],
          "2024-12-02": [{ id: "2", name: "Asteroid 2" }],
        },
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const expectedUrl = `${BASE_API_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    // Act
    const result = await getMeteors(startDate, endDate);

    // Assert
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse.data.near_earth_objects);
  });

  it("throw an error if the API request fails", async () => {
    // Arrange
    const errorMessage = "Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    // Act
    const act = () => getMeteors(startDate, endDate);

    // Assert
    await expect(act).rejects.toThrow(errorMessage);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});

import axios from "axios";
import config from "../config/config.ts";
import { getRoverImage } from "./rovers.repository.ts";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Rovers Repository should", () => {
  const { BASE_API_URL } = config;
  const mockApiKey = "test-api-key";
  const mockSol = 1000;
  const mockCamera = "fhaz";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetch and return data", async () => {
    // Arrange
    const mockResponse = { data: { photos: [{ id: 1, img_src: "url1" }] } };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const expectedUrl = `${BASE_API_URL}/mars-photos/api/v1/rovers/curiosity/photos`;
    const expectedParams = {
      sol: mockSol,
      camera: mockCamera,
      api_key: mockApiKey,
    };

    // Act
    const result = await getRoverImage(mockApiKey, mockSol);

    // Assert
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, {
      params: expectedParams,
    });
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });

  it("throw an error if the API request fails", async () => {
    // Arrange
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(getRoverImage(mockApiKey, mockSol)).rejects.toThrow(
      errorMessage,
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});

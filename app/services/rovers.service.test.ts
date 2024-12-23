import { AxiosResponse } from "axios";
import { DEFAULT_SOL } from "../constants/queryConstants.ts";
import { getRoverImage } from "../repositories/rovers.repository.ts";
import { getMockResponse, mockNormalizedSol, mockSol } from "../tests/mocks.ts";
import { parseRecentImage } from "../utils/parsers/parseRecentImage.ts";
import { fetchRoverImage } from "./rovers.service.ts";

jest.mock("../repositories/rovers.repository");
jest.mock("../utils/parsers/parseRecentImage");

const mockedGetRoverImage = getRoverImage as jest.MockedFunction<
  typeof getRoverImage
>;
const mockedParseRecentImage = parseRecentImage as jest.MockedFunction<
  typeof parseRecentImage
>;

describe("Rovers Service should", () => {
  const mockApiKey = "test-api-key";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetch and parse the rover image with the given sol", async () => {
    // Arrange
    const mockParsedImage = { id: 1, img_src: "img_src", earth_date: "date" };
    const mockResponse: AxiosResponse = getMockResponse([mockParsedImage]);

    mockedGetRoverImage.mockResolvedValue(mockResponse);
    mockedParseRecentImage.mockReturnValue(mockParsedImage);

    // Act
    const result = await fetchRoverImage(mockApiKey, mockSol);

    // Assert
    expect(mockedGetRoverImage).toHaveBeenCalledWith(
      mockApiKey,
      mockNormalizedSol,
    );
    expect(mockedParseRecentImage).toHaveBeenCalledWith(
      mockResponse.data.photos,
    );
    expect(result).toBe("img_src");
  });

  it("use DEFAULT_SOL if sol is undefined or empty", async () => {
    // Arrange
    const mockResponse = getMockResponse([]);

    mockedGetRoverImage.mockResolvedValue(mockResponse);
    mockedParseRecentImage.mockReturnValue(null);

    // Act
    const result = await fetchRoverImage(mockApiKey, "");

    // Assert
    expect(mockedGetRoverImage).toHaveBeenCalledWith(mockApiKey, DEFAULT_SOL);
    expect(mockedParseRecentImage).toHaveBeenCalledWith([]);
    expect(result).toBeNull();
  });

  it("return null if no image is found", async () => {
    // Arrange
    const mockResponse = getMockResponse([]);

    mockedGetRoverImage.mockResolvedValue(mockResponse);
    mockedParseRecentImage.mockReturnValue(null);

    // Act
    const result = await fetchRoverImage(mockApiKey, mockSol);

    // Assert
    expect(mockedGetRoverImage).toHaveBeenCalledWith(mockApiKey, mockSol);
    expect(mockedParseRecentImage).toHaveBeenCalledWith([]);
    expect(result).toBeNull();
  });

  it("propagate errors from getRoverImage", async () => {
    // Arrange
    const mockError = new Error("Network error");

    mockedGetRoverImage.mockRejectedValue(mockError);

    // Act
    const act = () => fetchRoverImage(mockApiKey, mockSol);

    // Assert
    await expect(act).rejects.toThrow(mockError);
    expect(mockedGetRoverImage).toHaveBeenCalledWith(mockApiKey, mockSol);
  });
});

import { getMeteors } from "../repositories/meteors.repository.ts";
import {
  mockCloseEarthObjects,
  mockCount,
  mockDate,
  mockDefaultEndDate,
  mockDefaultStartDate,
  mockEndDate,
  mockFilteredMeteors,
  mockIsDangerous,
  mockStartDate,
} from "../tests/mocks.ts";
import { getCurrentWeekDates } from "../utils/parsers/parseDate.ts";
import { filterMeteors } from "../utils/parsers/parseMeteors.ts";
import { getReducedMeteors } from "./meteors.service.ts";

jest.mock("../repositories/meteors.repository.ts");
jest.mock("../utils/parsers/parseDate.ts");
jest.mock("../utils/parsers/parseMeteors.ts");

const mockGetMeteors = getMeteors as jest.MockedFunction<typeof getMeteors>;
const mockGetCurrentWeekDates = getCurrentWeekDates as jest.MockedFunction<
  typeof getCurrentWeekDates
>;
const mockFilterMeteors = filterMeteors as jest.MockedFunction<
  typeof filterMeteors
>;

describe("Meteors Service should", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("return parsed data", async () => {
    // Arrange
    mockGetCurrentWeekDates.mockReturnValue([mockStartDate, mockEndDate]);
    mockGetMeteors.mockResolvedValue(mockCloseEarthObjects);
    mockFilterMeteors.mockReturnValue(mockFilteredMeteors);

    // Act
    const result = await getReducedMeteors(
      mockDate,
      mockCount,
      mockIsDangerous,
    );

    // Assert
    expect(mockGetCurrentWeekDates).toHaveBeenCalledWith(mockDate);
    expect(mockGetMeteors).toHaveBeenCalledWith(mockStartDate, mockEndDate);
    expect(mockFilterMeteors).toHaveBeenCalledWith(
      mockCloseEarthObjects,
      mockCount,
      mockIsDangerous,
    );
    expect(result).toEqual(mockFilteredMeteors);
  });

  it("handle default date if no date is provided", async () => {
    // Arrange
    mockGetCurrentWeekDates.mockReturnValue([
      mockDefaultStartDate,
      mockDefaultEndDate,
    ]);
    mockGetMeteors.mockResolvedValue(mockCloseEarthObjects);
    mockFilterMeteors.mockReturnValue(mockFilteredMeteors);

    // Act
    const result = await getReducedMeteors(undefined, undefined, undefined);

    // Assert
    expect(mockGetCurrentWeekDates).toHaveBeenCalledWith(undefined);
    expect(mockGetMeteors).toHaveBeenCalledWith(
      mockDefaultStartDate,
      mockDefaultEndDate,
    );
    expect(mockFilterMeteors).toHaveBeenCalledWith(
      mockCloseEarthObjects,
      undefined,
      undefined,
    );
    expect(result).toEqual(mockFilteredMeteors);
  });

  it("throw error if meteors rejects a request from getMeteors", async () => {
    // Arrange
    const mockError = new Error("API Error");
    mockGetCurrentWeekDates.mockReturnValue([mockStartDate, mockEndDate]);
    mockGetMeteors.mockRejectedValue(mockError);

    // Act
    const act = () => getReducedMeteors();

    // Assert
    await expect(act).rejects.toThrow(mockError);
    expect(mockGetMeteors).toHaveBeenCalledTimes(1);
  });
});

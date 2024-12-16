import { CloseEarthObjects } from "app/types/meteors.ts";
import { filterMeteors } from "./parseMeteors.ts";

const fakeData: CloseEarthObjects = {
  "2024-12-16": [
    {
      id: "1",
      name: "xb-70",
      close_approach_data: [],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 20,
          estimated_diameter_max: 50,
        },
      },
      is_potentially_hazardous_asteroid: true,
      is_sentry_object: false,
    },
    {
      id: "2",
      name: "xb-60",
      close_approach_data: [],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 30,
          estimated_diameter_max: 80,
        },
      },
      is_potentially_hazardous_asteroid: false,
      is_sentry_object: false,
    },
    {
      id: "3",
      name: "xb-30",
      close_approach_data: [],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 30,
          estimated_diameter_max: 80,
        },
      },
      is_potentially_hazardous_asteroid: false,
      is_sentry_object: false,
    },
    {
      id: "4",
      name: "xb-90",
      close_approach_data: [],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 30,
          estimated_diameter_max: 80,
        },
      },
      is_potentially_hazardous_asteroid: true,
      is_sentry_object: false,
    },
  ],
};

describe("filterMeteors should", () => {
  test("parse meteors and return its array", () => {
    // Arrange
    const expectedResultLength = 4;

    // Act
    const result = filterMeteors(fakeData);

    // Assert
    expect(result.length).toBe(expectedResultLength);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).not.toBeNull();
  });

  test("return result arrording to the count value", () => {
    // Arrange
    const expectedResultLength = 3;

    // Act
    const result = filterMeteors(fakeData, "3");

    // Assert
    expect(result.length).toBe(expectedResultLength);
    expect(result.length).not.toBeNull();
  });

  test("return filtered data by isDangerous value", () => {
    // Arrange
    const expectedResultLength = 2;

    // Act
    const result = filterMeteors(fakeData, "4", "true");

    // Assert
    expect(result.length).toBe(expectedResultLength);
    expect(result.length).not.toBeNull();
  });

  test("throw error if count is less or equal to 0", () => {
    // Arrange
    const expectedErrorMessage = `Invalid count value. Count should be greater then zero.`;

    // Act
    const act = () => filterMeteors(fakeData, "0");

    // Assert
    expect(act).toThrow(Error);
    expect(act).toThrow(expectedErrorMessage);
  });

  test("throw error if count is not a number", () => {
    // Arrange
    const expectedErrorMessage = `Invalid count value. Count should be number type.`;

    // Act
    const act = () => filterMeteors(fakeData, "test");

    // Assert
    expect(act).toThrow(Error);
    expect(act).toThrow(expectedErrorMessage);
  });

  test("throw error if isDangerous has invalid value", () => {
    // Arrange
    const expectedErrorMessage = `Invalid isDangerous value. Count should be true or false.`;

    // Act
    const act = () => filterMeteors(fakeData, "0", "falsy");

    // Assert
    expect(act).toThrow(Error);
    expect(act).toThrow(expectedErrorMessage);
  });
});

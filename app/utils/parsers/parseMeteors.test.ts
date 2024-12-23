import { mockCloseEarthObjects } from "../../tests/mocks.ts";
import { filterMeteors } from "./parseMeteors.ts";

describe("filterMeteors should", () => {
  it("parse meteors and return its array", () => {
    // Arrange
    const expectedResultLength = 4;

    // Act
    const result = filterMeteors(mockCloseEarthObjects);

    // Assert
    expect(result.length).toBe(expectedResultLength);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).not.toBeNull();
  });

  it("return result arrording to the count value", () => {
    // Arrange
    const expectedResultLength = 3;

    // Act
    const result = filterMeteors(mockCloseEarthObjects, "3");

    // Assert
    expect(result.length).toBe(expectedResultLength);
    expect(result.length).not.toBeNull();
  });

  it("return filtered data by isDangerous value", () => {
    // Arrange
    const expectedResultLength = 2;

    // Act
    const result = filterMeteors(mockCloseEarthObjects, "4", "true");

    // Assert
    expect(result.length).toBe(expectedResultLength);
    expect(result.length).not.toBeNull();
  });

  it("throw error if count is less or equal to 0", () => {
    // Arrange
    const expectedErrorMessage = `Invalid count value. Count should be greater then zero.`;

    // Act
    const act = () => filterMeteors(mockCloseEarthObjects, "0");

    // Assert
    expect(act).toThrow(Error);
    expect(act).toThrow(expectedErrorMessage);
  });

  it("throw error if count is not a number", () => {
    // Arrange
    const expectedErrorMessage = `Invalid count value. Count should be number type.`;

    // Act
    const act = () => filterMeteors(mockCloseEarthObjects, "test");

    // Assert
    expect(act).toThrow(Error);
    expect(act).toThrow(expectedErrorMessage);
  });

  it("throw error if isDangerous has invalid value", () => {
    // Arrange
    const expectedErrorMessage = `Invalid isDangerous value. Count should be true or false.`;

    // Act
    const act = () => filterMeteors(mockCloseEarthObjects, "0", "falsy");

    // Assert
    expect(act).toThrow(Error);
    expect(act).toThrow(expectedErrorMessage);
  });
});

import { RoverImage } from "app/types/rover.ts";
import { parseRecentImage } from "./parseRecentImage.ts";

describe("parseRecentImage should", () => {
  const fakeData: RoverImage[] = [
    {
      id: 1,
      earth_date: "2024-12-08",
      img_src: "src/1",
    },
    {
      id: 2,
      earth_date: "2024-12-16",
      img_src: "src/2",
    },
    {
      id: 3,
      earth_date: "2024-12-01",
      img_src: "src/3",
    },
  ];

  it("return recent item when correct data provided", () => {
    // Arrange
    const expectedImageSrc = "src/2";

    // Act
    const result = parseRecentImage(fakeData);

    // Assert
    expect(result?.img_src).toBe(expectedImageSrc);
  });

  it("return null when data was not provided", () => {
    // Act
    const result = parseRecentImage(null!);

    // Assert
    expect(result).toBeNull();
  });

  it("return null when data is empty", () => {
    // Act
    const result = parseRecentImage([]);

    // Assert
    expect(result).toBeNull();
  });
});

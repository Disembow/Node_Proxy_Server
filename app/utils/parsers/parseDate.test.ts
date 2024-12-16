import { formatISO, isMonday, previousMonday } from "date-fns";
import { getCurrentWeekDates } from "./parseDate.ts";

describe("parseDate should", () => {
  test("return right mondays and todays dates when correct input date string provided", () => {
    // Arrange
    const expectedMonday = "2024-12-16";
    const expectedToday = "2024-12-20";

    // Act
    const [monday, today] = getCurrentWeekDates("2024-12-20");

    // Assert
    expect(monday).toBe(expectedMonday);
    expect(today).toBe(expectedToday);
  });

  test("return right mondays and todays dates when correct input date string provided", () => {
    // Arrange
    const expectedToday = formatISO(new Date(), { representation: "date" });
    const expectedMonday = isMonday(expectedToday)
      ? expectedToday
      : formatISO(previousMonday(expectedToday), {
          representation: "date",
        });

    // Act
    const [monday, today] = getCurrentWeekDates();

    // Assert
    expect(monday).toBe(expectedMonday);
    expect(today).toBe(expectedToday);
  });

  test("throw error on incorrect input format", () => {
    // Arrange
    const expectedErrorMessage = `Invalid date format. Expected format is "YYYY-MM-DD"`;

    // Act
    const act = () => getCurrentWeekDates("20-12-2024");

    // Assert
    expect(act).toThrow(Error);
    expect(act).toThrow(expectedErrorMessage);
  });
});

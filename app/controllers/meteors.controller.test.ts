import { NextFunction, Request, Response } from "express";
import { getReducedMeteors } from "../services/meteors.service.ts";
import { mockError, mockFilteredMeteors } from "../tests/mocks.ts";
import { getMeteors, getMeteorsView } from "./meteors.controller.ts";

jest.mock("../services/meteors.service.ts");

const mockedGetReducedMeteors = getReducedMeteors as jest.MockedFunction<
  typeof getReducedMeteors
>;

describe("Meteors Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      query: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      render: jest.fn(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("getMeteors should", () => {
    it("return data and status 200 when service succeeds", async () => {
      // Arrange
      mockedGetReducedMeteors.mockResolvedValue(mockFilteredMeteors);
      mockReq.query = { date: "2024-12-20", count: "10", isDangerous: "true" };

      // Act
      await getMeteors(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockedGetReducedMeteors).toHaveBeenCalledWith(
        "2024-12-20",
        "10",
        "true",
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockFilteredMeteors);
    });

    it("call next function with an error when service fails", async () => {
      // Arrange
      mockedGetReducedMeteors.mockRejectedValue(mockError);

      // Act
      await getMeteors(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockedGetReducedMeteors).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getMeteorsView", () => {
    it("render view with data when service succeeds", async () => {
      // Arrange
      mockedGetReducedMeteors.mockResolvedValue(mockFilteredMeteors);
      mockReq.query = { date: "2024-12-20", count: "10", isDangerous: "true" };

      // Act
      await getMeteorsView(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockedGetReducedMeteors).toHaveBeenCalledWith(
        "2024-12-20",
        "10",
        "true",
      );
      expect(mockRes.render).toHaveBeenCalledWith("meteors.njk", {
        meteors: mockFilteredMeteors,
      });
    });

    it("call next with an error when service fails", async () => {
      // Arrange
      mockedGetReducedMeteors.mockRejectedValue(mockError);

      // Act
      await getMeteorsView(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockedGetReducedMeteors).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});

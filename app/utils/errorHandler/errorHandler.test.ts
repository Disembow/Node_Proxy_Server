import * as Sentry from "@sentry/node";
import { NextFunction, Request, Response } from "express";
import { errorHandler, HttpError } from "./errorHandler.ts";

jest.mock("@sentry/node");

describe("errorHandler should", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it("respond with error details in non-production mode", () => {
    // Arrange
    const mockError = new Error("Test error") as HttpError;
    process.env.NODE_ENV = "development";

    // Act
    errorHandler(mockError, mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Test error",
      stack: mockError.stack,
    });
  });

  it("respond without stack trace in production mode", () => {
    // Arrange
    const mockError = new Error("Test error") as HttpError;
    process.env.NODE_ENV = "production";

    // Act
    errorHandler(mockError, mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Test error",
    });
  });

  it("respond with the provided HTTP status code and message", () => {
    // Arrange
    const mockError = {
      message: "Not Found",
      status: 404,
      stack: "Error stack trace",
    };

    process.env.NODE_ENV = "development";

    // Act
    errorHandler(
      mockError as HttpError,
      mockReq as Request,
      mockRes as Response,
      mockNext,
    );

    // Assert
    expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Not Found",
      stack: mockError.stack,
    });
  });

  it("default to status 500 if no status is provided", () => {
    // Arrange
    const mockError = {
      message: "Unknown error",
      stack: "Error stack trace",
    };

    process.env.NODE_ENV = "development";

    // Act
    errorHandler(
      mockError as HttpError,
      mockReq as Request,
      mockRes as Response,
      mockNext,
    );

    // Assert
    expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Unknown error",
      stack: mockError.stack,
    });
  });

  it("handle cases where no message or stack is provided", () => {
    // Arrange
    const mockError = {
      status: 400,
    };

    process.env.NODE_ENV = "development";

    // Act
    errorHandler(
      mockError as HttpError,
      mockReq as Request,
      mockRes as Response,
      mockNext,
    );

    // Assert
    expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal Server Error",
      stack: undefined,
    });
  });
});

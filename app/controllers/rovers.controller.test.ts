import { NextFunction, Request, Response } from "express";
import { fetchRoverImage } from "../services/rovers.service.ts";
import { mockApiKey, mockError, mockSol } from "../tests/mocks.ts";
import {
  getRoverFormView,
  getRoverImage,
  getRoverImageView,
} from "./rovers.controller.ts";

jest.mock("../services/rovers.service.ts");

const mockedFetchRoverImage = fetchRoverImage as jest.MockedFunction<
  typeof fetchRoverImage
>;

describe("Rovers Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};

    mockRes = {
      render: jest.fn(),
      json: jest.fn(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("getRoverFormView should", () => {
    it("render the rover form view", async () => {
      // Act
      await getRoverFormView(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.render).toHaveBeenCalledWith("roverForm.njk");
    });

    it("call next with an error if rendering fails", async () => {
      // Arrange
      const mockError = new Error("Render error");
      mockRes.render = jest.fn().mockImplementation(() => {
        throw mockError;
      });

      // Act
      await getRoverFormView(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getRoverImage should", () => {
    beforeEach(() => {
      mockReq.body = { apikey: mockApiKey, sol: mockSol };
    });

    it("return the rover image in JSON when service succeeds", async () => {
      // Arrange
      const mockPhoto = "http://example.com/photo.jpg";
      mockedFetchRoverImage.mockResolvedValue(mockPhoto);

      // Act
      await getRoverImage(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockedFetchRoverImage).toHaveBeenCalledWith(mockApiKey, mockSol);
      expect(mockRes.json).toHaveBeenCalledWith({ photo: mockPhoto });
    });

    it("call next with an error if service fails", async () => {
      // Arrange
      mockedFetchRoverImage.mockRejectedValue(mockError);

      // Act
      await getRoverImage(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getRoverImageView should", () => {
    beforeEach(() => {
      mockReq.body = { apikey: mockApiKey, sol: mockSol };
    });

    it("render the image view when photo is found", async () => {
      // Arrange
      const mockPhoto = "http://example.com/photo.jpg";
      mockedFetchRoverImage.mockResolvedValue(mockPhoto);

      // Act
      await getRoverImageView(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      // Assert
      expect(mockedFetchRoverImage).toHaveBeenCalledWith(mockApiKey, mockSol);
      expect(mockRes.render).toHaveBeenCalledWith("roverImage.njk", {
        photo: mockPhoto,
      });
    });

    it("render the not found page when no photo is found", async () => {
      // Arrange
      mockedFetchRoverImage.mockResolvedValue(null);

      // Act
      await getRoverImageView(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      // Assert
      expect(mockedFetchRoverImage).toHaveBeenCalledWith(mockApiKey, mockSol);
      expect(mockRes.render).toHaveBeenCalledWith("notFoundPage.njk");
    });

    it("call next with an error if service fails", async () => {
      // Arrange
      mockedFetchRoverImage.mockRejectedValue(mockError);

      // Act
      await getRoverImageView(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});

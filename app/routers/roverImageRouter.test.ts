import request from "supertest";
import app from "../app.ts";
import * as roverService from "../services/rovers.service.ts";
import {
  mockApiKey,
  mockError,
  mockRoverImage,
  mockSol,
} from "../tests/mocks.ts";

jest.mock("../services/rovers.service.ts", () => ({
  fetchRoverImage: jest.fn(),
}));

describe("Rover endpoint", () => {
  describe("GET /api/v1/rover/view-form", () => {
    it("should render the rover form view", async () => {
      // Act & Assert
      const response = await request(app)
        .get("/api/v1/rover/view-form")
        .expect(200);

      expect(response.text).toContain(
        `<h1 class="title">Get Rover Image Form</h1>`,
      );
    });
  });

  describe("POST /api/v1/rover", () => {
    it("should return a rover image when valid data is provided", async () => {
      // Arrange
      jest
        .spyOn(roverService, "fetchRoverImage")
        .mockResolvedValue(mockRoverImage);

      // Act & Assert
      const response = await request(app)
        .post("/api/v1/rover")
        .send({ apikey: mockApiKey, sol: mockSol })
        .expect(200);

      expect(response.body).toEqual({ photo: mockRoverImage });
    });

    it("should return an error if the service fails", async () => {
      // Arrange
      jest.spyOn(roverService, "fetchRoverImage").mockRejectedValue(mockError);

      // Act & Assert
      const response = await request(app)
        .post("/api/v1/rover")
        .send({ apikey: mockApiKey, sol: "" })
        .expect(500);

      expect(response.body.message).toContain("Service error");
    });
  });

  describe("POST /api/v1/rover/view", () => {
    it("should render rover image view when image is found", async () => {
      // Arrange
      jest
        .spyOn(roverService, "fetchRoverImage")
        .mockResolvedValue(mockRoverImage);

      // Act & Assert
      const response = await request(app)
        .post("/api/v1/rover/view")
        .send({ apikey: mockApiKey, sol: mockSol })
        .expect(200);

      expect(response.text).toContain(
        `<img src="${mockRoverImage}" alt="Image from Mars">`,
      );
    });

    it("should return 404 if the service fails", async () => {
      // Arrange
      jest.spyOn(roverService, "fetchRoverImage").mockRejectedValue(mockError);

      // Act & Assert
      const response = await request(app)
        .post("/api/v1/rover/view")
        .send({ apikey: mockApiKey, sol: mockSol })
        .expect(500);

      expect(response.body.message).toContain("Service error");
    });
  });
});

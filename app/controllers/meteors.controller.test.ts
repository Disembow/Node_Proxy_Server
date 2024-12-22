import request from "supertest";
import app from "../app.ts";
import * as meteorsService from "../services/meteors.service.ts";
import { mockError, mockFilteredMeteors, mockQuery } from "../tests/mocks.ts";

jest.mock("../services/meteors.service.ts", () => ({
  getReducedMeteors: jest.fn(),
}));

describe("Meteors endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return filtered meteors", async () => {
    jest
      .spyOn(meteorsService, "getReducedMeteors")
      .mockResolvedValue(mockFilteredMeteors);

    const response = await request(app)
      .get("/api/v1/meteors/")
      .query(mockQuery)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(mockFilteredMeteors);
  });

  it("should throw an error when service fails", async () => {
    jest
      .spyOn(meteorsService, "getReducedMeteors")
      .mockRejectedValue(mockError);

    const response = await request(app)
      .get("/api/v1/meteors/")
      .query(mockQuery)
      .expect("Content-Type", /json/);

    expect(response.body.message).toEqual("Service error");
  });
});

describe("Meteors View endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the meteors view with valid data", async () => {
    jest
      .spyOn(meteorsService, "getReducedMeteors")
      .mockResolvedValue(mockFilteredMeteors);

    const response = await request(app)
      .get("/api/v1/meteors/view")
      .query(mockQuery)
      .expect("Content-Type", /text/)
      .expect(200);

    expect(response.text).toContain(`<table class="table"`);
  });

  it("should handle an error and pass them to the error handler", async () => {
    jest
      .spyOn(meteorsService, "getReducedMeteors")
      .mockRejectedValue(mockError);

    const response = await request(app)
      .get("/api/v1/meteors/view")
      .query(mockQuery)
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body.message).toEqual("Service error");
  });
});

import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Tag, validate } from "./validator.ts";

describe("validate middleware should", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { body: {}, query: {} };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  it(`call next function when validation passes with tag is default "body"`, () => {
    // Arrange
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    mockReq.body = { name: "Name" };

    const middleware = validate(schema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it("return 400 when validation fails", () => {
    // Arrange
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    mockReq.body = {};

    const middleware = validate(schema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "body validation was failed",
      description: expect.arrayContaining([
        expect.objectContaining({
          message: `"name" is required`,
        }),
      ]),
    });
  });

  it("throw an error if schema is not provided", () => {
    // Act
    const act = () => validate(undefined!);

    // Assert
    expect(act).toThrow("Schema didn't found");
  });

  it(`validate data in query when tag is "query"`, () => {
    // Arrange
    const schema = Joi.object({
      age: Joi.number().integer().min(18).required(),
    });
    mockReq.query = { age: "25" };

    const middleware = validate(schema, "query");

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockReq.query).toEqual({ age: "25" });
  });

  it("return 400 when query validation fails", () => {
    // Arrange
    const schema = Joi.object({
      age: Joi.number().integer().min(18).required(),
    });
    mockReq.query = { age: "15" };

    const middleware = validate(schema, "query");

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "query validation was failed",
      description: expect.arrayContaining([
        expect.objectContaining({
          message: `"age" must be greater than or equal to 18`,
        }),
      ]),
    });
  });

  it("should throw an error for unsupported tag", () => {
    // Arrange
    const schema = Joi.object({});

    // Act
    const act = () => validate(schema, "tag" as Tag);

    // Assert
    expect(act).toThrow("Incorrect tag for request parsing was used");
  });
});

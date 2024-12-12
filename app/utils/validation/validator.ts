import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { TAGS } from "../../constants/queryConstants.ts";

type Tag = "query" | "body";

const options = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: true,
};

export const validate = (schema: Schema, tag: Tag = "body") => {
  if (!schema) {
    throw new Error("Schema didn't found");
  }

  if (!TAGS.includes(tag)) {
    throw new Error("Incorrect tag for request parsing was used");
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[tag], options);

    if (error) {
      res.status(400).json({
        success: false,
        message: `${tag} validation was failed`,
        description: error.details.map((e) => ({
          message: e.message,
        })),
      });

      return;
    }

    next();
  };
};

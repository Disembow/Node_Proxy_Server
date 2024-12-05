import { TAGS } from "../../constants/queryConstants.js";

const options = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: true,
};

export const validate = (schema, tag = "body") => {
  if (!schema) {
    throw new Error("Schema didn't found");
  }

  if (!TAGS.includes(tag)) {
    throw new Error("Incorrect tag for request parsing was used");
  }

  return (req, res, next) => {
    const { error } = schema.validate(req[tag], options);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `${tag} validation was failed`,
        description: error.details.map((e) => ({
          message: e.message,
        })),
      });
    }

    next();
  };
};

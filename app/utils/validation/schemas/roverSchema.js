import Joi from "joi";

const schema = Joi.object({
  apikey: Joi.string().required().min(1).messages({
    "string.base": "{#label} must be a string type",
    "string.min": "{#label} must be at least {#limit} characters long!",
    "any.required": "{#label} is required",
  }),

  sol: Joi.string().optional().pattern(/^\d+$/).min(1).messages({
    "string.base": "{#label} must be a string type",
    "string.pattern.base": `{#label} must only contain numeric characters`,
    "string.min": "{#label} must be at least {#limit} characters long!",
  }),
});

export default schema;

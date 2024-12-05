import Joi from "joi";

const schema = Joi.object({
  date: Joi.string()
    .optional()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      "string.base": "{#label} must be a string type",
      "string.pattern.base": `{#label} must only contain numeric characters by mask "YYYY-MM-DD"`,
    }),

  count: Joi.string().optional().pattern(/^\d+$/).messages({
    "string.base": "{#label} must be a string type",
    "string.pattern.base": `{#label} must only contain numeric characters`,
  }),

  isDangerous: Joi.string().optional().valid("true", "false").messages({
    "string.base": "{#label} must be a string type",
    "any.only": `{#label} value could be only "true" or "false"`,
  }),
});

export default schema;

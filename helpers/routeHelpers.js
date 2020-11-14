const Joi = require("joi");

module.exports = {
  validateBody: (schema) => {
    return async (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        // Error happened
        return res.status(400).send(result.error.details[0].message);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },
  schema: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};

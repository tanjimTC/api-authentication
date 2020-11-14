const Joi = require("joi");
const User = require("../models/user");

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
  validateUserLogin: (schema) => {
    return async (req, res, next) => {
      // validate the data before creating user
      const result = await schema.validate(req.body);
      if (result.error)
        return res.status(400).send(result.error.details[0].message);

      // check if the user alredy exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Email does't exists");

      // const validPass = await bcrypt.compare(req.body.password, user.password);
      // if (!validPass) return res.status(400).send("wrong password sucker");

      // // create and assign a jwt toekn
      // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      // res.header("auth-token", token).send(token);
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

const express = require("express");
const {
  validateBody,
  validateUserLogin,
  schema,
} = require("../helpers/routeHelpers");
const router = require("express-promise-router")();
const userController = require("../controllers/users");
const passportConf = require("../passport");
const passport = require("passport");

const passportLocal = passport.authenticate("local", { session: false });
const passportJwt = passport.authenticate("jwt", { session: false });

router
  .route("/signup")
  .post(validateBody(schema.authSchema), userController.signup);

router
  .route("/signin")
  .post(
    validateUserLogin(schema.authSchema),
    passportLocal,
    userController.signin
  );

router.route("/secrets").get(passportJwt, userController.secrets);

module.exports = router;

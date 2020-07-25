const express = require("express");
const { validateBody, schema } = require("../helpers/routeHelpers");
const router = require("express-promise-router")();
const userController = require("../controllers/users");
const passportConf = require("../passport");
const passport = require("passport");

router
  .route("/signup")
  .post(validateBody(schema.authSchema), userController.signup);

router.route("/signin").post(userController.signin);

router
  .route("/secrets")
  .get(
    passport.authenticate("jwt", { session: false }),
    userController.secrets
  );

module.exports = router;

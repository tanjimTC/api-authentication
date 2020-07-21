const express = require("express");
const { validateBody, schema } = require("../helpers/routeHelpers");
const router = require("express-promise-router")();
const userController = require("../controllers/users");

router
  .route("/signup")
  .post(validateBody(schema.authSchema), userController.signup);

router.route("/signin").post(userController.signin);

router.route("/secrets").get(userController.secrets);

module.exports = router;

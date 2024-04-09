const express = require("express");
const user = require("./auth");
const supplier = require("./supplier");
const packages = require("./packages");
const reviews = require("./reviews");

const router = express.Router();

router.use("/user", user);
router.use("/supplier", supplier);
router.use("/packages", packages);
router.use("/reviews", reviews);

module.exports = router;
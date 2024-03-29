const express = require("express");
const user = require("./auth");
const supplier = require("./supplier");
const packages = require("./packages");

const router = express.Router();

router.use("/user", user);
router.use("/supplier", supplier);
router.use("/packages", packages);

module.exports = router;
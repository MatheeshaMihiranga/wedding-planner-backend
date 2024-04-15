const express = require("express");
const user = require("./auth");
const supplier = require("./supplier");
const packages = require("./packages");
const reviews = require("./reviews");
const enquire = require("./enquire");
const checkList = require("./checkList");
const budget = require("./budget");
const guest = require("./guest");

const router = express.Router();

router.use("/user", user);
router.use("/supplier", supplier);
router.use("/packages", packages);
router.use("/review", reviews);
router.use("/enquire", enquire);
router.use("/checkList", checkList);
router.use("/budget", budget);
router.use("/guest", guest);

module.exports = router;
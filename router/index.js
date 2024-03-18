const express = require("express");
const user = require("./auth");
const supplier = require("./supplier")
const router = express.Router();

router.use("/user", user);
router.use("/supplier", supplier);

module.exports = router;
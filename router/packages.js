const express = require("express");
const packages = require("../controllers/packages");
const { authorize, Roles } = require("../middleware/auth");
const router = express.Router();

router.post("/createPackages/:id", authorize(Roles.All), packages.createPackages);
router.put("/updatePackages/:id/:packageId", authorize(Roles.All), packages.updatePackageData);
router.delete("/deletePackageData/:id/:packageId", authorize(Roles.All), packages.deletePackageData);

module.exports = router;

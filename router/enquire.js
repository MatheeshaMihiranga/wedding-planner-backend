const express = require("express");
const enquires = require("../controllers/enquires");
const { authorize, Roles } = require("../middleware/auth");
const router = express.Router();

router.post("/createEnquire/:id", authorize(Roles.All), enquires.createEnquires);
router.put("/updateEnquire/:id/:enquireId", authorize(Roles.All), enquires.updateEnquire);
router.get("/getAllEnquireBySupplierId/:id", authorize(Roles.All), enquires.getAllEnquireBySupplier);

module.exports = router;

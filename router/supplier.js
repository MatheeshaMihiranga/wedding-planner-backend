const express = require("express");
const supplier = require("../controllers/supplier");
const { authorize, Roles } = require("../middleware/auth");
const router = express.Router();

router.get("/getAll", authorize(Roles.All), supplier.getAllSuppliers);
router.put("/update/:id", authorize(Roles.All), supplier.updateSupplierData);
router.get("/getSupplier/:id", authorize(Roles.All), supplier.getSupplierById);
router.post("/getSupplier", authorize(Roles.All), supplier.searchSupplier);

module.exports = router;

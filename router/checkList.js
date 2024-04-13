const express = require('express')
const checkList = require('../controllers/checkList')
const { authorize, Roles } = require('../middleware/auth')
const router = express.Router()   

router.get('/userCheckList/:id',authorize(Roles.All),checkList.getUserCheckList)
router.post("/createCheckList/:id", authorize(Roles.All), checkList.createCheckList);
router.put("/updateCheckList/:id/:checkListId", authorize(Roles.All), checkList.updateCheckList);
router.delete("/deleteCheckList/:id/:checkListId", authorize(Roles.All), checkList.deleteCheckList);

module.exports = router  

const express = require('express')
const guest = require('../controllers/guest')
const { authorize, Roles } = require('../middleware/auth')
const router = express.Router()   

router.get('/userGuestList/:id',authorize(Roles.All),guest.getUserGuest)
router.post('/createNewTable/:id',authorize(Roles.All),guest.createUserGuestTable)
router.post('/createNewTableGuest/:id/:tableId',authorize(Roles.All),guest.createTableGuest)
router.put('/updateTableGuest/:id/:tableId/:guestId',authorize(Roles.All),guest.updateTableGuest)
router.delete('/deleteTableGest/:id/:guestId',authorize(Roles.All),guest.deleteBudgetExpenses)
router.put('/updateTable/:id/:tableId',authorize(Roles.All),guest.updateTableData)
router.delete('/deleteTableData/:id/:tableId',authorize(Roles.All),guest.deleteTableData)

module.exports = router  

const express = require('express')
const auth = require('../controllers/auth')
const { authorize, Roles } = require('../middleware/auth')
const router = express.Router()   

router.post('/auth', auth.postLogin)
router.post('/signUp',auth.signUp)
router.get('/userProfile',authorize(Roles.All),auth.userProfile)
router.put('/userUpdate/:id',authorize(Roles.All),auth.updateUser)

module.exports = router  

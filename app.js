const express = require('express')
const bodyPharser = require('body-parser')
const routes =  require('./router')
const error = require('./controllers/error')
var cors = require('cors')
const passport = require('passport')
const multer = require('multer')
const connectDB = require('./config/mongoDB')
require('dotenv').config()

connectDB()
const app = express()
app.use(passport.initialize())
require('./passport/passportJWT')(passport)

app.use(cors())

app.use(bodyPharser.json())

app.use(routes)


app.use(error.error)

const PORT = 4005

app.listen(PORT)

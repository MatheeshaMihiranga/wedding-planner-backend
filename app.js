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

app.use(cors())

app.use(bodyPharser.json())
app.use(multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }}).single('file'))

app.use(routes)

app.use(error.error)

const PORT = 4005

app.listen(PORT)

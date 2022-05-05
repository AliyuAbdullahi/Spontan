const express = require('express')
const logger = require('morgan')
const UserController = require('../controllers/UserController')
const userRouter = express.Router()

userRouter.use(logger())

userRouter.get('/', UserController.getUsers)

module.exports = userRouter
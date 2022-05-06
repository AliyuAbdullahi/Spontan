const express = require('express')
const logger = require('morgan')
const jwtVerify = require('./Jwt')
const EventsController = require('../controllers/EventsController')
const router = express.Router()
const Routes = require('./Routes')

router.use(logger())

router.delete(Routes.ROOT, [jwtVerify, EventsController.deleteEvent])
router.delete(Routes.EVENT.DELETE_ALL, [jwtVerify, EventsController.deleteAllEvents])
router.get(Routes.ROOT, [jwtVerify, EventsController.getEvents])
router.post(Routes.ROOT, [jwtVerify, EventsController.addEvent])
router.put(Routes.ROOT, [jwtVerify, EventsController.updateEvent])

module.exports = router
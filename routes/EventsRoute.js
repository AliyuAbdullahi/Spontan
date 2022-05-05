const express = require('express')
const logger = require('morgan')
const jwtVerify = require('./Jwt')
const EventsController = require('../controllers/EventsController')
const router = express.Router()

router.use(logger())

router.delete('/', [jwtVerify, EventsController.deleteEvent])
router.delete('/all', [jwtVerify, EventsController.deleteAllEvents])
router.get('/', [jwtVerify, EventsController.getEvents])
router.post('/', [jwtVerify, EventsController.addEvent])
router.put('/', [jwtVerify, EventsController.updateEvent])

module.exports = router
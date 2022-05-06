const User = require('../schema/User')

const getEvents = async(req, res) => {
    const email = req.user.email
    const foundUser = await User.findOne( {"email" : email} ).exec()
    res.json({"events" : foundUser.events})
}

const addEvent = async(req, res) => {
    const email = req.user.email
    const foundUser = await User.findOne( {"email" : email} ).exec()
    
    const event = req.body
    
    if (
        event === undefined || 
        event.id === undefined || 
        event.title === undefined || 
        event.time === undefined || 
        event.cover_color === undefined || 
        event.cover_image === undefined
    ) { return res.status(409).json({'message' : `Event must have id, title, time, cover_color and cover_image ${event}`}) }

    const userEvents = foundUser.events
    userEvents.push(event)
    
    const filter = { "email": email }
    const update = { "events": userEvents }
    
    let updatedUser = await User.findOneAndUpdate(filter, update).exec()
    
    updatedUser.events = userEvents
    
    res.json({"events" : updatedUser.events})
}

const updateEvent = async(req,res) => {
    const email = req.user.email
    const foundUser = await User.findOne( {"email" : email} ).exec()
    
    const event = req.body
    

    let found = false
    const userEvents = foundUser.events

    let eventToDelte = {}
    Object.entries(userEvents).map(([index, value]) => {
        if(value.id === event.id) {
            eventToDelte = value
            found = true
        }
     })

    if(!found) {
        return res.status(409).json({'message' : `Event ${event} does not exist`})
    }

    const events = foundUser.events.filter(el => el !== eventToDelte)

    events.push(event)

    const filter = { "email": email }
    const update = { "events": events }
    
    let updatedUser = await User.findOneAndUpdate(filter, update).exec()
    
    updatedUser.events = events
    
    res.json({"events" : updatedUser.events})

}

const deleteEvent = async(req, res) => {
    const email = req.user.email
    const foundUser = await User.findOne( {"email" : email} ).exec()
    
    const event = req.body
    const events = foundUser.events.filter(el => el.id !== event.id)

    let found = false
    const userEvents = foundUser.events

    Object.entries(userEvents).map(([index, value]) => {
        if(value.id === event.id) {
          found = true
        }
     })

    if(!found) {
        return res.status(409).json({'message' : `Event ${event} does not exist`})
    }

    const filter = { "email": email }
    const update = { "events": events }

    let updatedUser = await User.findOneAndUpdate(filter, update)
    updatedUser.events = events
    res.json({"events" : updatedUser.events})
}

const deleteAllEvents = async(req, res) => {
    const email = req.user.email
   
    const filter = { "email": email }
    const update = { "events": [] }

    let updatedUser = await User.findOneAndUpdate(filter, update)
    updatedUser.events = []
    res.json({"events" : updatedUser.events})
}

module.exports = { getEvents, addEvent, updateEvent, deleteEvent, deleteAllEvents }
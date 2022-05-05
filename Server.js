require('dotenv').config()
const mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')
const connectDb = require('./config/Config')
const loginRoute = require('./routes/LoginRoute')
const signUpRoute = require('./routes/SignupRoute')
const getUsersRoute = require('./routes/UsersRoute')
const eventsRoute = require('./routes/EventsRoute')

const PORT = process.env.PORT || 3500

connectDb()

const app = express()

const http = require('http').Server(app);

app.use(express.json())

app.use(bodyParser.urlencoded({ extended : true }))

app.use('/signup', signUpRoute)

app.use('/login', loginRoute)

app.use('/users', getUsersRoute)

app.use('/event', eventsRoute)

app.get('/', (req, res) => {
    res.json({ 'message' : 'Welcome to Spontan API' })
})

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDb")
    http.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
})
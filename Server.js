require('dotenv').config()
const mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')
const connectDb = require('./config/Config')
const loginRoute = require('./routes/LoginRoute')
const signUpRoute = require('./routes/SignupRoute')
const getUsersRoute = require('./routes/UsersRoute')
const eventsRoute = require('./routes/EventsRoute')
const Routes = require('./routes/Routes')

const PORT = process.env.PORT || 3500

connectDb()

const app = express()

app.use(express.json())

app.use(bodyParser.urlencoded({ extended : true }))

app.use(Routes.SIGN_UP.PATH, signUpRoute)

app.use(Routes.LOG_IN.PATH, loginRoute)

app.use(Routes.USERS.PATH, getUsersRoute)

app.use(Routes.EVENT.PATH, eventsRoute)

app.get('/', (req, res) => {
    res.status(200).json({ 'message' : 'Welcome to Spontan API' })
})

const server = app.listen(
    PORT,
    console.log(`Server is listening on port ${PORT}...`)
);

module.exports = { app, server }
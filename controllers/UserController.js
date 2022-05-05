const User = require('.././schema/User')
const jwt = require('jsonwebtoken')
const hash = require('../hash/Hash')

let getMissingField = (name, email, password) => {
    if(!name && !email && !password) {
        return "name, email and password"
    }
    if (!name && !email) {
        return "name and email"
    }
    if (!name && password) {
        return "name and password"
    }

    if (!email && !password) {
        return "email and password"
    }

    return ""
}

const handleSignUp = async (req, res, next) => {
    const body = req.body
    const name = body.name
    const email = body.email
    const password = body.password

    if (!name || !email || !password)
        return res.status(400).json({ 'message' : `missing  field ${getMissingField(name, email, password)}` })

    const userAlreadyExist = await User.findOne( {"email" : email} ).exec()

    if (userAlreadyExist) {
        return res.status(409).json({ 'message' : `user already exist` })
    }

    res.setHeader("Content-Type", "application/json")

    hash.hash(password, async (result) => {
            if(result === null) {
                return res.status(409).json({ 'message' : `invalid password` })
            } else {
                try{
                    await User.create(
                        {
                            "name": name,
                            "email": email,
                            "password": result
                        }
                    )
                    next()
                }catch(error) {
                    res.status(500).json({ 'message' : error.message })
                }
            }
        }
    )
}

const buildUser = (user) => {
    return {
        "name": user.name,
        "email": user.email,
        "accessToken": user.accessToken
    }
}

const getUsers = async(req, res) => {
   const users = await User.find({}).exec()
   res.json(users)
}

const handleLogin = async (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password
    
    if (!email || !password) return res.status(400)

    const user = await User.findOne( {"email" : email} ).exec()

    if (!user) {
        return res.status(404).json({ 'message' : `user with email ${email} not found` })
    }

    hash.compare(password, user.password, async (data) => {
            if (data === null) {
                return res.status(409).json({ 'message' : `invalid password` })
            } else {
                const accessToken = jwt.sign(
                    { "email" : user.email },
                    process.env.ACCESS_TOKEN_SECRET
                )

                const filter = { email: email }
                const update = { accessToken: accessToken }
            
                let updatedUser = await User.findOneAndUpdate(filter, update)
                updatedUser.accessToken = accessToken
                res.json(buildUser(updatedUser))
            }
        }
    )
}

module.exports = { handleSignUp, handleLogin, getUsers }




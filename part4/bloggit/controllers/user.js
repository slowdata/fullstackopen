const userRoute = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

userRoute.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1
    })
    console.log(users)

    if (users.length > 0) {
        res.json(users.map(u => u.toJSON()))
    } else {
        res.status(404).end()
    }
})

userRoute.post('/', async (req, res, next) => {
    const { body } = req

    if (body.password.length < 3) {
        return res.status(400).json({
            error: `User validation failed: \`passowrd\` is shorter than the minimum allowed legth (3)`
        })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = userRoute

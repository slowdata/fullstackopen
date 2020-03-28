const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
//express async errors
require('express-async-errors')

const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')
const logger = require('./utils/log')

const {
    requestLogger,
    tokenExtractor,
    errorHandler
} = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI

mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
mongoose
    .connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        logger.info('> Connected to MongoDB')
    })
    .catch(error => {
        logger.error('Problem connecting to MongoDB erro: ' + error)
    })

app.use(bodyParser.json())
app.use(cors())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

module.exports = app

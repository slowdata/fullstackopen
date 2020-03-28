const logger = require('./log')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }
    next()
}

module.exports = {
    requestLogger,
    tokenExtractor,
    errorHandler
}

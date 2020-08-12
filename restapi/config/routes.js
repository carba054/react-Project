const router = require('../routes/')

module.exports = (app) => {

    app.use('/api/user', router.user)

    app.use('/api/units', router.units)

    app.use('/api/base', router.base)

    app.use('/api/factory', router.factory)

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};
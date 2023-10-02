const router = require('express').Router()
const validateToken = require('./middleware')

router.use('/users', validateToken, require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router

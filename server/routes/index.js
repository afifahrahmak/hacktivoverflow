const router = require('express').Router()
const user = require('./user')
const question = require('./question')
const answer = require('./answer')

router.use('/user', user)
router.use('/question', question)
router.use('/answer', answer)

module.exports = router
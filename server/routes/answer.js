const router = require('express').Router()
const AnswerC = require('../controllers/answer')
const { authentication , authorization } = require('../middlewares/auth')

router.post('/:id' , authentication , AnswerC.create)
router.patch('/:id', authentication , AnswerC.updateField)
router.get('/' , authentication , AnswerC.userAnswer)
router.patch('/upvote/:id', authentication, AnswerC.upvote)
router.patch('/downvote/:id', authentication , AnswerC.downvote)


module.exports = router
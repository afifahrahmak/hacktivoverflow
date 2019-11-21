const router = require('express').Router()
const QuestionC = require('../controllers/question')
const { authentication , authorization } = require('../middlewares/auth')

router.post('/' , authentication , QuestionC.create)
router.patch('/:id', authentication , QuestionC.updateField)
router.delete('/:id', authentication, QuestionC.delete)
router.get('/' , QuestionC.findAll)
router.get('/user' , authentication , QuestionC.findUser)
router.get('/tag' , QuestionC.tag)
router.patch('/upvote/:id', authentication, QuestionC.upvote)
router.patch('/downvote/:id', authentication , QuestionC.downvote)

module.exports = router
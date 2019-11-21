const Question = require('../models/question')
const Answer = require('../models/answer')
const toUpdate = require('../helpers/updateField')

class AnswerC {

    static create(req, res, next) {
        let answer;
        Answer.create({
            answer: req.body.answer,
            user: req.loggedUser.id,
            question: req.params.id
        })
            .then(newAnswer => {
                answer = newAnswer;
                return Question.findByIdAndUpdate(req.params.id, { $push: { answer } })
            })
            .then(updated => {
                res.status(200).json({ updated, answer })
            })
    }

    static updateField(req, res, next) {
        let dataChanged = toUpdate(['answer'], req.body)
        const _id = req.params.id;
        Answer.findByIdAndUpdate(
            _id,
            {
                $set: { dataChanged }
            },
            {
                omitUndefined: true,
                new: true,
                runValidators: true
            })
            .then(answer => {
                res.status(201).json({ answer, message: 'success updated answer' })
            })
            .catch(next)
    }

    static userAnswer(req, res, next) {
        Answer.find({ user: req.loggedUser.id })
            .populate(['user', 'question'])
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(next)
    }

    static upvote(req, res, next) {
        Answer.findById(req.params.id)
            .then(answer => {
                let votes = answer.votes
                let flag = false
                let data = {}
                votes.forEach(vote => {
                    if (String(vote.user) === req.loggedUser._id) {
                        flag = true
                        data = vote
                    }
                })
                if (!flag) {
                    return Answer.updateOne(
                        { _id: req.params.id },
                        {
                            $push:
                            {
                                votes:
                                {
                                    user: req.loggedUser._id,
                                    value: 1
                                }
                            }
                        }
                    )
                } else if (flag && data.value === 1) {
                    return Answer.updateOne(
                        { _id: req.params.id },
                        {
                            '$pull':
                            {
                                'votes':
                                {
                                    'user': req.loggedUser._id,
                                }
                            }
                        }
                    )
                } else if (flag && data.value === -1) {
                    return Answer.updateOne({
                        _id: req.params.id, 'votes.user': req.loggedUser._id
                    }, {
                        '$set': {
                            'votes.$.value': 1
                        }
                    })
                }
            })
            .then(updated => {
                res.status(200).json({ message: 'upvotes success', updated })
            })
            .catch(next)
    }

    static downvote(req, res, next) {
        Answer.findById(req.params.id)
            .then(answer => {
                let votes = answer.votes
                let flag = false
                let data = {}
                votes.forEach(vote => {
                    if (String(vote.user) === req.loggedUser._id) {
                        flag = true
                        data = vote
                    }
                })
                if (!flag) {
                    return Answer.updateOne(
                        { _id: req.params.id },
                        {
                            $push:
                            {
                                votes:
                                {
                                    user: req.loggedUser._id,
                                    value: -1
                                }
                            }
                        }
                    )
                } else if (flag && data.value === -1) {
                    return Answer.updateOne(
                        { _id: req.params.id },
                        {
                            '$pull':
                            {
                                'votes':
                                {
                                    'user': req.loggedUser._id,
                                }
                            }
                        }
                    )
                } else if (flag && data.value === 1) {
                    return Answer.updateOne({
                        _id: req.params.id, 'votes.user': req.loggedUser._id
                    }, {
                        $set: {
                            'votes.$.value': -1
                        }
                    })
                }
            })
            .then(updated => {
                res.status(200).json({ message: 'downvote success', updated })
            })
            .catch(next)
    }
}

module.exports = AnswerC

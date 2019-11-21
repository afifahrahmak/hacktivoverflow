const Question = require('../models/question')
const Answer = require('../models/answer')
const toUpdate = require('../helpers/updateField')


class QuestionC {

    static findAll(req, res, next) {
        Question.find()
            .sort([['updatedAt', 'descending']])
            .populate(['user', 'answer'])
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static findUser(req, res, next) {
        Question.find({ user: req.loggedUser.id })
            .sort([['updatedAt', 'descending']])
            .populate(['user', 'answer'])
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static create(req, res, next) {
        Question.create({
            title: req.body.title,
            question: req.body.question,
            user: req.loggedUser.id,
            tags: req.body.tags
        })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(next)
    }

    static updateField(req, res, next) {
        let dataChanged = toUpdate(['title', 'question', 'tags'], req.body)
        const _id = req.params.id;
        console.log(req.params.id);
        Question.findByIdAndUpdate(
            _id,
            {
                $set: dataChanged
            },
            {
                omitUndefined: true,
                new: true,
                runValidators: true
            })
            .then(question => {
                console.log(question);
                res.status(201).json({ question, message: 'success updated question' })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Answer.deleteMany({ question: req.params.id })
            .then(deleted => {
                return Question.findByIdAndDelete(req.params.id)
            })
            .then(deleted => {
                res.status(200).json({ deleted, message: 'delete question success' })
            })
            .catch(next)

    }

    static upvote(req, res, next) {
        Question.findById(req.params.id)
            .then(question => {
                let votes = question.votes
                let flag = false
                let data = {}
                votes.forEach(vote => {
                    if (String(vote.user) === req.loggedUser._id) {
                        flag = true
                        data = vote
                    }
                })
                if (!flag) {
                    return Question.updateOne(
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
                    return Question.updateOne(
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
                    return Question.updateOne({
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
        Question.findById(req.params.id)
            .then(question => {
                let votes = question.votes
                let flag = false
                let data = {}
                votes.forEach(vote => {
                    if (String(vote.user) === req.loggedUser._id) {
                        flag = true
                        data = vote
                    }
                })
                if (!flag) {
                    return Question.updateOne(
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
                    return Question.updateOne(
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
                    return Question.updateOne({
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

    static tag(req, res, next) {
        Question.aggregate([
            // Unwind the array
            { "$unwind": "$tags" },

            // Group on tags with a count
            {
                "$group": {
                    "_id": "$tags",
                    "count": { "$sum": 1 }
                }
            },

            // Optionally sort the tags by count descending
            { "$sort": { "count": -1 } },

            // Optionally limit to the top "n" results. Using 10 results here
            { "$limit": 4 }
        ])
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = QuestionC
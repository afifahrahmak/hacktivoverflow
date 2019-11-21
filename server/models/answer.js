const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    answer: {
        type: String,
        required: [true, 'answer is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        value: { type: Number }
    }],
}, {
    timestamps: true,
})

const Answer = mongoose.model('answer', answerSchema)
module.exports = Answer
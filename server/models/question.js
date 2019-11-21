const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    question: {
        type: String,
        required: [true, 'question is required']
    },
    tags: [String],
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
    answer: [{ type: Schema.Types.ObjectId, ref: 'answer' }]
}, {
    timestamps: true,
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question
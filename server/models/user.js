const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required']
        // minlength: [8, 'min 8 char'],
        // match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password harus minimal 5 karakter dan harus gabungan huruf dan angka']
    }
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
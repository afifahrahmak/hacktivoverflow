const User = require('../models/user'),
    { compare } = require('../helpers/bcrypt'),
    { generateToken } = require('../helpers/jwt');
    // { OAuth2Client } = require('google-auth-library'),
    // mailer = require("../helpers/nodemailer")

class UserController {

    static register(req, res, next) {
        let { username, email, password } = req.body
        User.create({ username, email, password })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({
            email: email
        })
            .then(user => {
                if (!user) {
                    next({ status: 403, message: 'Invalid password or email' })
                } else {

                    let authPass = compare(password, user.password)
                    if (authPass) {
                        let username = user.username,
                            email = user.email,
                            _id = user._id;

                        const token = generateToken({
                            username: username,
                            email: email,
                            id: _id
                        })
                        res.status(200).json({ token, username, email })
                    } else {
                        next({ status: 403, message: 'Invalid password or email' })
                    }
                }
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {
        const clientId = process.env.GOOGLE_CLIENT_ID
        let googlePayload = ''
        const client = new OAuth2Client(clientId)
        client.verifyIdToken({
            idToken: req.body.token,
            audience: clientId
        })
            .then(ticket => {
                googlePayload = ticket.getPayload()
                return User.findOne({
                    email: googlePayload.email
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        name: googlePayload.name,
                        email: googlePayload.email,
                        password: process.env.PASSWORD_USER,
                        isGoogle: true
                    })
                }
            })
            .then(user => {
                let name = user.name,
                    email = user.email,
                    id = user._id;
                let payload = {
                    id: id,
                    name: name,
                    email: email
                },
                    token = generateToken(payload)
                res.status(200).json({ token, name, email })
            })
            .catch(next)
    }

    static subscribe(req, res, next) {
        let email = req.loggedUser.email,
            name = req.loggedUser.name;
        return mailer(email, name)
    }
}

module.exports = UserController
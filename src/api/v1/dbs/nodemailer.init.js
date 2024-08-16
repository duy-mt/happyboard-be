'use strict'

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
    user: process.env.EMAIL_USERNAME ? process.env.EMAIL_USERNAME : "thangvb.dev@gmail.com",
    pass: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD : "bpmb zhbp xtaf pqmk",
    },
})

module.exports = {
    transport
}
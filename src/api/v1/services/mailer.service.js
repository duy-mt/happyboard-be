'use strict'

const { transport } = require('../dbs/nodemailer.init')

class MailerService {
    static sendMail = async ({ toEmail, subject, text, html }) => {
        try {
            const mailOptions = {
                from: '"[no-reply] happyboard.io.vn" <happyboard@gmail.com>',
                to: toEmail,
                subject,
                text,
                html,
            }

            let info = await transport.sendMail(mailOptions)
            if (info.messageId) return 1
            return 0
        } catch (error) {
            console.error(error)
            return 0
        }
    }
}

module.exports = MailerService

const fs = require('fs');
const path = require('path');

const htmlForgotPW = async ({
    email, token
}) => {
    let url = process.env.DOMAIN_RESET_PASSWORD + `/${token}`
    let data = await fs.readFileSync(path.resolve(__dirname, 'forgotPW.html'), 'utf8')
    data = data.replace('@@@url@@@', url)
    return data;
}

const htmlBlockUser = async ({
    email
}) => {
    let data = await fs.readFileSync(path.resolve(__dirname, 'blockUser.html'), 'utf8')
    data = data.replace('@@@email@@@', email)
    return data
}

module.exports = {
    htmlForgotPW,
    htmlBlockUser,
}

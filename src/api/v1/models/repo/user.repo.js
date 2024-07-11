'use strict'

const { User } = require('../index')

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } })
}

const createUser = async ({ email, password, firstName, lastName }) => {
    try {
        const user = await User.create({
            email, password, firstName, lastName
        })
        return user
    } catch (error) {
        console.error(`Error creating new user with email: ${email}`, error)
        throw error
    }
}


module.exports = {
    findUserByEmail,
    createUser
}
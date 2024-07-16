'use strict'

const { User } = require('../index')

// CREATE
const createUser = async ({ email, password, username }) => {
    try {
        const user = await User.create({
            email, password, username
        })
        return user
    } catch (error) {
        console.error(`Error creating new user with email: ${email}`, error)
        throw error
    }
}

// READ
const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } })
}

const findUserByUserId = async (userId) => {
    const user = await User.findByPk(userId)
    return user?.dataValues
}

// UPDATE
const updateUserByUserId = async ({
    userId, payload = {} 
}) => {
    const holderUser = await findUserByUserId(userId)
    const updatedUser = await holderUser.update(
        payload
    )
    return await updatedUser
}


// DELETE


module.exports = {
    createUser,
    findUserByEmail,
    updateUserByUserId,
    findUserByUserId
}
'use strict'

const { processReturnedData, removeField } = require('../../utils')
const { User } = require('../index')

// CREATE
const createUser = async ({ email, password, username }) => {
    try {
        const user = await User.create({
            email,
            password,
            username,
        })
        
        return user.get({ plain: true });
    } catch (error) {
        console.error(`Error creating new user with email: ${email}`, error);
        throw error;
    }
}

// READ
const findAllUsers = async () => {
    const users = await User.findAll({
        attributes: ['username', 'email', 'avatar', 'status', 'createdAt', 'updatedAt'],
        raw: true
    })
    return processReturnedData(users)
}

const findUserByEmail = async (email) => {
    const user = await User.findOne({ 
        where: { 
            email 
        },
        attributes: ['id', 'email', 'username', 'password', 'avatar', 'status'],
        raw: true,
    })

    return {
        password: user?.password,
        user: user ? removeField({
            obj: user,
            field: ['password']
        }) : null
    }
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
    findAllUsers,
    findUserByEmail,
    findUserByUserId,
    updateUserByUserId,
}
'use strict'

const { processReturnedData, removeField } = require('../../utils')
const { User } = require('../index')

// CREATE
const createUser = async ({ email, password, username, avatar = '' }) => {
    try {
        const user = await User.create({
            email,
            password,
            username,
            avatar,
            status: 'active'
        })
        
        return user.get({ plain: true });
    } catch (error) {
        console.error(`Error creating new user with email: ${email}`, error);
        throw error;
    }
}

// READ
const findAllUsers = async ({
    offset, limit
}) => {
    const { count, rows: users } = await User.findAndCountAll({
        attributes: ['id', 'username', 'email', 'avatar', 'status', 'isOnline', 'createdAt', 'updatedAt'],
        offset,
        limit,
        order: [['id', 'DESC']]     
    })
    
    return {
        users: processReturnedData(users),
        count
    }
}

const findUserByEmail = async (email) => {
    const user = await User.findOne({ 
        where: {    
            email 
        },
        attributes: ['id', 'email', 'username', 'password', 'avatar', 'status', 'isOnline'],
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
    return processReturnedData(user)
}

// UPDATE
const updateUserByUserId = async ({
    userId, payload = {} 
}) => {
    if(Object.keys(payload).length === 0) return 1
    const [updatedUser] = await User.update(
        payload,
        {
            where: {
                id: userId
            },
            attributes: ['id', 'email', 'username', 'password', 'avatar', 'status', 'isOnline'],
            raw: true,
        }
    )
    return updatedUser
}

// DELETE


module.exports = {
    createUser,
    findAllUsers,
    findUserByEmail,
    findUserByUserId,
    updateUserByUserId,
}
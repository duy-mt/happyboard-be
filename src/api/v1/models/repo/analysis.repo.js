const { User, Idea } = require('../index')
const { fn, col, Op, literal } = require('sequelize')

const getInfoNewUserByDate = async (time = '7 days') => {
    return await User.findAll({
        attributes: [
            [fn('DATE', col('createdAt')), 'date'],
            [fn('COUNT', col('id')), 'userCount'],
        ],
        where: {
            createdAt: {
                [Op.gte]: literal(`NOW() - INTERVAL '${time}'`),
            },
        },
        group: [fn('DATE', col('createdAt'))],
        order: [[fn('DATE', col('createdAt')), 'DESC']],
    })
}

const getInfoIdeasByDate = async (time = '7 days', isPublished) => {
    console.log(time)
    let query = {
        attributes: [
            [fn('DATE', col('updatedAt')), 'date'],
            [fn('COUNT', col('title')), 'ideaCount'],
        ],
        where: {
            isDrafted: false,
            deletedAt: null,
            createdAt: {
                [Op.gte]: literal(`NOW() - INTERVAL '${time}'`),
            },
        },
        group: [fn('DATE', col('updatedAt'))],
        order: [[fn('DATE', col('updatedAt')), 'DESC']],
    }

    if (isPublished) {
        query.where.isPublished = isPublished
    }

    return await Idea.findAll(query)
}

module.exports = {
    getInfoNewUserByDate,
    getInfoIdeasByDate,
}

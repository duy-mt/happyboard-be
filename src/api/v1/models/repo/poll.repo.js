'use strict'

const { Poll } = require('../index')

const createPoll = async ({
    isActive = true,
    ideaId,
    expireHour,
    remindBeforeExpireTime,
}) => {
    return await Poll.create({
        isActive,
        ideaId,
        expireHour,
        remindBeforeExpireTime,
    })
}

const findPollIdbyIdeaId = async (ideaId) => {
    return await Poll.find(
        {
            where: {
                ideaId: ideaId,
            },
        },
        { returning: ['id'] },
    )
}

module.exports = {
    createPoll,
    findPollIdbyIdeaId,
}

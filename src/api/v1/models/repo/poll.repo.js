'use strict'

const { Poll, Op, Poll_option } = require('../index')
const { processReturnedData } = require('../../utils')

const findOptionByPollId = async ({ pollId }) => {
    const poll = await Poll.findOne({
        where: {
            id: pollId
        },
        attributes: ['id', 'ideaId', 'isActive', 'expireHour', "remindBeforeExpireTime"],
        include: [
            {
                model: Poll_option,
                as: 'options',
                attributes: ['optionText', 'votes'],
            },
        ],
    })

    
    return poll && processReturnedData(poll)
}

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
    findOptionByPollId,
}

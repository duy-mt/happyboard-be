'use strict'

const { createPoll, findOptionByPollId } = require('../models/repo/poll.repo')
const {
    upVoteForPoll,
    findOptionById,
} = require('../models/repo/poll_option.repo')
const {
    createPollResponse,
    findConfirmVotedPoll,
} = require('../models/repo/poll_response.repo')
const { findIdeabyPollId } = require('../models/repo/idea.repo')
const HistoryService = require('./history.service')
const { sequelize } = require('../models')

class PollService {
    static getOptionByPollId = async ({ pollId }) => {
        const poll = await findOptionByPollId({ pollId })
        return poll
    }

    static createPoll = async ({ ideaId, endDate }) => {
        return await createPoll({
            ideaId,
            endDate,
        })
    }

    static createVoteForPoll = async ({ userId, pollId, pollOptionId }) => {
        const transaction = await sequelize.transaction()

        await upVoteForPoll({ pollOptionId }, { transaction })
        await createPollResponse(
            { userId, pollId, pollOptionId },
            { transaction },
        )

        const savedIdea = await findIdeabyPollId({pollId})

        await HistoryService.createHistory({
            type: 'CP01',
            userId,
            userTargetId: userId,
            objectTargetId: savedIdea.id,
            contentIdea: savedIdea.title,
        })
        return 1
    }

    static deletePoll = async ({ ideaId, userId }) => {
        return await deletePoll({
            ideaId,
            userId,
        })
    }
}

module.exports = PollService

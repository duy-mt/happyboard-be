'use strict'

const { Vote } = require('../index')

const createVote = async ({
    userId, ideaId
}) => {
    const [vote, isCreated] = await Vote.findOrCreate({
        where: {
            userId,
            ideaId
        }
    })

    return {
        vote, isCreated
    }
}

const deleteVote = async ({
    ideaId, userId
}) => {
    return await Vote.destroy({
        where: {
            ideaId,
            userId
        }
    })
}

const findVote = async({
    userId, ideaId
}) => {
    return await Vote.findOne({
        where: {
            ideaId,
            userId
        }
    })
}

const upVote = async () => {
    // const [vote, isCreated] = await Vote.findOrCreate({
    //     where: {
    //         userId,
    //         ideaId
    //     },
    //     defaults: {
    //         status: 1,
    //     },
    // })
    // const point = 1

    // const isVoted = vote.status == -1 ? true : false
    // if(!isCreated) {
    //     vote.status = -1
    //     await vote.save()
    // }

    // return isVoted
}

module.exports = {
    createVote,
    deleteVote,
    findVote,
    // updateVote,
    upVote
}
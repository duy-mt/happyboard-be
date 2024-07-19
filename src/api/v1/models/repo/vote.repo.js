'use strict'

const { Vote } = require('../index')

const upVote = async ({
    userId, ideaId
}) => {
    const [vote, isCreated] = await Vote.findOrCreate({
        where: {
            userId,
            ideaId
        },
        defaults: {
            status: 1,
        },
    })
    let point = 1

    if(!isCreated) {
        if(vote.status == -1) {
            point = 2
            vote.status = 1
        } else {
            point = 0
        }
        await vote.save()
    }

    return point
}

const downVote = async ({
    userId, ideaId
}) => {
    const [vote, isCreated] = await Vote.findOrCreate({
        where: {
            userId,
            ideaId
        },
        defaults: {
            status: -1,
        },
    })
    let point = 1

    if(!isCreated) {
        if(vote.status == 1) {
            point = 2
            vote.status = -1
        } else {
            point = 0
        }
        await vote.save()
    }

    return point
}

const deleteVote = async ({
    userId, ideaId
}) => {
    const v = await Vote.findOne({
        where: {
            userId, 
            ideaId
        },
        raw: true
    })
    let point = v ? -v.status : 0

    await Vote.destroy({
        where: {
            userId, 
            ideaId
        },
        force: true
    })
    return point
}


module.exports = {
    upVote,
    downVote,
    deleteVote
}
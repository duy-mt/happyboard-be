'use strict'

const { where } = require('sequelize')
const { Reaction } = require('../index')

const updateReaction = async ({
    commentId, userId, reaction
}) => {
    let [r, isCreated] = await Reaction.findOrCreate({
        where: {
            userId,
            commentId
        },
        defaults: {
            name: reaction
        }
    })

    if(!isCreated) {
        r.name = reaction
        await r.save()
    }

    return r
}

const countReactionByCommentId = async ({
    commentId
}) => {
    const count = await Reaction.count({
        where: {
            commentId
        }
    })

    return count
}

const checkReaction = async ({
    commentId, userId
}) => {
    console.log(`commentId`, commentId);
    console.log(`userId`, userId);
    const reaction = await Reaction.findOne({
        where: {
            userId,
            commentId
        },
        raw: true
    })
    console.log(reaction);
    return reaction?.name
}

const deleteReaction = async ({
    commentId, userId
}) => {
    const r = await Reaction.findOne({
        where: {
            commentId, userId
        }
    })
    if(r) {
        await r.destroy({
            force: true,
        })
    }
    return 1
}

module.exports = {
    updateReaction,
    countReactionByCommentId,
    checkReaction,
    deleteReaction
}
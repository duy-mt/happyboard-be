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

// const updateVote = async ({
//     ideaId, userId, action
// }) => {
//     const [vote, isCreated] = await Vote.findOrCreate(
//         {
//             where: {
//                 userId,
//                 ideaId
//             },
//             defaults: {
//                 action
//             }
//         }
//     )
//     if(!isCreated) {
//         vote.update({
//             action
//         })
//     }
//     return {
//         vote, isCreated
//     }
// }

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

module.exports = {
    createVote,
    deleteVote,
    // updateVote,
}
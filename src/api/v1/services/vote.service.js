'use strict'

const { createVote, deleteVote } = require("../models/repo/vote.repo")
const IdeaService = require("./idea.service")

class VoteService {
    static createVote = async ({
        ideaId, userId
    }) => {
        const {
            vote, isCreated
        } = await createVote({
            ideaId, userId
        })
        // if(isCreated) {
            
        // }

        return vote
    }  

    static deleteVote = async({
        ideaId, userId
    }) => {
        return await deleteVote({
            ideaId, userId
        })
    }
}

module.exports = VoteService
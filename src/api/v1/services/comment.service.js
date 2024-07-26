'use strict'

const { BadRequest } = require("../core/error.response")
const { 
    createComment, getCommentsByIdeaId, getCommentById 
} = require("../models/repo/comment.repo")
const { findUserIdByIdeaId } = require("../models/repo/idea.repo")
const { updateReaction, countReactionByCommentId, checkReaction, deleteReaction } = require("../models/repo/reaction.repo")
const { processReturnedData, sortComment } = require("../utils")
const { sendMessage } = require('./rabbitmq.service')

class CommentService {
    static createComment = async ({
        content, userId, ideaId, parentId = null
    }) => {

        if(parentId) {
            const parentComment = await getCommentById(parentId)
            if(parentComment.ideaId != ideaId) throw new BadRequest('Comment Again')
            if(parentComment.parentId) parentId = parentComment.parentId
        }

        const receiver = await findUserIdByIdeaId({ id: ideaId })
        const data = {
            sender: userId,
            receiver: receiver.toString() 
        }
        await sendMessage({
            queueName: 'comment',
            msg: JSON.stringify(data)
        })

        const savedComment = await createComment({
            content, userId, ideaId, parentId
        })
        
        return processReturnedData(savedComment)
    }

    static getCommentByIdeaId = async ({
        userId, ideaId
    }) => {
        let { comments, totalCount: commentCount } = await getCommentsByIdeaId(ideaId)
        for(let i = 0; i < commentCount; i++) {
            let c = comments[i]
            let count = await countReactionByCommentId({
                commentId: c.id
            })
            let r = await checkReaction({
                userId, commentId: c.id
            })
            c.reactionCount = count
            c.reaction = r || null
        }
        return {
            comments: sortComment(comments),
            commentCount
        }
    }

    static getCommentByParentId = async (parentId) => {
        const comments = getCommentsByParentId(parentId)

        return comments
    }

    static reactionComment = async ({
        commentId, userId, reaction
    }) => {
        const r = await updateReaction({
            commentId, userId, reaction
        })
        const receiver = await findUserIdByIdeaId({ id:1 }) //fake
        const data = {
            sender: userId,
            receiver: receiver.toString() 
        }
        await sendMessage({
            queueName: 'reaction',
            msg: JSON.stringify(data)
        })

        return r
    }

    static cancelReaction = async ({
        userId, commentId
    }) => {
        return await deleteReaction({
            userId, commentId
        })
    }
}

module.exports = CommentService
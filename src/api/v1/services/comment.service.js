'use strict'

const { BadRequest } = require('../core/error.response')
const {
    createComment,
    getCommentsByIdeaId,
    getCommentById,
    deleteCommentByIdeaId,
} = require('../models/repo/comment.repo')
const { findUserIdByIdeaId, findIdea } = require('../models/repo/idea.repo')
const {
    updateReaction,
    countReactionByCommentId,
    checkReaction,
    deleteReaction,
} = require('../models/repo/reaction.repo')
const { processReturnedData, sortComment } = require('../utils')
const HistoryService = require('./history.service')
const MessageQueue = require('./rabbitmq.service')

class CommentService {
    static createComment = async ({
        content,
        userId,
        ideaId,
        parentId = null,
    }) => {
        if (!content || !content.trim()) throw new BadRequest('Missing content')

        let ideaHolder = await findIdea({
            id: ideaId,
        })
        if (!ideaHolder)
            throw new BadRequest("Idea is not exist! So don't create comment")
        let type = 'CC01'
        let contentComment
        if (parentId) {
            const parentComment = await getCommentById(parentId)
            contentComment = parentComment.content
            if (parentComment.ideaId != ideaId)
                throw new BadRequest('Comment Again')
            if (parentComment.parentId) parentId = parentComment.parentId
            type = 'RC01'
        }

        const receiver = await findUserIdByIdeaId({ id: ideaId })

        if (ideaHolder.userId != receiver) {
            const data = {
                sender: userId,
                receiver: receiver.toString(),
                target: 'idea',
                action: 'comment',
                metadata: {
                    targetId: ideaId,
                },
            }
            await MessageQueue.send({
                nameExchange: 'post_notification',
                message: data,
            })
        }

        const savedComment = await createComment({
            content,
            userId,
            ideaId,
            parentId,
        })
        await HistoryService.createHistory({
            type,
            userId,
            userTargetId: receiver,
            objectTargetId: ideaId,
            objectTargetLv2Id: parentId,
            contentIdea: ideaHolder.title,
            contentComment: contentComment,
        })
        return processReturnedData(savedComment)
    }

    static getCommentByIdeaId = async ({ userId, ideaId }) => {
        let ideaHolder = await findIdea({
            id: ideaId,
        })
        if (!ideaHolder)
            throw new BadRequest("Idea is not exist! So don't get comment")
        let { comments, totalCount: commentCount } =
            await getCommentsByIdeaId(ideaId)
        for (let i = 0; i < commentCount; i++) {
            let c = comments[i]
            let count = await countReactionByCommentId({
                commentId: c.id,
            })
            let r = await checkReaction({
                userId,
                commentId: c.id,
            })
            c.reactionCount = count
            c.reaction = r || null
        }
        return {
            comments: sortComment(comments),
            commentCount,
        }
    }

    static getCommentByParentId = async (parentId) => {
        const comments = getCommentsByParentId(parentId)

        return comments
    }

    static reactionComment = async ({ commentId, userId, reaction }) => {
        // ? when del idea -> del comment
        let cmt = await getCommentById(commentId)
        if (!cmt) throw new BadRequest('Comment is not exist!')
        let idea = await findIdea({ id: cmt.ideaId })
        if (!idea) throw new BadRequest('Comment is not exist!')
        const r = await updateReaction({
            commentId,
            userId,
            reaction,
        })

        const receiver = cmt.userId

        if (idea.userId != receiver) {
            const data = {
                sender: userId,
                receiver: receiver.toString(),
                target: 'comment',
                action: 'reaction',
                metadata: {
                    targetId: commentId,
                },
            }

            await MessageQueue.send({
                nameExchange: 'post_notification',
                message: data,
            })
        }

        await HistoryService.createHistory({
            type: 'RC02',
            userId,
            userTargetId: receiver,
            objectTargetId: cmt.ideaId,
            objectTargetLv2Id: cmt.id,
            contentIdea: idea.title,
            contentComment: cmt.content,
        })

        return r
    }

    static cancelReaction = async ({ userId, commentId }) => {
        return await deleteReaction({
            userId,
            commentId,
        })
    }

    static deleteCommentByIdeaId = async (ideaId) => {
        let { totalCount } = await getCommentsByIdeaId(ideaId)
        let deleted = await deleteCommentByIdeaId(ideaId)
        if (totalCount === deleted) return 1
        return 0
    }
}

module.exports = CommentService

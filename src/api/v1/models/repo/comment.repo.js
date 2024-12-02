'use strict'

const { where } = require('sequelize')
const { processReturnedData } = require('../../utils')
const { Comment, User, Idea } = require('../index')
// const { deleteComment } = require('../../services/comment.service')

/*
FROM - WHERE - GROUP BY - HAVING - ORDER BY
*/
const queryCommentWithReaction = {
    include: [
        {
            model: User,
            attributes: ['id', 'username', 'email', 'avatar'],
        },
    ],
    attributes: {},
    order: [
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
    ],
}

const queryMyComment = {
    include: [
        {
            model: User,
            attributes: ['id', 'username', 'email', 'avatar'],
        },
        {
            model: Idea,
            attributes: ['id', 'title', 'userId']
        }
    ],
    attributes: {},
    order: [
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
    ],
    offset: 0,
    limit: 5
}

const createComment = async ({ content, userId, ideaId, parentId }) => {
    const comment = Comment.create({
        content,
        userId,
        ideaId,
        parentId,
    })

    const idea = await Idea.findByPk(ideaId)

    await idea.increment('commentCount', {
        by: 1,
    })

    return comment
}

// FIND
const getCommentsByIdeaId = async (ideaId) => {
    const [comments, totalCount] = await Promise.all([
        Comment.findAll({
            where: { ideaId },
            ...queryCommentWithReaction,
        }),
        Comment.count({ where: { ideaId } }),
    ])

    return { comments: processReturnedData(comments), totalCount }
}

const getCommentsByParentId = async (parentId) =>
    await Comment.findAll({
        where: { parentId },
    })

const getCommentById = async (id) => {
    return await Comment.findByPk(id, {
        raw: true,
    })
}

const deleteCommentByIdeaId = async (ideaId) => {
    const deleted = await Comment.destroy({
        where: {
            ideaId,
        },
    })
    return deleted
}

const editComment = async ({content, id}) => {
    const comment = await Comment.update({ content }, {
        where: { id },
    })
    return comment
}

const deleteComment = async ({ id }) => {
    await Comment.destroy({
        where: {
            id
        }
    })
}

const getMyComments = async ({ limit, page, userId }) => {
    let offset = (page - 1) * limit
    queryMyComment.offset = offset
    queryMyComment.limit = limit
    let {count, rows: comments} = await Comment.findAndCountAll({
        where: {
            userId
        },
        ...queryMyComment
    })
    comments = await mapCommentsWithIdeaAuthor(comments.map(comment => comment.toJSON()))
    const totalPage = Math.ceil(count / limit)
    return {
        totalPage: totalPage,
        currentPage: page, 
        pageSize: limit, 
        total: count, 
        comments,
    }
}

const mapCommentsWithIdeaAuthor = async (comments) => {
    const commentsWithIdeaAuthor = await Promise.all(
      comments.map(async (comment) => {
        const ideaAuthor = await User.findAll   ({
            where: {id: comment.Idea.userId},
            attributes: ['username', 'avatar']
        }
        )
        return {
          ...comment,
          ideaAuthor,
        }
      })
    )
    return commentsWithIdeaAuthor
  }

module.exports = {
    createComment,
    getCommentsByIdeaId,
    getCommentsByParentId,
    getCommentById,
    deleteCommentByIdeaId,
    editComment,
    deleteComment,
    getMyComments
}

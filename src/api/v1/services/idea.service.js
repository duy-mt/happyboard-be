'use strict'

const { BadRequest } = require("../core/error.response")
const { createIdea, findAllIdeas, findAllIdeasByUsedId, findIdeaPage, findIdea, increaseVoteCount, searchIdea, decrementVoteCount } = require("../models/repo/idea.repo")
const { insertDataByES, searchDataByES } = require('../elastic/idea.elastic')
const { findVote } = require('../models/repo/vote.repo')
const { convertTime, getModel } = require("../utils")

class IdeaService {
    static createIdea = async ({
        title, content, categoryId, userId
    }) => {
        if(!content || !title) throw new BadRequest('Title and content are required')
        categoryId = categoryId ? categoryId : 0

        const idea = await createIdea({
            title, content, categoryId, userId
        })

        // Ingest elastic
        await insertDataByES({
            obj: idea
        })

        return idea
    }

    // static getIdea = async (id) => {
    //     const {
    //         Category, User, comments, ...ideaData
    //     } = await findIdea(id)

    //     const {
    //         id: ideaId,
    //         userId,
    //         title,
    //         commentCount,
    //         voteCount,
    //         content,
    //         createdAt
    //     } = ideaData.dataValues

    //     const {
    //         username
    //     } = User

    //     const vote = await findVote({
    //         userId,
    //         ideaId
    //     })
    //     const isVoted = vote ? true : false

    //     const handleComment = comments.map(cmt => {
    //         const {
    //             User, ...data
    //         } = cmt
    //         const {
    //             id,
    //             content,
    //             createdAt
    //         } = data.dataValues

    //         return {
    //             id,
    //             author: User.username,
    //             content,
    //             createAt: convertTime(createdAt)
    //         }
    //     })

    //     return {
    //         id: ideaId,
    //         author: username,
    //         title,
    //         category: {
    //             title: Category.title,
    //             icon: Category.icon
    //         },
    //         totalComment: commentCount,
    //         totalVote: voteCount,
    //         totalView: 100,
    //         description: content,
    //         isVoted,
    //         createAt: convertTime(createdAt),
    //         comments: handleComment
    //     }
    // }

    static getIdea = async (id) => {
        const options = {
            include: [{
                model: getModel('Comment'),
                as: 'comments',
                include: [
                    {
                        model: getModel('User'),
                        attributes: ['username']
                    }
                ]
                }, {
                    model: getModel('Category'),
                    attributes: ['title', 'icon']
                }, 
                {
                    model: getModel('User'),
                    attributes: ['username', 'email']
                },
            ],
            // attributes: ['id', 'title', 'content', 'voteCount', 'commentCount']
        }

        const ideas = await findIdea({id, options})

        return ideas
    }

    static getAllIdeas = async ({
        limit = 5, page = 1
    }) => {
        const {
            ideas, totalIdea
        } = await findIdeaPage({ limit, page })

        // const data = await Promise.all(ideas.map(async (idea) => {
        //     const { User, Category, ...ideaData} = idea.get({ plain: true })

        //     const vote = await findVote({
        //         ideaId: ideaData.id,
        //         userId: ideaData.userId
        //     })

        //     const isVoted = vote ? true : false

        //     return {
        //         // ...ideaData,
        //         id: ideaData.id,
        //         author: User.username,
        //         title: ideaData.title,
        //         category: Category.title,
        //         totalComment: ideaData.commentCount,
        //         totalVote: ideaData.voteCount,
        //         totalView: 100,
        //         description: ideaData.content,
        //         isVoted,
        //         createAt: convertTime(ideaData.createdAt)
        //     }
        // }))

        const totalPage = Math.ceil(totalIdea / limit);

        return {
            totalPage: totalPage,
            currentPage: page,
            pageSize: limit,
            total: totalIdea,
            ideas,
        }
    }

    static getAllIdeasByUserId = async (userId) => {
        const ideas = await findAllIdeasByUsedId(userId) 
        return ideas
    }

    static searchIdea = async ({q, limit = 5, page = 1}) => {
        const {ideas, totalPages} = await searchIdea({
            q, page, limit
        })
        return {
            metadata: {
                currentPage: page,
                totalPages,
                limit
            },
            ideas,
        }
    }

    static upVoteCount = async({
        ideaId, userId
    }) => {
        return await increaseVoteCount({
            ideaId,
            userId
        })
    }

    static downVoteCount = async({
        ideaId, userId
    }) => {
        return await decrementVoteCount({
            ideaId,
            userId
        })
    }
}

module.exports = IdeaService
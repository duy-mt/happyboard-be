'use strict'

const { OK, Created } = require('../core/success.response')
const PollService = require('../services/poll.service')

class PollController {
    // createPoll = async (req, res, next) => {
    //     new Created({
    //         message: 'Created poll successfully!',
    //         data: await PollService.createPoll(req.body),
    //     }).send(res)
    // }

    // getAllCategories = async (req, res, next) => {
    //     new OK({
    //         message: 'Get all categories successfully',
    //         data: await PollService.getAllCategories(),
    //     }).send(res)
    // }

    getOptionByPollId = async (req, res, next) => {
        new OK({
            message: 'Get options successfully',
            data: await PollService.getOptionByPollId({
                pollId: req.params.id,
            }),
        }).send(res)
    }

    createVoteForPoll = async (req, res, next) => {
        const userId = req.headers['x-client-id']
        new OK({
            message: 'Vote poll option successfully',
            data: await PollService.createVoteForPoll({
                userId: userId,
                pollId: req.body.pollId,
                pollOptionId: req.body.pollOptionId,
            }),
        }).send(res)
    }

    // updatePoll = async (req, res, next) => {
    //     let payload = {
    //         ...req.body,
    //         pollId: req.params.pollId,
    //     }
    //     new OK({
    //         message: 'Update poll successfully',
    //         data: await PollService.updatePoll(payload),
    //     }).send(res)
    // }

    // deletePoll = async (req, res, next) => {
    //     new OK({
    //         message: 'Delete poll successfully',
    //         data: await PollService.deletePoll(req.params.pollId),
    //     }).send(res)
    // }
}

module.exports = new PollController()

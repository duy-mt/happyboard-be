'use strict'

const { BadRequest } = require('../core/error.response')
const { OK, Created } = require('../core/success.response')
const UploadService = require('../services/upload.service')

class UploadController {
    uploadFileThumb = async (req, res, next) => {
        const { file } = req
        const userId = req.headers['x-client-id']
        if (!file) {
            throw new BadRequest('File missing')
        }
        new OK({
            message: 'Upload Thumbnail successfully',
            data: await UploadService.uploadImageFromLocal({
                path: file.path,
                folderName: 'user/avatar',
                filename: userId,
            }),
        }).send(res)
    }

    uploadURLThumb = async (req, res, next) => {
        const { userId, url: urlImage } = req.body
        new OK({
            message: 'Upload Thumbnail successfully',
            data: await UploadService.uploadFromURL({
                urlImage,
                folderName: 'user/avatar',
                filename: userId,
            }),
        }).send(res)
    }
}

module.exports = new UploadController()

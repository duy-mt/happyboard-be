'use strict'

const cloudinary = require('../dbs/cloudinary.init')

class UploadService {
    static uploadImageFromLocal = async ({ path, folderName = 'user/avatar', filename = 'unknown' }) => {
        try {
            const result = await cloudinary.uploader.upload(path, {
                public_id: filename,
                folder: folderName
            })
            return {
                image_url: result.secure_url,
                thumb_url: await cloudinary.url(result.public_id, {
                    width: 200,
                    height: 200,
                    crop: 'fill',
                    format:'jpg'
                })
            }   
        } catch (err) {
            console.log(err)
        }
    }

    static uploadFromURL = async ({
        urlImage, folderName = 'user/avatar', filename = 'unknown'
    }) => {
        try {
            const result = await cloudinary.uploader.upload(urlImage, {
                public_id: filename,
                folder: folderName
            })
            return {
                image_url: result.secure_url,
                thumb_url: await cloudinary.url(result.public_id, {
                    width: 200,
                    height: 200,
                    crop: 'fill',
                    format:'jpg'
                })
            } 
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = UploadService
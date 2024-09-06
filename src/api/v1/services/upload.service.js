'use strict'

const cloudinary = require('../dbs/cloudinary.init')

class UploadService {
    static uploadImageFromLocal = async ({
        path,
        folderName = 'user/avatar',
        filename = 'unknown',
    }) => {
        try {
            const result = await cloudinary.uploader.upload(path, {
                public_id: filename,
                folder: folderName,
            })
            return {
                image_url: result.secure_url,
                thumb_url: await cloudinary.url(result.public_id, {
                    width: 200,
                    height: 200,
                    crop: 'fill',
                    format: 'jpg',
                }),
            }
        } catch (err) {
            console.log(err)
        }
    }

    static uploadFromURL = async ({
        urlImage,
        folderName = 'user/avatar',
        filename = 'unknown',
    }) => {
        try {
            const result = await cloudinary.uploader.upload(urlImage, {
                public_id: filename,
                folder: folderName,
            })
            return {
                image_url: result.secure_url,
                thumb_url: await cloudinary.url(result.public_id, {
                    width: 200,
                    height: 200,
                    crop: 'fill',
                    format: 'jpg',
                }),
            }
        } catch (err) {
            console.log(err)
        }
    }

    static uploadFromBuffer = async ({
        file,
        folderName = 'user/avatar',
        filename = 'unknown',
    }) => {
        console.log(`filename::`, filename)
        try {
            const buffer = new Uint8Array(file.buffer)
            let result = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            use_filename: true,
                            unique_filename: false,
                            folder: folderName,
                            overwrite: true,
                            public_id: filename,
                        },
                        function (error, result) {
                            if (error) {
                                reject(error)
                                return
                            }
                            resolve(result)
                        },
                    )
                    .end(buffer)
            })
            return result
        } catch (error) {
            console.log(`Error Upload Image:`, error.message)
        }
    }
}

module.exports = UploadService

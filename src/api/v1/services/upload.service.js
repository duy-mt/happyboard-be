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
        folderName = 'default',
        filename = 'unknown',
    }) => {
        console.log(`filename::`, filename)
        const isImage = file.mimetype.startsWith('image/')
        const isVideo = file.mimetype.startsWith('video/')

        // Kiểm tra xem file có phải là video hoặc hình ảnh
        if (!isImage && !isVideo) {
            throw new Error(
                'Invalid file type. Only images or videos are allowed.',
            )
        }

        try {
            const buffer = new Uint8Array(file.buffer)

            // Upload ảnh và video xử lý riêng biệt
            let result
            let thumbnailUrl
            if (isImage) {
                result = await new Promise((resolve, reject) => {
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
            } else if (isVideo) {
                result = await new Promise((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream(
                            {
                                resource_type: 'video', // Xác định rằng đây là video
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
                thumbnailUrl = cloudinary.url(result.public_id, {
                    resource_type: 'video',
                    format: 'png',
                    transformation: [
                        {
                            width: 300,
                            height: 200,
                            crop: 'thumb',
                            gravity: 'face',
                        }, // Example transformation for video thumbnail
                    ],
                })
            }

            // Kiểm tra kết quả trả về
            if (result && result.url) {
                result.thumbnailUrl = thumbnailUrl
                console.log('Upload successful: ', result.url, result.thumbnailUrl)
                return result
            } else {
                throw new Error('Upload failed: No URL returned')
            }
        } catch (error) {
            console.log(`Error Upload:`, error.message)
            throw error // Ném lỗi lên để dễ dàng xử lý ở nơi gọi
        }
    }
}

module.exports = UploadService

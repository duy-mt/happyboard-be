const dev = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || `happyboardofthangvb`,
    api_key: process.env.CLOUDINARY_API_KEY || `513786877261792`,
    api_secret: process.env.CLOUDINARY_API_SECRET || `CcLosrynGsiagy9kzUijl-my_Cs`
}

const prod = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}

let config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]

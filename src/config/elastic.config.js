const dev = {
    cloudID: `DEPLOYMENT_NAME:${process.env.DEV_ES_CLOUDID}`, 
    username: process.env.DEV_ES_USER,
    password: process.env.DEV_ES_PW
}

const config = {
    dev
}

const env = process.env.NODE_ENV || 'dev'


module.exports = config[env]
// CLOUD
const dev = {
    node: 'https://localhost:9200',
    auth: {
        username: process.env.DEV_ES_USER || 'elastic',
        password: process.env.DEV_ES_PW || 'pwelastic',
    },
    tls: {
        rejectUnauthorized: false,
    },
}

// 355139ffce6342abb1325c087525040e:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQzNDMxNGE3ZjJlOWQ0YWFkYmVhNzFkMmUyM2E5OTZlMSRhZmY5NzJjNDk5ZTA0NDlkYTVlNDkxNzFhZjkyYWMzZQ==
// CJHJPBft8P2jp39FpkBzEPgi

// LOCAL
const prod = {
    cloud: {
        id:
            process.env.CLOUD_ES_CLOUDID ||
            'Happyboard_ES:YXNpYS1zb3V0aGVhc3QxLmdjcC5lbGFzdGljLWNsb3VkLmNvbTo0NDMkZmI1ZGNkYjNiNTZkNDQzZWI5ODRmY2NiM2Y1ZGVmMDMkMmJmYjhlZDFjMGZjNDJkNTkzODljYTM3NGRhMDFhOTM=',
    },
    auth: {
        username: process.env.CLOUD_ES_USER || 'elastic',
        password: process.env.CLOUD_ES_PW || 'kaa1nhPE4WhMtHHyOStCXDVu',
    },
}

const config = {
    dev,
    prod,
}

const env = process.env.NODE_ENV || 'prod'

module.exports = config[env]

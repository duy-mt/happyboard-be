// CLOUD
const dev = {
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    }
}

// LOCAL
const prod = {
    credentials: {
        client_email: "ga4-report@happyboarrd.iam.gserviceaccount.com",
        private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3BZE49x4sETYh\nBezfN83JwJUuHYW2YYHP1+UgbUy20R2uYdaE/Dqjm4CyAkgrYwr9tR2k0Ruv6KVv\nRq+dtBqGTI8/+PRtsnL7nKU5+lLRtF21Ua5EWv/X9eI8d3Oq4V/6+cJow2iiqC6T\nCyhxGCQwMOdkmz3TiWBJaXbG4nAFw3/zdwcIyti7SCIlaMLQyCDmhbivj1JrbmId\nvcL9aIzMQtqFmi2juKQzJ5WcksPXf39C42KDUN8GULNbqHpcYCxoqLMSbvBExNNs\nrS+EN0pn51ibIEzp3RPlKt0v1LH4RX/Ohqq37syauK6e43+zqJ7VVUFatQleffy6\nCyOxl2e/AgMBAAECggEAHUTvKMCLGzoKFuA8ivrWLB3iiFRMANL5hcnoSIt3mW8P\nmPE9ni6Q7tRHZxsVUUGkItcsV/eMaXvtD8LVWAT9uZzpyy3Jt/dctcojObFDkxTj\naEQZTgY4OeCGn0FChsFHQ7sIm7olyYmC9UdzXsQhGXHgt4avgwfKaxh02Iai//td\ndTPDb/HQHgBlvu5VighCM1Q9DTwAxT8G+zHvMG4q0TLKnVgtFbRnRq0fNal6t5jL\nGBEXD2UJ1sUVYdB1NN20tk1KMwDK7Qo3s8XO/K/qj1sRsZ86h8nhR0k49+/dNof6\nhd5RYHDjcnZdr6oiw1T3PIp3lgJpsW0Jsf2zMGsFTQKBgQDiZWG2AwsAQtNDqErm\nFffmX1/qHrhL1eVA4neW/CXtaV3aieSnlIdTCWH2xtvHS19l8uuAsRrB3JN8X9GP\nHJ4fwFf/Kfl6Ez0Hr/RtF6QVStkgmpaQSizHjMVWK2PeU/GlCkgZsrGuri98xgH8\nuhuyVfHTOe5/Zvt/ZDHkIxX8FQKBgQDO9DrC8jxEjMhDmS8HsHt1SysOpqJjePE/\nCqMEJU/QgmSGsvA0JKBYAzkJuOFA+DZTVaeqYS4HBZuFJeE529sJ92apSsSLkNsS\nqDAOO6MCQtKJrjWm+WTF145Q3853bQPrsGcMxjbg/4Papr5iqR2cY8t2rn4Xh2tb\nC5XYfX8FgwKBgQCjSGF/p5QwnQHII0HZznBb+9+ueHeNYniVIoEEKVmlcEAblSaP\n4uTy86pvFJ+AjpEAc4J8778PoOnSYz0+DXLSDaSpyPlAnU2AFNyiLdHO9YvCIxyC\ndqzzQ0k0S9kciciXsuGrfyD9jm17fUgDoarGJYxjPr4PrxOmnnoJQ3DgvQKBgFXu\nOufvRO8BtbW7yTdcJCcTyxEOR6cd9K3EcOOrynQ9cBgt/GbqPlnNHMXYqk8bwRLh\nIfkw2Le5sFWc4OPxUgXVYB8zGGELCKu6ghmm0YyCyoC4gTaPnzQ2yLTz+PrFnTcj\ny+YV93t9HPaQ/cRhjBX/qd/hnCGQ7RakvNdjZHaZAoGAR2J8LAahHhXzSc82CiLi\nUfUaR6it6NMR2EiWFZdlsHltjpeqJSqq3ZK/K0qISpiuE/IYzdm4G006mRgUGkEM\nLlllcOFPrtOD4uCgog/uE9/B0jSmC1rZ27MBVXMQ1q3uff1q5ywTS3ErMcEf9FNK\nbxJdavhfx8VNfMafq4/icZI=\n-----END PRIVATE KEY-----\n`,
    }
}

const config = {
    dev, prod
}

const env = process.env.NODE_ENV || 'prod'

module.exports = config[env]

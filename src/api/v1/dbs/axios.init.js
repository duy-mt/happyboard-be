const { default: axios } = require("axios");

const instance = axios.create({
    baseURL: 'http://localhost:8001'
})

module.exports = instance
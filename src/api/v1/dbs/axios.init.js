const { default: axios } = require("axios");

const instance = axios.create({
    baseURL: 'http://localhost:8001'
})

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE'

module.exports = instance
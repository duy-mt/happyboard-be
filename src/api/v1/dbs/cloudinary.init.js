'use strict'

// Require the cloudinary library
const cloudinary = require('cloudinary').v2
const { cloudinary: config } = require('../../../config')

// Return "https" URLs by setting secure: true
// cloudinary.config(config)

// Log the configuration
// console.log(cloudinary.config());
module.exports = cloudinary
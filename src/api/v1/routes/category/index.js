'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const categoryController = require('../../controllers/category.controller')

const router = express.Router()

router.get('', asyncHandler(categoryController.getAllCategories))
router.get('/:id', asyncHandler(categoryController.getCategoryById))

router.use(asyncHandler(authentication))
router.post('/create', asyncHandler(categoryController.createCategory))

module.exports = router
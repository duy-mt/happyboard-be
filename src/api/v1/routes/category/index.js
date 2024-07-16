'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const categoryController = require('../../controllers/category.controller')

const router = express.Router()

router.use(asyncHandler(authentication))

router.get('', asyncHandler(categoryController.getAllCategories))
router.get('/:categoryId', asyncHandler(categoryController.getCategoryById))
router.post('', asyncHandler(categoryController.createCategory))

module.exports = router
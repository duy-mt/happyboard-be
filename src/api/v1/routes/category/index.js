'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth')
const categoryController = require('../../controllers/category.controller')
const { authorize } = require('../../middlewares')

const router = express.Router()

router.use(asyncHandler(authentication))

router.get('', asyncHandler(categoryController.getAllCategories))
router.get('/:categoryId', asyncHandler(categoryController.getCategoryById))
router.post('', authorize(['CAT02']), asyncHandler(categoryController.createCategory))
router.put('/:categoryId', authorize(['CAT03']), asyncHandler(categoryController.updateCategory))
router.delete('/:categoryId', authorize(['CAT04']), asyncHandler(categoryController.deleteCategory))

module.exports = router
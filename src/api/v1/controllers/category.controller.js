'use strict'

const { OK, Created } = require('../core/success.response')
const CategoryService = require('../services/category.service')

class CategoryController {
    createCategory = async (req, res, next) => {
        new Created({
            message: 'Created category successfully!',
            data: await CategoryService.createCategory(req.body)
        }).send(res)
    }

    getAllCategories = async (req, res, next) => {
        new OK({
            message: 'Get all categories successfully',
            data: await CategoryService.getAllCategories()
        }).send(res)
    }

    getCategoryById = async (req, res, next) => {
        new OK({
            message: 'Get category successfully',
            data: await CategoryService.getCategoryById(req.params.categoryId)
        }).send(res)
    }
}

module.exports = new CategoryController()
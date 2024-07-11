'use strict'

const { OK, Created } = require('../core/success.response')
const CategoryService = require('../services/category.service')

class CategoryController {
    createCategory = async (req, res, next) => {
        new Created({
            message: 'Created category successfully!',
            metadata: await CategoryService.createCategory(req.body)
        }).send(res)
    }

    getAllCategories = async (req, res, next) => {
        new OK({
            message: 'Get all categories successfully',
            metadata: await CategoryService.getAllCategories()
        }).send(res)
    }

    getCategoryById = async (req, res, next) => {
        new OK({
            message: 'Get all categories successfully',
            metadata: await CategoryService.getCategoryById(req.params.id)
        }).send(res)
    }
}

module.exports = new CategoryController()
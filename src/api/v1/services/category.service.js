'use strict'

const { BadRequest } = require("../core/error.response")
const { createCategory, getAllCategories, getCategoryById } = require("../models/repo/category.repo")

class CategoryService {
    static createCategory = async ({
        title, description, color
    }) => {
        return await createCategory({
            title, description, color
        })
    }

    static getAllCategories = async () => {
        return await getAllCategories()
    }

    static getCategoryById = async (id) => {
        return await getCategoryById(id)
    }   
}

module.exports = CategoryService
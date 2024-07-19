'use strict'

const { createCategory, getAllCategories, getCategoryById } = require("../models/repo/category.repo")

class CategoryService {
    static createCategory = async ({
        title, description, icon
    }) => {
        return await createCategory({
            title, description, icon
        })
    }

    static getAllCategories = async () => {
        const { categories, total } = await getAllCategories()

        return {
            total,
            categories
        }
    }    

    static getCategoryById = async (id) => {
        const category = await getCategoryById({id})
        return category
    }   
}

module.exports = CategoryService
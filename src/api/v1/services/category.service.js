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
        const options = {
            attributes: ['id', 'icon']
        }
        const { categories, total } = await getAllCategories(options)

        return {
            total,
            categories
        }
    }    

    static getCategoryById = async (id) => {
        const options = {
            attributes: ['id', 'icon']
        }
        const category = await getCategoryById({id, options})
        return category
    }   
}

module.exports = CategoryService
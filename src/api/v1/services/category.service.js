'use strict'

const { BadRequest } = require("../core/error.response")
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../models/repo/category.repo")
const { removeField } = require("../utils")

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
        if(!category) throw new BadRequest('Category is not exist')
        return category
    }   

    static updateCategory = async ({
        categoryId, title, description, icon
    }) => {
        await this.getCategoryById(categoryId)
        let prePayload = {
            title, description, icon
        }
        // Remove field null
        const payload = removeField({
            obj: prePayload
        })

        const updatedCategory = await updateCategory({
            categoryId, payload
        })

        return updatedCategory
    }   

    static deleteCategory = async (categoryId) => {
        await this.getCategoryById(categoryId)
        const deleted = await deleteCategory(categoryId)
        return deleted
    } 
}

module.exports = CategoryService
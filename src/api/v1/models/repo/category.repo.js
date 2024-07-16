'use strict'

const { Category } = require('../index')

const createCategory = async ({
    title, description, icon
}) => {
    const category = Category.create({
        title,
        description,
        icon
    })

    return category
}

// FIND
const getAllCategories = async (options = {}) => {
    const { count: total, rows: categories } = await Category.findAndCountAll({
        ...options
    })
    
    return {
        categories, total
    }
}

const getCategoryById = async ({
    id, options = {}
}) => await Category.findOne({
    where: {id},
    ...options
})

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById
}
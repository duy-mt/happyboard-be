'use strict'

const { Category } = require('../index')

const optCategory = {
    attributes: ['id', 'title', 'icon']
}

const createCategory = async ({
    title, description, icon
}) => {
    const category = await Category.create({
        title,
        description,
        icon
    })

    return category.get(optCategory)
}

// FIND
const getAllCategories = async (options = {}) => {
    const { count: total, rows: categories } = await Category.findAndCountAll({
        ...optCategory
    })
    
    return {
        categories, total
    }
}

const getCategoryById = async ({
    id
}) => await Category.findOne({
    where: {id},
    ...optCategory
})

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById
}
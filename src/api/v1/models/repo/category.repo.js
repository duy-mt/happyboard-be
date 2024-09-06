'use strict'

const { Category } = require('../index')

const optCategory = {
    attributes: ['id', 'title', 'icon'],
}

const createCategory = async ({ title, description, icon }) => {
    const category = await Category.create({
        title,
        description,
        icon,
    })

    return category.get(optCategory)
}

// FIND
const getAllCategories = async (options = {}) => {
    const { count: total, rows: categories } = await Category.findAndCountAll({
        ...optCategory,
    })

    return {
        categories,
        total,
    }
}

const getCategoryById = async ({ id }) =>
    await Category.findOne({
        where: { id },
        ...optCategory,
    })

const updateCategory = async ({ categoryId, payload = {} }) => {
    const updatedData = await Category.update(payload, {
        where: {
            id: categoryId,
        },
        ...optCategory,
        raw: true,
    })
    return updatedData
}

const deleteCategory = async (categoryId) => {
    const deleted = await Category.destroy({
        where: {
            id: categoryId,
        },
    })
    return deleted
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
}

'use strict'

const { Category } = require('../index')

const createCategory = async ({
    title, description, color
}) => {
    const category = Category.create({
        title,
        description,
        color
    })

    return category
}

// FIND
const getAllCategories = async () => await Category.findAll()

const getCategoryById = async (id) => await Category.findOne({
    where: {id}
})

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById
}
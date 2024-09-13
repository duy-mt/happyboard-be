require('dotenv').config({
    path: '../.env',
})

const IdeaService = require('../src/api/v1/services/idea.service')

const migrate = async () => {
    await IdeaService.publishIdea({ ideaId: 1, adminId: 1 })
    await IdeaService.publishIdea({ ideaId: 2, adminId: 1 })
    await IdeaService.publishIdea({ ideaId: 3, adminId: 1 })
    await IdeaService.publishIdea({ ideaId: 4, adminId: 1 })
    await IdeaService.publishIdea({ ideaId: 5, adminId: 1 })
    await IdeaService.publishIdea({ ideaId: 6, adminId: 1 })
    await IdeaService.publishIdea({ ideaId: 7, adminId: 1 })
    await IdeaService.publishIdea({ ideaId: 8, adminId: 1 })
}

migrate()
    .then(() => {
        console.log(`--- Migrate elastic success ---`)
    })
    .catch((err) => {
        console.log(`Error::`, err.message)
        console.log(err.stack)
    })
    .finally(() => {
        process.exit()
    })

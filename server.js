const app = require('./src/app')
const { setupRemoveExpiredTokensCronJobs } = require('./src/api/v1/cronjob/index')

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    setupRemoveExpiredTokensCronJobs()
    console.log(`Server running on port ${PORT}`)
})

process.on('SIGINT', () => {
    console.log(`\nServer stopped.`)
    process.exit()
})

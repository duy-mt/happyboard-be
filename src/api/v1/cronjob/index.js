const { removeExpiredTokens } = require('../models/repo/token.repo');

const setupRemoveExpiredTokensCronJobs = () => {
    const cron = require('node-cron');
    cron.schedule('* 5 * * *', async () => {
        console.log('Running cron job to clean up expired tokens...');
        try {
            const now = Date.now();
            const result = await removeExpiredTokens({ currentTime: now });
            console.log(
                `Cron job completed. Removed ${result.deletedCount} expired tokens.`,
            );
        } catch (error) {
            console.error('Error running token cleanup cron job:', error);
        }
    });
};

module.exports = { setupRemoveExpiredTokensCronJobs };
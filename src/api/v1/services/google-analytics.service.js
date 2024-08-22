const { analyticsDataClient } = require('../dbs/google-analytics.init')

class GoogleAnalyticsService {
    static getViewsByHour = async () => {
        try {
            const [response] = await analyticsDataClient.runReport({
                property: `properties/455287844`,
                dateRanges: [
                  {
                    startDate: 'today', 
                    endDate: 'today',
                  },
                ],
                dimensions: [
                  { name: 'hour' },
                ],
                metrics: [
                  { name: 'screenPageViews' }, 
                ],
            });

            const chartData = response.rows.map(row => {
                const hour = parseInt(row.dimensionValues[0].value, 10);
                return {
                  oclock: `${hour}h`, 
                  views: parseInt(row.metricValues[0].value, 10),
                };
            });
            return chartData
        } catch (err) {
            console.log(err)
        }
    }
    // 455287844
    static getEventByHour = async () => {
        try {
            const [response] = await analyticsDataClient.runReport({
                property: `properties/455287844`,
                dateRanges: [
                  {
                    startDate: 'today', 
                    endDate: 'today',
                  },
                ],
                dimensions: [
                  { name: 'hour' }, 
                ],
                metrics: [
                  { name: 'eventCount' }, 
                ],
              });
          
            const chartData = response.rows.map(row => {
                const hour = parseInt(row.dimensionValues[0].value, 10); 
                return {
                  oclock: `${hour}h`, 
                  events: parseInt(row.metricValues[0].value, 10), 
                };
              });
            return chartData
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = GoogleAnalyticsService

const { analyticsDataClient } = require('../dbs/google-analytics.init')

class GoogleAnalyticsService {
    static getViewsByDay = async () => {
        try {
            const [response] = await analyticsDataClient.runReport({
                property: `properties/455287844`,
                dateRanges: [
                  {
                    startDate: '30daysAgo', 
                    endDate: 'today',
                  },
                ],
                dimensions: [
                  { name: 'date' },
                ],
                metrics: [
                  { name: 'screenPageViews' }, 
                ],
            });

            // const chartData = response.rows.map(row => {
            //     const hour = parseInt(row.dimensionValues[0].value, 10);
            //     return {
            //       oclock: `${hour}h`, 
            //       views: parseInt(row.metricValues[0].value, 10),
            //     };
            // });

            const chartData = response.rows.map(row => ({
              date: row.dimensionValues[0].value,  
              views: parseInt(row.metricValues[0].value, 10), 
            }));

            const formattedResponse = chartData.map(item => {
              const year = item.date.slice(0, 4);
              const month = item.date.slice(4, 6);
              const day = item.date.slice(6, 8);
          
              return {
                  ...item,
                  date: `${day}/${month}/${year}`
              };
            }).sort((a, b) => {
              const [dayA, monthA, yearA] = a.date.split('/');
              const [dayB, monthB, yearB] = b.date.split('/');
              return new Date(`${yearA}-${monthA}-${dayA}`) - new Date(`${yearB}-${monthB}-${dayB}`);
            });

            return formattedResponse
        } catch (err) {
            console.log(err)
        }
    }
    // 455287844
    static getEventsByDay = async () => {
        try {
            const [response] = await analyticsDataClient.runReport({
                property: `properties/455287844`,
                dateRanges: [
                  {
                    startDate: '30daysAgo', 
                    endDate: 'today',
                  },
                ],
                dimensions: [
                  { name: 'date' }, 
                ],
                metrics: [
                  { name: 'eventCount' }, 
                ],
              });

            const chartData = response.rows.map(row => ({
              date: row.dimensionValues[0].value,  
              events: parseInt(row.metricValues[0].value, 10), 
            }));

            const formattedResponse = chartData.map(item => {
              const year = item.date.slice(0, 4);
              const month = item.date.slice(4, 6);
              const day = item.date.slice(6, 8);
          
              return {
                  ...item,
                  date: `${day}/${month}/${year}`
              };
            }).sort((a, b) => {
              const [dayA, monthA, yearA] = a.date.split('/');
              const [dayB, monthB, yearB] = b.date.split('/');
              return new Date(`${yearA}-${monthA}-${dayA}`) - new Date(`${yearB}-${monthB}-${dayB}`);
            });
       
            return formattedResponse
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = GoogleAnalyticsService

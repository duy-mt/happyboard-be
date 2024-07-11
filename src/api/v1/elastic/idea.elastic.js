'use strict'

const elastic = require('../dbs/es.init')

const insertDataByES = async ({obj, index = process.env.DEV_ES_INDEX}) => {
    const newObj = await elastic.index({
        index,
        id: obj.id,
        body: obj
    })

    return newObj
}

const searchDataByES = async ({
    keyword, start = 0, limit = 5
}) => {
    console.log(keyword);
    const options = {
        index: 'players',
        body: {
            'query': {
                'match': {
                    'content': keyword
                }
            },
            'sort': [
                {
                    '_score': {
                        'order': 'desc'
                    }
                }
            ],
            'from': start,
            'size': limit,
            // 'highlight': {
            //     'fields': {
            //         'phrase': {}
            //     }
            // }
        }
    }

    const res = await elastic.search(options)
    const totalPages = res.hits.total.value
    const ideas = res.hits.hits
    return {
        totalPages,
        ideas
    }
}


module.exports = {
    insertDataByES,
    searchDataByES
}
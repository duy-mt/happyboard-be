'use strict'

const { BadRequest } = require('../core/error.response');
const { convetToTimestamp } = require('../utils');

class ElasticSearch {
    static elasticClient = require('../dbs/es.init')

    static createIndex = async ({ index }) => {
        try {
            const exists = await this.elasticClient.indices.exists({ index });
            if (!exists.body) {
                await this.elasticClient.indices.create({ index });
                console.log('Create Index ElasticSearch Successfully');
            } else {
                console.log('Index already exists:', index);
            }
        } catch (err) {
            console.error('Error creating index:', err);
        }
    }

    static deleteIndex = async ({ index }) => {
        try {
            const exists = await this.elasticClient.indices.exists({ index })
            if (!exists.body) {
                await this.elasticClient.indices.delete({ index });
                console.log('Deleting Index ElasticSearch Successfully');
            } else {
                console.log('Not found index');
            }
        } catch (err) {
            console.error('Error deleting index:', err)
        }
    }

    static createDocument = async ({ index, body }) => {
        try {
            await this.elasticClient.index({
                index,
                id: body.id,
                body
            }, function (err,resp,status) {
                if (err) {
                    console.log('Create document failed')
                } else {
                    console.log('Create document successfully');
                }
            })
        } catch (err) {
            console.log('Error create document:', err)
        }
    }

    static searchDocument = async ({ index, queryString, start = 0, limit = 5, duration = '30d' }) => {
        try {
            let now = Date.now()
            let time = now - convetToTimestamp(duration)
            const result = await this.elasticClient.search({
                index,
                _source: ['id', 'title', 'content'],
                body: {
                    query: {
                        bool: {
                            must: {
                                multi_match: {
                                    query: queryString,
                                    fields: ['title', 'content'],
                                    // minimum_should_match: '3<90%',
                                    fuzziness: 'AUTO',
                                    type: 'best_fields'
                                }
                            },
                            filter: {
                                range: {
                                    updatedAt: {
                                        gte: time
                                    }
                                }
                            }
                        }
                    },
                    highlight: {
                        fields: {
                            title: {},
                            content: {},
                        }
                    },
                    from: start,
                    size: limit,
                }
            })

            return result.hits.hits
        } catch (err) {
            console.log('Error search document:', err)
            throw new BadRequest(err.message)
        }
    }
    
}

module.exports = ElasticSearch
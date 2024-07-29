'use strict'

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
        } catch (error) {
            console.error('Error create document:', err)
        }
    }

    static searchDocument = async ({ index, query = queryDefault, start = 0, limit = 5 }) => {
        let ideas = null
        try {
            ideas = await this.elasticClient.search({
                index,
                body: {
                    query,
                    sort: [
                        {
                            _score: {
                                order: 'desc'
                            }
                        }
                    ],
                    from: start,
                    size: limit,
                }
            }, function (err,resp,status) {
                if (err) {
                    console.log('Search document failed')
                } else {
                    ideas = resp
                    // return resp
                }
            })
        } catch (error) {
            console.error('Error create document:', err)
        }
        return ideas?.hits?.hits
    }
}

module.exports = ElasticSearch
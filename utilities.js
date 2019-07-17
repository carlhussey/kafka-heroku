module.exports = {
    /**
     * 
     * With different sources of data having various field names,
     * we need to process them against our mapping to rename
     * the fields.
     * 
     * @param {*} payload 
     */

    mapFields: function (payload) {

        return new Promise((resolve, reject) => {

            const fs = require('fs')

            fs.readFile('./config/mappings/' + payload.topic + '.json', 'utf8', (err, res) => {

                if (err) {
                    reject(err)
                }

                console.log(payload)

                const parsed = JSON.parse(payload.value)
                const map = JSON.parse(res)
                let data = [parsed.data]

                // Iterate over our payload and convert our field names as needed
                let items = data.map(object => {
                    let newObj = {}
                    map.forEach(prop => newObj[prop.destinationField] = object[prop.sourceField])
                    return newObj
                })

                // Additional meta from kafka
                items[0].messageUUID = parsed.messageUUID
                items[0].offset = payload.offset
                items[0].partition = payload.partition

                resolve(items[0])


            })


        })

    },

    /**
     * 
     * Consumer sends data for storing in postgres.
     * Uses ORM model defined in ./models/communication
     * 
     * @param {*} payload 
     * 
     */

    storeRecord: async function (payload) {

        const models = require('./models')
        return await models.Communications.create({
            messageUUID: payload.messageUUID,
            firstName: payload.firstName,
            lastName: payload.lastName,
            age: payload.age,
            department: payload.department,
            campus: payload.campus,
            state: payload.state,
            partition: payload.partition,
            offset: payload.offset
        })

    },

    /**
     * Define and check our incoming payload
     * @param {*} payload 
     */

    validateSchema: function (payload) {

        const Joi = require('@hapi/joi')
        const schema = Joi.object().keys({
            topic: Joi.string().required(),
            data: Joi.object()
        })

        return schema.validate(payload)
    },

    /**
     * 
     * Handle errors within the application
     * @param {*} error 
     * 
     */

    logError: function (message, error) {
        if (!message || !error) {
            return false;
        }
        console.log(message, error)
    },

    /**
     * 
     * Read a file using async
     * @param {*} path 
     * @param {*} opts 
     */
    readFile: function (path, opts = 'utf8') {

        return new Promise((resolve, reject) => {
            const fs = require('fs')
            fs.readFile(path, opts, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
        
    },

    /**
     * 
     * Write a file using async
     * @param {*} path 
     * @param {*} data 
     * @param {*} opts 
     */
    writeFile: function (path, data, opts = 'utf8') {

        return new Promise((resolve, reject) => {
            const fs = require('fs')
            fs.writeFile(path, data, opts, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })

    }
}
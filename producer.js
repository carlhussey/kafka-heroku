/**
 *
 * producer.js
 *
 * After receiving a payload from ingest,
 * send our data to the kafka producer
 * which will contain the topic and message.
 *
 */

const kafka = require("kafka-node")
const utilities = require("./utilities")
const uuidv1 = require('uuid/v1')
require('dotenv').config()

module.exports = {

  sendToProducer: async function (payload) {

    return new Promise((resolve, reject) => {

      const HighLevelProducer = kafka.HighLevelProducer
      const client = require('./config/kafka.config').client()
      const producer = new HighLevelProducer(client)

      // Add a UDID to our payload
      payload.messageUUID = uuidv1()

      // Define our topic object
      const topicObj = [
        {
          topic: process.env.KAFKA_PREFIX + payload.topic,
          messages: JSON.stringify(payload)
        }
      ]

      // On producer ready
      producer.on("ready", () => {

        // Send payload 
        producer.send(topicObj, (err, data) => {

          if (err) {
            utilities.logError("Producer received error", {
              error: err,
              data: data
            })
            reject(err)
          }

          producer.close()
          resolve(data)

        })

      })

      // On producer error
      producer.on("error", (err) => {

        utilities.logError("Producer received error", err)
        producer.close()
        reject(err)

      })

    })

  }

}

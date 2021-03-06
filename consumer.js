/**
 *
 * consumer.js
 *
 * Subscribes to a kafka topic to consume
 * messages sent by our producer.
 *
 */

require('dotenv').config()
const utilities = require("./utilities")
const kafka = require("kafka-node")
const kafkaConfig = require('./config/kafka.config')
const topics = ["edplus-marketing-ingest", "enterprise-marketing-ingest"]
const groupName = "marketing"
const options = {
    kafkaHost: kafkaConfig.kafkaHost,
    sslOptions: kafkaConfig.sslOptions,
    groupId: process.env.KAFKA_PREFIX + groupName,
    autoCommit: false,
    sessionTimeout: 15000,
    protocol: ["roundrobin"],
    fromOffset: "latest",
    outOfRangeOffset: "latest"
}

// Add Kafka Topic Prefix for Heroku
const prefixedTopics = topics.map(function (el) {
    return process.env.KAFKA_PREFIX + el
})

const consumerGroup = new kafka.ConsumerGroup(options, prefixedTopics)

// Listen for messages from the defined topics
consumerGroup.on("message", async (message) => {

    // Transform message based on topic
    const transformed = await utilities.mapFields(message)

    // Store Record
    utilities.storeRecord(transformed)

        .then((dbResult) => {

            setTimeout(() => {

                // Once we receive notice that we have stored the record, commit the offset
                consumerGroup.commit((error, data) => {

                    if (error) {
                        utilities.logError('Failed to commit', error)
                    }

                })

            }, 0)

        })
        .catch((error) => {
            utilities.logError('Failed to insert record', error)
        })
})

// On error
consumerGroup.on("error", (error) => {
    utilities.logError('Error receiving message', error)
})

// On connect
consumerGroup.on('connect', () => {
    console.log('Connected to Consumer')
})

console.log("Consumer Waiting...")

require('dotenv').config()
const kafka = require("kafka-node")
const x509 = require('x509')
const Client = kafka.KafkaClient
const kafkaHosts = process.env.KAFKA_URL.replace(/kafka\+ssl:\/\//gi, "")
let kafkaCert = ''
let options = ''

if (process.env.NODE_ENV !== 'development') {
    kafkaCert = x509.parseCert(process.env.KAFKA_TRUSTED_CERT)
    options = {
        "key": process.env.KAFKA_CLIENT_CERT_KEY,
        "cert": process.env.KAFKA_CLIENT_CERT,
        "ca": [process.env.KAFKA_TRUSTED_CERT],
        "checkServerIdentity": (host, cert) => {
            if (kafkaCert.fingerPrint === cert.issuerCertificate.fingerprint) { 
                return undefined 
            }
            return Error('Not authentic')
        }
    }
}

module.exports = {
    "client": () => {
        return new Client({
            "kafkaHost": kafkaHosts,
            "sslOptions": options
        })
    }
}
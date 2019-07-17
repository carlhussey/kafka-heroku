const x509 = require('x509')
require('dotenv').config()

let options = {}
const kafkaHosts = process.env.KAFKA_URL.replace(/kafka\+ssl:\/\//gi, "")

// Only set these options for our HEROKU app
if (process.env.NODE_ENV !== 'dev') {
    const kafkaCert = x509.parseCert(process.env.KAFKA_TRUSTED_CERT)
    let options = {
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
    "host": kafkaHosts,
    "options": options
}

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers')

const CommunicationsModel = require('../models/communications')

/**
 * Database Tests
 */
describe('Database', () => {

    // Check our db model table name
    describe('models/Communications - Table Name Check', () => {
        const Comm = CommunicationsModel(sequelize, dataTypes)
        checkModelName(Comm)('Communications')
    })

    // Check table properties
    describe('models/Communications - Properties Check', () => {
        const Comm = CommunicationsModel(sequelize, dataTypes)
        const instance = new Comm()
            ['recordID', 'messageUUID', 'firstName', 'lastName', 'age', 'department', 'campus', 'state', 'partition', 'offset'].forEach(
                checkPropertyExists(instance)
            )
    })

})
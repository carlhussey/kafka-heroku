const assert = require('assert')
const { expect } = require('chai')

const {
    logError,
    validateSchema
} = require('../utilities')


/**
 * Utilities Tests
 */
describe('Utilities Methods', () => {

    // Log Error
    describe('logError() function', () => {
        it('Should error out if we don\'t provide a message', () => {
            const log = logError('', 'test');
            assert.notEqual(log, null)
        });
    })

    // Check Invalid Schema
    describe('validateSchema() function', () => {
        it('Should error out if we pass an invalid JSON payload schema', () => {
            const payload = {
                "topic2": "enterprise-marketing-ingest",
                "data1": {
                    "firstName": "Carl",
                    "lastName": "Hussey"
                }
            }
            const validate = validateSchema(payload)
            expect(validate).to.be.an('object')
            expect(validate).to.not.include({ error: null })

        })
    })

    // Check field mapping
    describe('mapFields() function', () => {
        it('Should error out if we don\'t provide a message', () => {
            const log = logError('', 'test');
            assert.notEqual(log, null)
        });
    })

})
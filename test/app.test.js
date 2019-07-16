const request = require('supertest')
const app = require('../app')

/**
 * Server Tests
 */
describe('Server Methods', () => {
    describe('GET /', () => {
        it('Check express for response of server connected...', (done) => {
            request(app).get('/').expect('Server Connected...', done)
            done();
        })
    })
})
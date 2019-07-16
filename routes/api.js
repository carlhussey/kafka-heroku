const express = require('express')
const router = express.Router()
const asyncHandler = require("express-async-handler")
const producer = require("../producer")
const utilities = require("../utilities")

/* Check Resources */
router.get('/', function (req, res, next) {
  res.status(200).json({ status: 'API Ready' })
})
router.get('/v1', function (req, res, next) {
  res.status(200).json({ status: 'API Ready' })
})

/**
 * V1 API
 */

router.post(
  "/v1/payload",
  asyncHandler(async (req, res, next) => {
    let validated = utilities.validateSchema(req.body)
    if (validated.error) {
      res.status(500).send(validated.error)
      return
    }
    let result = await producer.sendToProducer(req.body)
    res.json(result)
  })
)

module.exports = router

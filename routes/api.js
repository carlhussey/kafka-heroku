const express = require('express')
const router = express.Router()
const asyncHandler = require("express-async-handler")
const producer = require("../producer")
const utilities = require("../utilities")

/* Check Resource */
router.get('/', function (req, res, next) {
  res.send('valid route found - not configured')
});

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

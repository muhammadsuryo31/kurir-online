const express = require('express')
const router = express.Router()
const user = require('./user-router')
const driver = require('./driver-router')
const job = require('./job-router')

router.use('/users', user)
router.use('/drivers', driver)
router.use('/jobs', job)

module.exports = router
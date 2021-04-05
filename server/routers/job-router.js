const express = require("express")
const router = express.Router()
const controller = require('../controllers/job-controller')

const authenticate = require('../middlewares/authenticate')
const authenticate2 = require('../middlewares/authenticate2')

router.get('/user', authenticate, controller.getJobUser)
router.post('/post', authenticate, controller.postJob)
router.delete('/delete/:id', authenticate, controller.deleteJob)

router.get('/driver', authenticate2, controller.getJobDriver)
router.patch('/pick/:id', authenticate2, controller.pickJob)
router.patch('/done/:id', authenticate2, controller.endJob)

module.exports = router
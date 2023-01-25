const express = require('express')
const router = express.Router()

const {authorization} = require('../controllers/authorization')
const {getGoals, createGoal} = require('../controllers/goalsController')

//get goals
router.get('/', authorization, getGoals)

//create goal
router.post('/', authorization, createGoal)

module.exports = router
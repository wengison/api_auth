const express = require('express')
const router = express.Router()

const {loginUser, signupUser} = require('../controllers/userController')
const {authorization} = require('../controllers/authorization')
const {getSomething} = require('../controllers/goalsController')

// router.get('/songs', authorization, getSomething)

//signup & login
router.post('/signup', signupUser)
router.post('/login', loginUser)


module.exports = router
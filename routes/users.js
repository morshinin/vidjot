const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// User login route
router.get('/login', (req, res) => {
	res.send('Login')
})

// User register route
router.get('/register', (req, res) => {
	res.send('Register')
})

module.exports = router
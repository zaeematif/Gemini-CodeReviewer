const express = require('express');
const aiReview = require('../controllers/ai.controller');
const router = express.Router()

//routes
router.post('/get-review', aiReview)

module.exports = router;
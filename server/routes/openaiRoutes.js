const express = require('express');
const { promptGenerator } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateprompt', promptGenerator);

module.exports = router;
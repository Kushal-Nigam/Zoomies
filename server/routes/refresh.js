const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controller/refreshTokenController');

//Called when access token expired, to create new access token if possible
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;
const debug = require('debug')('app:routes:v1');
const express = require('express');
const router = express.Router();

debug('Configuring routes');

// Import and setup base routes
const example = require('./example');
const blockchain = require('./blockchain');

router.use('/example', example);
router.use('/blockchain', blockchain);

module.exports = router;
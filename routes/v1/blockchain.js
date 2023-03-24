const debug = require('debug')('app:routes:v1:blockchain');
const express = require('express');

debug('Blockchain route');

const router = express.Router();

const BlockchainController = require('../../controllers/v1/blockchain');

// Define route and it's controller
router.route('/generateTokens').post(BlockchainController.generateTokens);
router.route('/showBalance').post(BlockchainController.getBalance);

module.exports = router;
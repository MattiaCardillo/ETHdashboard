const debug = require('debug')('app:controllers:v1:blockchain');

const BlockchainService = require('../../services/v1/blockchain');

const BlockchainController = {

    generateTokens: async (req, res, next) => {
        debug('Executing generate tokens');
        return await BlockchainService.generateToken(req, res);
    },

    getBalance: async (req, res, next) => {
        debug('Executing get balance');
        return await BlockchainService.getBalance(req, res);
    }
};

module.exports = BlockchainController;
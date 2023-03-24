const debug = require('debug')('app:services:v1:index');
const coin = require('../../contract/blockchain')

const BlockchainService = {

    generateToken: async (req, res) => {
        debug('Executing generateToken method');
        let address = req.body.address;
        let amount = req.body.amount;
        if (!address || !amount)
            return res.status(400).json({
                error: "One or more core request parameters is missing",
            });

        var result = await coin.createTokens(address, amount);

        if (!result)
            return res.status(500).json({
                error: "Certificate error, something went wrong"
            });
        else
            return res.status(200).json({
                message: "Transaction sent",
                amountInserted: result
            });
    },

    getBalance: async (req, res) => {
        debug('Executing getBalance method');
        let address = req.body.address;
        let contractAddress = req.body.contractAddress;
        if (!address || !contractAddress)
            return res.status(400).json({
                error: "Address or contract address is missing",
            });

        var result = await coin.getBalance(address, contractAddress);

        if (!result)
            return res.status(500).json({
                error: "Certificate error, something went wrong"
            });
        else 
            return res.status(200).json({
                message: "Transaction sent",
                balance: result
            });
    }

};

module.exports = BlockchainService;
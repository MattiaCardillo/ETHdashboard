'use strict'

const solc = require("solc");
const fs = require("fs");
const Web3 = require("Web3");
const env = require('../config/env.js');
var path = require("path");
const debug = require('debug')('app:config:smartContract');

//Helper functions
function isValidAddress(address) {
    return /^(0x)?[0-9a-f]{40}$/i.test(address);
}

function isValidAmount(amount) {
    return amount > 0 && typeof Number(amount) == 'number';
}

//Define coin class
class Coin {
    constructor() {
        this.web3 = null;
        this.ABI = null;
        this.bytecode = null;
        this.mainAccount = null;
    }

    //Function used to init web3
    init(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(env.PROVIDER));

        var file = fs.readFileSync(path.resolve(__dirname, "SampleCoin.sol")).toString();
        console.log(file);
        
        var input = {
            language: "Solidity",
            sources: {
                "SampleCoin.sol": {
                    content: file,
                },
            },
            
            settings: {
                outputSelection: {
                    "*": {
                        "*": ["*"],
                    },
                },
            },
        };
        
        var output = JSON.parse(solc.compile(JSON.stringify(input)));
        debug("Result : " + output);
        
        this.ABI = output.contracts["SampleCoin.sol"]["SampleCoin"].abi;
        this.bytecode = output.contracts["SampleCoin.sol"]["SampleCoin"].evm.bytecode.object;
        debug("Bytecode: " + this.bytecode);
        debug("ABI: " + this.ABI);

        this.web3.eth.getAccounts().then((accounts) => {
            // Display all Ganache Accounts
            debug("Accounts: " + accounts);
          
            this.mainAccount = accounts[0];
        });
    }


    //Function used to get balances
    async getBalance(address, contractAddress){

        if(!isValidAddress(address)) {
            debug("Invalid address");
            return false;
        }

        if(!isValidAddress(contractAddress)) {
            debug("Invalid contract address");
            return false;
        }

        var contract = new this.web3.eth.Contract(this.ABI, contractAddress);
        return await contract.methods.showBalances(address).call((err, data) => {
            debug("-------------- BALANCE --------------");
            debug(data);
            debug("-------------------------------------");
            return data;
        });
    }

    // Function used to inject new coin
    async createTokens(address, amount){    
        if(!isValidAddress(address)) {
            debug("Invalid address");
            return false;
        }
    
        if(!isValidAmount(amount)) {
            debug("Invalid amount");
            return false;
        }

        debug("Amount: " + amount);
        debug("Receiver: " + address);
        
        var contract = new this.web3.eth.Contract(this.ABI);
        var contAddress = "";
        return await contract.deploy({ data: this.bytecode }).send({ from: this.mainAccount, gas: 470000 }).on("receipt", (receipt) => {
            // Contract Address will be returned here
            contAddress = receipt.contractAddress;
            debug("Contract Address: " + receipt.contractAddress);
            debug(receipt);
        }).then(async (initialContract) => {
            debug("-------------- CONTRACT INFO --------------");
            debug(initialContract)
            debug("-------------- METHODS --------------");
            debug(initialContract.methods)
            debug("-------------------------------------");
            debug("Amount to send: " + amount);
            var blockInfo = await initialContract.methods.mint(address, amount).send({from: this.mainAccount, gas: 470000}, (err, data) => {
                debug("-------------- MINT --------------");
                debug(data);
                debug("-------------------------------------");
                return data;
            });

            debug(blockInfo);

            if (blockInfo)
                return {
                    "amount": amount,
                    "blockInfo": blockInfo,
                    "contractAddress": contAddress
                };

            return false;
        });
    }
}

//Init coin class element and export
var coin = new Coin();
coin.init();
module.exports = coin;


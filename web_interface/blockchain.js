'use strict'

function generateTokens(){
    var address = $('#address').val();
    var amount = $('#amount').val();

    $.ajax({
        url: 'http://localhost:3000/v1/blockchain/generateTokens',
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        data: JSON.stringify({
            "address": address,
            "amount": amount
        }),
        success: function(data) {
            $('#createresponse').text("Indirizzo del contratto: " + data.amountInserted.contractAddress + ' -- Valore aggiunto: ' + data.amountInserted.amount);
        },
        error: function(e) {
            console.error('Could not execute the transaction: ' + e.error);
        }
    });
}

function getBalance(){

    var contractAddress = $('#balance_contract_address').val();
    var address = $('#balance_address').val();

    $.ajax({
        url: 'http://localhost:3000/v1/blockchain/showBalance',
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        data: JSON.stringify({
            "address": address,
            "contractAddress": contractAddress
        }),
        success: function(data) {
            //If attributionToken is saved, Retail-AI event must be pushed to dataLayer
            $('#balanceresponse').text("Balance recuperato: " + data.balance);
        },
        error: function(e) {
            console.error('Could not execute the transaction: ' + e.error);
        }
    });
}


$(document).on("click", "#create", function() {
    generateTokens();
});

$(document).on("click", "#check", function() {
    getBalance();
});

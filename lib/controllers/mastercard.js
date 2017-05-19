var Simplify = require("simplify-commerce");

var publicKey
client = Simplify.getClient({
    publicKey: 'sbpb_YjI0YjMxOTgtODBkOS00NDY3LWE4ZDctNmU5NWUzNjk1MmJi',
    privateKey: 'OUstxFJQWSOj83Cm1DQ9QcxSxdG7JlRn97SWTmCvEcJ5YFFQL0ODSXAOkNtXTToq'
});


var sendPayment = function (amount,paymentDescription,expiraryMonth,expiraryYear,cardCVC,numb) {
    client.payment.create({
    amount : amount,
    description : paymentDescription,
    card : {
       expMonth : expiraryMonth,
       expYear : expiraryYear,
       cvc : cardCVC,
       number : numb
    },
    currency : "USD"
    }, function(errData, data){
        if(errData){
            console.error("Error Message: " + errData.data.error.message);
            // handle the error
            return;
        }
        console.log("Payment Status: " + data.paymentStatus);
    });
}

exports.sendPayment = sendPayment;

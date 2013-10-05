// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
    backgroundColor:'white'
});

// TODO: write your module tests here
var tipaypal = require('com.gbaldera.tipaypal');
Ti.API.info("module is => " + JSON.stringify(tipaypal));

tipaypal.initialize({
    environment: tipaypal.ENVIRONMENT_SANDBOX,
    client_id: "<YOUR_CLIENT_ID>",
    receiver_email: "<YOUR_PAYPAL_EMAIL_ADDRESS>"
});

var buyItBtn = Ti.UI.createButton({
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    title:'Buy a thing'
});
win.add(buyItBtn);

buyItBtn.addEventListener("click", function(e){
    tipaypal.doPayment({
        skip_credit_card: true,
        amount: "8.75",
        currency: "USD",
        description: "hipster jeans",
        payer_id: "<someuser@somedomain.com>"
    });
});

tipaypal.addEventListener(tipaypal.EVENT_OK, function(e){
    Ti.API.info(JSON.stringify(e));

    // TODO: send 'confirm' to your server for verification.
    // see https://developer.paypal.com/webapps/developer/docs/integration/mobile/verify-mobile-payment/
    // for more details.
});
tipaypal.addEventListener(tipaypal.EVENT_ERROR, function(e){Ti.API.info(JSON.stringify(e));});
tipaypal.addEventListener(tipaypal.EVENT_CANCELLED, function(e){Ti.API.info(JSON.stringify(e));});
tipaypal.addEventListener(tipaypal.EVENT_PAYMENT_INVALID, function(e){Ti.API.info(JSON.stringify(e));});

win.open();


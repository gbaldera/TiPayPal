# TiPayPal Module

## Description

TiPayPal is a native Android module, which integrates the new [PayPal mobile SDK for Android] (https://github.com/paypal/PayPal-Android-SDK) in your Titanium Android app.

##Download

Grab the lastest build from the [dist folder](https://github.com/gbaldera/TiPayPal/tree/master/dist)

## Accessing the TiPayPal Module

Simply add the following lines to your `tiapp.xml` file:
    
    <modules>
        <module platform="android">com.gbaldera.tipaypal</module> 
    </modules>

To access this module from JavaScript, you would do the following:

	var tipaypal = require('com.gbaldera.tipaypal');

The TiPayPal variable is a reference to the Module object.	

## Constants

#### ENVIRONMENT_NO_NETWORK : String

Mock environment. Pre-packaged fake transactions only. The SDK will not attempt to contact PayPal's servers with this environment.

####ENVIRONMENT_SANDBOX : String

Sandbox environment. Used for development & testing. Sandbox transactions can be seen in the [dashboard](https://developer.paypal.com/webapps/developer/dashboard/test).

####ENVIRONMENT_PRODUCTION : String

Live production environment. Real money will be moved in this environment.

## Methods

List of methods supported in this module:

#### initialize

Initialize the SDK.

  tipaypal.initialize({
      environment: tipaypal.ENVIRONMENT_NO_NETWORK,
      skip_credit_card: true,
      client_id: "<YOUR_CLIENT_ID>",
      receiver_email: "<YOUR_PAYPAL_EMAIL_ADDRESS>"
  });

##### Arguments

* environment [String]: Enviroment (one of the above)
* skip_credit_card [bool]: disable or enable credit card acceptance
* client_id [String]: Your client id Available on the [PayPal developer site](https://developer.paypal.com/)
* receiver_email [String]: The email address on the PayPal account used to obtain the above `client_id`

#### doPayment

Make a payment.

  tipaypal.doPayment({
        amount: "8.75",
        currency: "USD",
        description: "hipster jeans",
        payer_id: "<someuser@somedomain.com>"
    });

##### Arguments

* amount [Number]: The payment amount
* currency [String]: Payment currency. For a complete list of supported currencies, read [here] (https://github.com/paypal/PayPal-Android-SDK#currencies) 
* description [String]: Description of the payment
* payer_id [String]: Your customer ID. If you have a customer identifier that is not hardware- or device-based, such as an email address or a unique user ID in your system, you should provide it as a `payer_id`


## Events

### EVENT_COMPLETED

Fired when the payment was processed successfully.

#### Properties

* code : result code.
* confirmation : Payment confirmation. Send 'confirm' to your server for verification, [see here for more details] (https://developer.paypal.com/webapps/developer/docs/integration/mobile/verify-mobile-payment/)

### EVENT_ERROR
### EVENT_CANCELLED
### EVENT_PAYMENT_INVALID

## Usage

```

var win = Ti.UI.createWindow({
    backgroundColor:'white'
});

// TODO: write your module tests here
var tipaypal = require('com.gbaldera.tipaypal');
Ti.API.info("module is => " + JSON.stringify(tipaypal));

tipaypal.initialize({
    environment: tipaypal.ENVIRONMENT_NO_NETWORK,
    skip_credit_card: true,
    client_id: "<YOUR_CLIENT_ID>",
    receiver_email: "<YOUR_PAYPAL_EMAIL_ADDRESS>"
});

var buyItBtn = Ti.UI.createButton({
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    title:'Buy a thing'
});
win.add(buyItBtn);

var result_label = Ti.UI.createLabel({text: "", top: 20});
win.add(result_label);

buyItBtn.addEventListener("click", function(e){
    tipaypal.doPayment({
        amount: "8.75",
        currency: "USD",
        description: "hipster jeans",
        payer_id: "<someuser@somedomain.com>"
    });
});

tipaypal.addEventListener(tipaypal.EVENT_COMPLETED, function(e){

    // TODO: send 'confirm' to your server for verification.
    // see https://developer.paypal.com/webapps/developer/docs/integration/mobile/verify-mobile-payment/
    // for more details.

    result_label.text = JSON.stringify(e);
});
tipaypal.addEventListener(tipaypal.EVENT_ERROR, function(e){Ti.API.info(JSON.stringify(e));});
tipaypal.addEventListener(tipaypal.EVENT_CANCELLED, function(e){Ti.API.info(JSON.stringify(e));});
tipaypal.addEventListener(tipaypal.EVENT_PAYMENT_INVALID, function(e){Ti.API.info(JSON.stringify(e));});

win.open();

```

## Changelog
* 1.0: Initial version

## Acknowledgments

Add the open source license acknowledgments from [acknowledgments.md] (https://github.com/paypal/PayPal-Android-SDK/blob/master/acknowledgments.md) to your app's acknowledgments.

## Author

Gustavo Rodriguez Baldera

[www.gbaldera.com](http://www.gbaldera.com/) 

## License

It's open source and it's under [DBAD License](http://www.dbad-license.org/)

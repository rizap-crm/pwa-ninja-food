var push = require('web-push');

var admin = require("firebase-admin");

var serviceAccount = require("./pwa-rizap-chat-firebase-adminsdk-tpwxt-ff2e79acb5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//writePubKey();
readSub();

async function writePubKey(){
  const snapshot = await db.collection('PushServerPubKey').doc('pubkey').set({'pubkey':'BLf4UC3iYjaoB08BERPnCy_-SxGwb_tgWPJBgvuz3x21loDS1VeUI55RbcrflXw4Fh0qLUbAOCeMRzTwvC0eB3s'});
  console.log(snapshot);
}

async function readSub(){
  const snapshot = await db.collection('Subscriptions').get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data().subscription);
  });
  //console.log(snapshot.data().pubkey);
}



//Get the vapidkeys if you don't have
//let vapidkeys = push.generateVAPIDKeys();
//console.log("vapidkeys);

let vapidkeys = {
  publicKey: 'BLf4UC3iYjaoB08BERPnCy_-SxGwb_tgWPJBgvuz3x21loDS1VeUI55RbcrflXw4Fh0qLUbAOCeMRzTwvC0eB3s',
  privateKey: 'JwFeFHsyUEcL2cegrhHmfUNexcVolQC5IupYP35vzzw'
}

push.setVapidDetails('mailto:test@example.com', vapidkeys.publicKey, vapidkeys.privateKey);

let sub = 
//2NDSP3 localhost #1 -- 
{"endpoint":"https://fcm.googleapis.com/fcm/send/cvX6G89MJI8:APA91bF9aJen1CNYfFCP2NKzYEmOasprajSes_0TB9_4ZeSCaIzXKHEEgTW8M81oBnffqYtg3SDOIP5l5FyNUTiczw_jSZJ_Ig7lf9OHWDhmHdJFfPZgcophQP4VXLv9gE2RJ-nJMja5","expirationTime":null,"keys":{"p256dh":"BIBYth-HjVEC-hkRfg-Pw3ysx0FQkoXzR9gOGR47E-cUBh5lMeozpXGp_WmP7PXZVJq15rlWxLwI2JR3TUZ7omo","auth":"2JPksqCSpViJM7EmyCQesA"}};


//2NDSP3 chrom to https://rizap-crm.github.io/pwa-ninja-food/ 
//{"endpoint":"https://fcm.googleapis.com/fcm/send/drgXzp4e4sI:APA91bEVk0k78B75Wkkco76DWME2rPZM1fDK6y5uD1G4h0YKfO5-IjrATTJ1di52591TYGAek3PaFVjosns7Bh51O2jUMUp9L8MDEoamy-rElFe9fv7EphtHHoyXLNeWljjvk83JolHw","expirationTime":null,"keys":{"p256dh":"BDd1Df41mWHXLi3JEugJByZFVcT2dzOhoDMfLtK_vO3MP47_ODWs8GgeTkMDn6ITjzxALJocivSGYE5CM38GMlg","auth":"4Q2HSqHUnn1nEuZuUGy2KA"}};    

// Vivo PC to https://rizap-crm.github.io/pwa-ninja-food/    
//{"endpoint":"https://fcm.googleapis.com/fcm/send/dJ2KgJymJsU:APA91bFMIQtGwMn_7zauksu9h50LDN47e25bajBPdc9uyHv1Fx6ZPw_B7h5xy1oWG4MfyCzvNlOew8VL6tHW8XqdIydr6RmFTPQjGjb4AHSt5NWJnpLVakRQYiCcd8hqJ3WCZMz_RNla","expirationTime":null,"keys":{"p256dh":"BMmnZJWQ2_9y0oWuCygmZc3ZSv7JPjJ0FqJfCudldTSbi1BSOHr1bYiWGVveQJ7Ju8FpTu3UhCytyjSsu09N4RA","auth":"Xfg5ct0VbpFW7V6aMWW1ig"}};

// Vivo PC Android emulator to //rizap-crm.github.io/pwa-ninja-food/
//{"endpoint":"https://fcm.googleapis.com/fcm/send/fR6wtmbiPsQ:APA91bFOaPf-_RCc1Mlx1ckg3HNC1WFuoO6Q83FvzoYuPp9tC5P-NwLlz0OeAByBY_YWye-TCQjCRW9ItFovW2t_iBr_7qj9i_LD3wxjcbYcU3hPn1BvCobN6NSj0TQl7EQfhzm8ys3q","expirationTime":null,"keys":{"p256dh":"BMgm3-4cZahRFtdsqzEBB7nul5R8QslqDB3q07WSQ3mvuiYzsI5RM8nqAdywtOSc_tZr6N2nHj9lcnR22p4ZH5w","auth":"nl-5gok81EXpj1gctKJBAw"}};

// Mac mini Chrome
//{"endpoint":"https://fcm.googleapis.com/fcm/send/f_ZK3cZf-Wk:APA91bFXVOWEIE695g12IrV1ZQIrrh3zdI8dfhS8Bw-ugQW8sfgE58LJrBfmIXr1bB7zwc_l_8XONEjP6KumKXosWHmn1zV4w4BzI-5OAoY9MQMnv9mFq0i-G8fghizl3Kr_FZzIAd-3","expirationTime":null,"keys":{"p256dh":"BG5wenCzR2YjSCSEfvmUbQg3sdY5g92WKJVcNDCr3-DxreHR9tx3vOGH-LHhckV8mikBbgxGGjY3O0WPQFkd0XE","auth":"1rRIUNs6lR5uPfE6HOcUoA"}};

var payload = {
  // 自定義，可以夾帶客製資料
  'title': 'test message from server',
  'body': 'This is body'
}
push.sendNotification(sub, JSON.stringify(payload))
.catch(err => console.log('Send Notification Error:', (err.statusCode=='410')? "Subscription is not avaliable":err.statusCode));


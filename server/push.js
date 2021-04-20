var push = require('web-push');

//Get the vapidkeys if you don't have
//let vapidkeys = push.generateVAPIDKeys();
//console.log("vapidkeys);

let vapidkeys = {
  publicKey: 'BLf4UC3iYjaoB08BERPnCy_-SxGwb_tgWPJBgvuz3x21loDS1VeUI55RbcrflXw4Fh0qLUbAOCeMRzTwvC0eB3s',
  privateKey: 'JwFeFHsyUEcL2cegrhHmfUNexcVolQC5IupYP35vzzw'
}

push.setVapidDetails('mailto:test@example.com', vapidkeys.publicKey, vapidkeys.privateKey);

let sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/cvX6G89MJI8:APA91bF9aJen1CNYfFCP2NKzYEmOasprajSes_0TB9_4ZeSCaIzXKHEEgTW8M81oBnffqYtg3SDOIP5l5FyNUTiczw_jSZJ_Ig7lf9OHWDhmHdJFfPZgcophQP4VXLv9gE2RJ-nJMja5","expirationTime":null,"keys":{"p256dh":"BIBYth-HjVEC-hkRfg-Pw3ysx0FQkoXzR9gOGR47E-cUBh5lMeozpXGp_WmP7PXZVJq15rlWxLwI2JR3TUZ7omo","auth":"2JPksqCSpViJM7EmyCQesA"}};

var payload = {
  // 自定義，可以夾帶客製資料
  'title': 'test message from server',
  'body': 'This is body'
}
push.sendNotification(sub, JSON.stringify(payload));
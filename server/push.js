var push = require('web-push');

//Get the vapidkeys if you don't have
//let vapidkeys = push.generateVAPIDKeys();
//console.log("vapidkeys);

let vapidkeys = {
  publicKey: 'BLf4UC3iYjaoB08BERPnCy_-SxGwb_tgWPJBgvuz3x21loDS1VeUI55RbcrflXw4Fh0qLUbAOCeMRzTwvC0eB3s',
  privateKey: 'JwFeFHsyUEcL2cegrhHmfUNexcVolQC5IupYP35vzzw'
}

push.setVapidDetails('mailto:test@example.com', vapidkeys.publicKey, vapidkeys.privateKey);

let sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/fMUnyq3ws88:APA91bE5FTc7rOVcZxSyuI-L9olA-d3m9FoTQ_0MDq0HGe5Ga0wOG5s0eOBpUgtsfnXtX30ywCTlWKL6dLtvnul06puuQDyKegAl5qEmVul6bBAby5K01l2mUSMX8jLQcz4MA7CqcZpx","expirationTime":null,"keys":{"p256dh":"BNc_1m4NxSMWqpHhvW7hIWhATzJmIFs8iTTPQzxmNLLa8YLsEYDLgkpbbHUowsnkoQvNYw6uL7-n-mCZX6xZTrQ","auth":"8ZH8BL2VNIHp900vIPNRgw"}};

var payload = {
  // 自定義，可以夾帶客製資料
  'title': 'test message from server',
  'body': 'This is body'
}
push.sendNotification(sub, JSON.stringify(payload));
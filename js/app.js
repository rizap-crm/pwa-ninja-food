if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}

var push;
async function subscribe(){
  console.log("Subscribe");
  let sw = await navigator.serviceWorker.ready;
  push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BLf4UC3iYjaoB08BERPnCy_-SxGwb_tgWPJBgvuz3x21loDS1VeUI55RbcrflXw4Fh0qLUbAOCeMRzTwvC0eB3s'
  })
  document.querySelector('#sub-string').innerHTML=JSON.stringify(push);
  document.querySelector('#sub-string').style.height='250px'
  document.querySelector('#sub-string').style.display = "block";
  console.log(JSON.stringify(push));
  
  test(JSON.stringify(push));
  
}

async function test(subscription){
  
  // find the max id
  var last_sub_id=0;
  var last_sub;
  const snapshot = await db.collection('Subscriptions').get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    if (parseInt(doc.id) > last_sub_id) {
      last_sub_id = parseInt(doc.id);
      last_sub = doc.data()
    }
  });
  
  console.log(last_sub_id);
  
//  await db.collection('Subscriptions').doc('1').set(
//  {
//    'subscription': subscription
//  });  
}
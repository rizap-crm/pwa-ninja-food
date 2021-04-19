if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}


async function subscribe(){
  console.log("Subscribe");
  let sw = await navigator.serviceWorker.ready;
  let push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BLf4UC3iYjaoB08BERPnCy_-SxGwb_tgWPJBgvuz3x21loDS1VeUI55RbcrflXw4Fh0qLUbAOCeMRzTwvC0eB3s'
  })
  console.log(JSON.stringify(push));
}
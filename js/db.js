const addMsg  = document.querySelector('#addMessage');
const addBtn  = document.querySelector('#addBtn');

// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener
db.collection('recipes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added'){
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed'){
      // remove the document data from the web page
      removeRecipe(change.doc.id);
    }
  });
});

// Update the max id
var last_sub_id=0;
var last_sub;
db.collection('Subscriptions').onSnapshot(snapshot => {
  last_sub_id=0;
  snapshot.forEach((doc) => {
    //console.log(doc.id, '=>', doc.data());
    if (parseInt(doc.id) > last_sub_id) {
      last_sub_id = parseInt(doc.id);
      last_sub = doc.data()
    }
  });

  console.log("subscription max id is:", last_sub_id);
});
  

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const recipe = {
    name: form.title.value,
    ingredients: form.ingredients.value
  };

  db.collection('recipes').add(recipe)
    .catch(err => console.log(err));

  form.title.value = '';
  form.ingredients.value = '';
  
  addMsg.innerHTML='Recipe is added, add another recipe.';
  addBtn.style.backgroundColor = '#FF8816';
});

// delte a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
  console.log(evt);
  if (evt.target.tagName == 'I') {
    const id = evt.target.getAttribute('data-id');
    db.collection('recipes').doc(id).delete();
  }
}); 



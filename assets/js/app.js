// Variables
const listaTweets = document.getElementById('lista-tweets');



// Event Listeners

eventListeners();

function eventListeners() {
  // Cuando se envia el formulario
  document.querySelector('#formulario').addEventListener('submit', agregarTweet);

  // borrar tweets
  listaTweets.addEventListener('click', borrarTweet);

  // Contenido cargado
  document.addEventListener('DOMContentLoaded', localStorageListo);
}

// functions



// Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  // leer el valor del textarea
  const tweet = document.getElementById('tweet').value;
  const botonBorrar = document.createElement('a');
  botonBorrar.classList = 'borrar-tweet';
  botonBorrar.innerText = 'X';
  // crear elemento y añadirle contenido a la lista
  const li = document.createElement('li');
  li.innerText = tweet;
  // añade el boton de borrar al tweet
  li.appendChild(botonBorrar);
  // añade el tweet a la lista
  listaTweets.appendChild(li);
  
  // Añadir tweet a local storage
  agregarTweetLocalStorage(tweet);
}

// elimina el tweet del DOM
function borrarTweet(e) {
  e.preventDefault();

  if(e.target.className === 'borrar-tweet'){
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

// Mostrar datos de local storage en el DOM
function localStorageListo() {
  let tweets;

  tweets = obtenerTweetsLocalStorage();
  
  tweets.forEach(function(tweet) {
    //crear boton de eliminar
      const botonBorrar = document.createElement('a');
      botonBorrar.classList = 'borrar-tweet';
      botonBorrar.innerText = 'X';
      // crear elemento y añadirle contenido a la lista
      const li = document.createElement('li');
      li.innerText = tweet;
      // añade el boton de borrar al tweet
      li.appendChild(botonBorrar);
      // añade el tweet a la lista
      listaTweets.appendChild(li);
  })
}

// Agrega tweet a LS
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  // añadir el nuevo tweet
  tweets.push(tweet);
  //convertir de string a array para local storage
  localStorage.setItem('tweets', JSON.stringify(tweets) );
  
}
// Comprobar que haya elementos en local storage, retorna un array
function obtenerTweetsLocalStorage(){
  let tweets;
 
  if(localStorage.getItem('tweets') === null){
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets') );
  }

  return tweets;
}

// Elimianr tweet de local storage

function borrarTweetLocalStorage(tweet) {  
  let tweets, tweetBorrar;

  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function(tweet, index) {
    if(tweetBorrar === tweet){
      tweets.splice(index, 1)
    }
  });
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

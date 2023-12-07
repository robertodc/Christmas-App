// Importa il modulo Firebase
const firebase = require("firebase");

// Inizializza il database
const db = firebase.initializeApp({
  apiKey: "AIzaSyBooPfv9J2U8TY8yvnnQkTDMu0pOoCc17I",
  authDomain: "natale-app.firebaseapp.com",
  projectId: "natale-app",
  storageBucket: "natale-app.appspot.com",
  messagingSenderId: "678815122675",
  appId: "1:678815122675:web:d07d2ba57c46fda35ea386"
});

// Carica la lista degli utenti
const utentiRef = db.collection("utenti");
utentiRef.on("value", (snapshot) => {
  const utenti = snapshot.docs.map((doc) => doc.data());
  // Aggiorna la lista degli utenti
  document.querySelector(".utenti ul").innerHTML = utenti.map((utente) => `
    <li>
      <a href="#">${utente.nome}</a>
    </li>
  `).join("");
});

// Carica la lista dei regali
const regaliRef = db.collection("regali");
regaliRef.on("value", (snapshot) => {
  const regali = snapshot.docs.map((doc) => doc.data());
  // Aggiorna la lista dei regali
  document.querySelector(".regali ul").innerHTML = regali.map((regalo) => `
    <li>
      <a href="#">${regalo.nome}</a>
      <a href="#">Acquista</a>
    </li>
  `).join("");
});

// Quando un utente clicca sul link "Acquista", rimuove il regalo dalla lista
document.querySelector(".regali ul a").addEventListener("click", (e) => {
  // Ottiene il nome del regalo
  const nomeRegalo = e.target.textContent;

  // Rimuove il regalo dal database
  regaliRef.doc(nomeRegalo).delete();
});

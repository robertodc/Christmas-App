// Importa il modulo Firebase
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBooPfv9J2U8TY8yvnnQkTDMu0pOoCc17I",
  authDomain: "natale-app.firebaseapp.com",
  databaseURL: "https://natale-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "natale-app",
  storageBucket: "natale-app.appspot.com",
  messagingSenderId: "678815122675",
  appId: "1:678815122675:web:d07d2ba57c46fda35ea386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Carica la lista degli utenti
const utentiRef = db.collection("utenti");
utentiRef.on("value", (snapshot) => {
  const utenti = snapshot.docs.map((doc) => doc.data());
  // Aggiorna la lista degli utenti
  document.querySelector(".utenti ul").innerHTML = utenti.map((utente) => `
    <li>
      <a href="#"><span class="math-inline">\{utente\.nome\}</a\>
</li\>
\`\)\.join\(""\);
\}\);
// Carica la lista dei regali
const regaliRef \= db\.collection\("regali"\);
regaliRef\.on\("value", \(snapshot\) \=\> \{
const regali \= snapshot\.docs\.map\(\(doc\) \=\> doc\.data\(\)\);
// Aggiorna la lista dei regali
document\.querySelector\("\.regali ul"\)\.innerHTML \= regali\.map\(\(regalo\) \=\> \`
<li\>
<a href\="\#"\></span>{regalo.nome}</a>
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

// Quando un utente fa il login, salva il suo nome e lo mostra nella lista degli utenti
const loginButton = document.querySelector(".login button");
loginButton.addEventListener("click", (e) => {
  // Ottiene l'username e la password dall'utente
  const username = document.querySelector(".login input[name='username']").value;
  const password = document.querySelector(".login input[name='password']").value;

  // Esegue l'autenticazione con Firebase
  firebase.auth().signInWithEmailAndPassword(username, password).then((user) => {
    // Salva il nome dell'utente nel database
    const utentiRef = db.collection("utenti");
    utentiRef.doc(user.uid).set({ nome: username });

    // Mostra il nome dell'utente nella lista degli utenti
    const utentiList = document.querySelector(".utenti ul");
    utentiList.innerHTML += `<li><a href="#">${username}</a></li>`;
  });
});
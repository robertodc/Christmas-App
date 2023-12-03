<script type="importmap">
<![CDATA[{
    "imports": {
        "firebase/app": "https://www.gstatic.com/firebasejs/9.6.6/firebase-app-compat.js"
    }
}]]>
</script>
<script type="module">
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Inizializza Firebase con le tue credenziali
const firebaseConfig = {
  apiKey: "AIzaSyBooPfv9J2U8TY8yvnnQkTDMu0pOoCc17I",
  authDomain: "natale-app.firebaseapp.com",
  projectId: "natale-app",
  storageBucket: "natale-app.appspot.com",
  messagingSenderId: "678815122675",
  appId: "1:678815122675:web:d07d2ba57c46fda35ea386"
};

const app = initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
</script>
let currentUser;

function login() {
  const usernameSelect = document.getElementById('username');
  const selectedUsername = usernameSelect.value;

  if (selectedUsername.trim() !== '') {
    // Creiamo un account Firebase con l'username come email e una password casuale
    const password = Math.random().toString(36).substring(7); // Generiamo una password casuale
    const email = `${selectedUsername}@example.com`; // Usiamo un'email basata sull'username

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        currentUser = userCredential.user;
        renderWishlist();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }
}

function renderWishlist() {
  const userListContainer = document.getElementById('user-list');
  userListContainer.innerHTML = '<h3>Wishlist</h3>';

  // Recupera gli utenti dal database Firebase
  db.collection("users").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const user = doc.data();
      if (user.uid !== currentUser.uid) {
        const userDiv = document.createElement('div');
        userDiv.textContent = user.username;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Gift';
        deleteButton.onclick = () => deleteGift(user.uid);
        userDiv.appendChild(deleteButton);
        userListContainer.appendChild(userDiv);

        // Recupera i regali dal database Firebase e li mostra
        db.collection("gifts").doc(user.uid).get().then(giftDoc => {
          if (giftDoc.exists) {
            const giftDiv = document.createElement('div');
            giftDiv.textContent = `Gift: ${giftDoc.data().gift}`;
            userListContainer.appendChild(giftDiv);
          }
        });
      }
    });
  });
}

function deleteGift(uid) {
  // Implementa la rimozione del regalo (potrebbe aggiornare il backend)
  // In questo esempio, rimuoviamo il regalo dal database
  db.collection("gifts").doc(uid).delete().then(() => {
    console.log("Gift successfully deleted!");
    renderWishlist();
  }).catch(error => {
    console.error("Error removing gift: ", error);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const usernameSelect = document.getElementById('username');
  // users.forEach(user => {
  //   const option = document.createElement('option');
  //   option.value = user;
  //   option.text = user;
  //   usernameSelect.appendChild(option);
  // });
  // Sostituisci la creazione statica di utenti con il recupero dinamico degli utenti dal database Firebase
  db.collection("users").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const user = doc.data();
      const option = document.createElement('option');
      option.value = user.username;
      option.text = user.username;
      usernameSelect.appendChild(option);
    });
  });
});

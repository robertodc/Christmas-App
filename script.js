let users = ["Chiara", "Tony", "Gelsomina", "Sofia", "Alice", "Lidia", "Roberto"];
let currentUser = null;
let gifts = [];

function login() {
  const username = document.getElementById('username').value;
  if (username.trim() !== '') {
    currentUser = username;
    users = users.filter(user => user !== username); // Rimuove il nome utente dalla lista degli utenti
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('wishlist-container').style.display = 'block';
    renderUserList();
  }
}

function addGift() {
  const giftInput = document.getElementById('add-gift-input');
  const gift = giftInput.value;
  if (gift.trim() !== '') {
    gifts.push({ user: currentUser, gift: gift });
    renderWishlist();
    renderUserList();
    giftInput.value = '';
  }
}

function chooseGift() {
  if (gifts.length > 0) {
    const randomIndex = Math.floor(Math.random() * gifts.length);
    const chosenGift = gifts[randomIndex];
    alert(`Your chosen gift for ${chosenGift.user}: ${chosenGift.gift}`);
    gifts = gifts.filter(gift => gift.user !== currentUser); // Rimuove i regali scelti dall'utente corrente
    renderWishlist();
    renderUserList();
  } else {
    alert('Nesun regalo disponibile.');
  }
}

function deleteGift(user) {
  gifts = gifts.filter(gift => !(gift.user === user && gift.user === currentUser));
  renderWishlist();
  renderUserList();
}

function renderWishlist() {
  const wishlistContainer = document.getElementById('wishlist');
  wishlistContainer.innerHTML = '';
  gifts.forEach(gift => {
    const li = document.createElement('li');
    li.className = 'gift';
    li.textContent = `${gift.user}: ${gift.gift}`;
    wishlistContainer.appendChild(li);
  });
}

function renderUserList() {
  const userListContainer = document.getElementById('user-list');
  userListContainer.innerHTML = '<h3>User List</h3>';
  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.textContent = user;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Gift';
    deleteButton.onclick = () => deleteGift(user);
    userDiv.appendChild(deleteButton);
    userListContainer.appendChild(userDiv);
  });
}


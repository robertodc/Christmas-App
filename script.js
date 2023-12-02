let currentUser;
const users = [
  { username: 'Chiara', gifts: [] },
  { username: 'Tony', gifts: [] },
  { username: 'Gelsomina', gifts: [] },
  { username: 'Sofia', gifts: [] },
  { username: 'Alice', gifts: [] },
  { username: 'Lidia', gifts: [] },
  { username: 'Roberto', gifts: [] }
];

function login() {
  const usernameSelect = document.getElementById('username');
  const selectedUsername = usernameSelect.value;
  
  if (selectedUsername.trim() !== '') {
    currentUser = users.find(user => user.username === selectedUsername);
    renderWishlist();
  }
}

function addGift() {
  const giftInput = document.getElementById('add-gift-input');
  const gift = giftInput.value;
  
  if (gift.trim() !== '') {
    currentUser.gifts.push(gift);
    renderWishlist();
    giftInput.value = '';
  }
}

function renderWishlist() {
  const userListContainer = document.getElementById('user-list');
  userListContainer.innerHTML = '<h3>Wishlist</h3>';
  
  users.forEach(user => {
    if (user !== currentUser) {
      const userDiv = document.createElement('div');
      userDiv.textContent = user.username + ': ' + user.gifts.join(', ');
      userListContainer.appendChild(userDiv);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const usernameSelect = document.getElementById('username');
  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.username;
    option.text = user.username;
    usernameSelect.appendChild(option);
  });

  const addButton = document.getElementById('add-gift-button');
  addButton.addEventListener('click', addGift);
});

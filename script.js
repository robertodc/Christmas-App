// ...

function login() {
  const username = document.getElementById('username').value;
  if (username.trim() !== '') {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then(response => response.json())
    .then(data => {
      currentUser = username;
      users = [username];
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('wishlist-container').style.display = 'block';
      renderUserList();
      loadGiftsFromServer();
    })
    .catch(error => console.error('Error adding user:', error));
  }
}

function addGift() {
  const giftInput = document.getElementById('add-gift-input');
  const gift = giftInput.value;
  if (gift.trim() !== '') {
    fetch('/api/gifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1, gift }), // Assuming userId 1 for simplicity
    })
    .then(response => response.json())
    .then(data => {
      renderWishlist();
      renderUserList();
      giftInput.value = '';
    })
    .catch(error => console.error('Error adding gift:', error));
  }
}

function loadGiftsFromServer() {
  fetch('/api/gifts')
    .then(response => response.json())
    .then(data => {
      gifts = data;
      renderWishlist();
    })
    .catch(error => console.error('Error getting gifts:', error));
}

// ...

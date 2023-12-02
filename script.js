// ...

async function login() {
  const usernameSelect = document.getElementById('username');
  const selectedUsername = usernameSelect.value;

  if (selectedUsername.trim() !== '') {
    const userId = await addUser(selectedUsername);
    currentUser = { _id: userId, username: selectedUsername, gifts: [] };
    renderWishlist();
  }
}

async function addUser(username) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  const data = await response.json();
  return data.userId;
}

async function addGift() {
  const giftInput = document.getElementById('add-gift-input');
  const gift = giftInput.value;

  if (gift.trim() !== '') {
    await addGiftToUser(currentUser._id, gift);
    currentUser.gifts.push(gift);
    renderWishlist();
    giftInput.value = '';
  }
}

async function addGiftToUser(userId, gift) {
  await fetch('/api/gifts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, gift }),
  });
}

async function loadGiftsFromServer() {
  const response = await fetch('/api/gifts');
  const data = await response.json();
 

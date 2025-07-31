const API_KEY = 'DEMO_KEY';
const API_URL = 'https://api.nasa.gov/planetary/apod';

const form = document.getElementById('apodForm');
const dateInput = document.getElementById('dateInput');
const apodDisplay = document.getElementById('apodDisplay');
const favoritesList = document.getElementById('favoritesList');
const themeButton = document.getElementById('theme-button');

let favorites = [];

dateInput.max = new Date().toISOString().split('T')[0];

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
});

function loadFavorites() {
  const saved = localStorage.getItem('apodFavorites');
  favorites = saved ? JSON.parse(saved) : [];
  renderFavorites();
}

function saveFavorites() {
  localStorage.setItem('apodFavorites', JSON.stringify(favorites));
}

function renderFavorites() {
  favoritesList.innerHTML = '';
  if (favorites.length === 0) {
    favoritesList.textContent = 'No favorites saved yet.';
    return;
  }

  favorites.forEach((fav, index) => {
    const favDiv = document.createElement('div');
    favDiv.className = 'favorite-item';

    const img = document.createElement('img');
    img.src = fav.url;
    img.alt = fav.title;
    img.title = 'Click to view HD image';
    img.addEventListener('click', () => {
      window.open(fav.hdurl || fav.url, '_blank');
    });

    const title = document.createElement('p');
    title.textContent = `${fav.title} (${fav.date})`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      favorites.splice(index, 1);
      saveFavorites();
      renderFavorites();
    });

    favDiv.appendChild(img);
    favDiv.appendChild(title);
    favDiv.appendChild(deleteBtn);
    favoritesList.appendChild(favDiv);
  });
}
function displayApod(data) {
  apodDisplay.innerHTML = '';

  const container = document.createElement('div');

  const title = document.createElement('h2');
  title.textContent = data.title;

  const date = document.createElement('p');
  date.textContent = `Date: ${data.date}`;

  const explanation = document.createElement('p');
  explanation.textContent = data.explanation;

  container.appendChild(title);
  container.appendChild(date);

  if (data.media_type === 'image') {
    const img = document.createElement('img');
    img.src = data.url;
    img.alt = data.title;
    img.title = 'Click to view HD image';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      window.open(data.hdurl || data.url, '_blank');
    });
    container.appendChild(img);
  } else {
    const msg = document.createElement('p');
    msg.textContent = 'Media type is not an image. Video display is not supported.';
    container.appendChild(msg);
  }

  container.appendChild(explanation);

  const favBtn = document.createElement('button');
  const isFavorite = favorites.some(fav => fav.date === data.date);
  favBtn.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';

  favBtn.addEventListener('click', () => {
    const index = favorites.findIndex(fav => fav.date === data.date);
    if (index > -1) {
      favorites.splice(index, 1);
      favBtn.textContent = 'Add to Favorites';
    } else {
      favorites.push(data);
      favBtn.textContent = 'Remove from Favorites';
    }
    saveFavorites();
    renderFavorites();
  });

  container.appendChild(favBtn);
  apodDisplay.appendChild(container);
}

async function fetchApod(date) {
  try {
    const url = `${API_URL}?api_key=${API_KEY}&date=${date}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch APOD data');
    const data = await response.json();
    displayApod(data);
  } catch (error) {
    apodDisplay.textContent = `Error: ${error.message}`;
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const date = dateInput.value;
  if (!date) return;
  fetchApod(date);
});

loadTheme();
loadFavorites();

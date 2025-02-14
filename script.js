import { generateAIMovieData } from './movieGenerator.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const randomButton = document.getElementById('random-button');
  const movieContainer = document.getElementById('movie-container');
  const startScreen = document.getElementById('start-screen');
  const loadingScreen = document.getElementById('loading-screen');
  const movieTitle = document.getElementById('movie-title');
  const movieYear = document.getElementById('movie-year');
  const movieRating = document.getElementById('movie-rating');
  const movieDuration = document.getElementById('movie-duration');
  const moviePlot = document.getElementById('movie-plot');
  const moviePoster = document.getElementById('movie-poster');
  const castList = document.getElementById('cast-list');
  const seeMoreCastButton = document.getElementById('see-more-cast');
  const reviewsContainer = document.getElementById('reviews-container');

  function showLoading() {
    loadingScreen.style.display = 'flex';
    movieContainer.style.display = 'none';
    startScreen.style.display = 'none';
  }

  function hideLoading() {
    loadingScreen.style.display = 'none';
    movieContainer.style.display = 'block';
    startScreen.style.display = 'none';
  }

  async function generateMovie(title) {
    showLoading();
    try {
      const movieData = await generateAIMovieData(title);
      movieTitle.textContent = movieData.title;
      movieYear.textContent = `Year: ${movieData.year}`;
      movieRating.textContent = `Rating: ${movieData.rating}`;
      movieDuration.textContent = `Duration: ${movieData.duration}`;
      moviePlot.textContent = movieData.plot;
      moviePoster.src = movieData.poster;

      castList.innerHTML = ''; // Clear existing cast
      movieData.cast.forEach(actor => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${actor.image}" alt="${actor.name}">
          <span>${actor.name}</span>
        `;
        castList.appendChild(li);
      });

      reviewsContainer.innerHTML = '';
      movieData.reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `<p class="review-text">${review}</p>`;
        reviewsContainer.appendChild(reviewDiv);
      });

      hideLoading();
    } catch (error) {
      console.error("Error generating movie:", error);
      movieTitle.textContent = "Failed to generate movie. Please try again.";
      hideLoading();
    }
  }

  async function getRandomMovieTitle() {
    const titles = ["Cosmic Cleaners", "Galactic Grocers", "Robotic Revolution", "Whispers of the Forgotten Planet", "Echoes of Tomorrow"];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      generateMovie(searchTerm);
    }
  });

  randomButton.addEventListener('click', async () => {
    const randomTitle = await getRandomMovieTitle();
    generateMovie(randomTitle);
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });

  // Placeholder for additional functionality for the "See More" cast button.
});

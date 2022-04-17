
const API_KEY = '';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
// const language = navigator.language;

window.addEventListener('load', function () {
  if (API_KEY === '') {
    alert('Please enter your API key');
    return;
  }
  getMovies();
});

const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  siderbarClose = document.querySelector(".siderbarClose"),
  search = document.querySelector(".search-box input"),
  moviesWrapper = document.querySelector(".movies-wrapper");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");
});


sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
});

body.addEventListener("click", e => {
  let clickedElm = e.target;

  if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
    nav.classList.remove("active");
  }
});

search.addEventListener("keyup", e => {
  if (e.target.value === null || e.target.value === "") getMovies();
  let searchValue = e.target.value,
    value = searchValue.toLowerCase(),
    movieBox = document.querySelectorAll(".movie-box");
  movieBox.forEach(movie => {
    let movieTitle = movie.dataset.name.toLowerCase();
    if (movieTitle === value) {
      getMovie(movie.dataset.id);
    }
  });
});

function getMovies() {
  let html = "";
  moviesWrapper.innerHTML = '';
  return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(movie => {
        html += `
                <div class="movie-box" data-name="${movie.title}" data-id="${movie.id}">
                    <img src="${IMAGE_URL}${movie.poster_path}" alt="">
                    <h6>${movie.title}</h6>
                </div>
                `
      });
      moviesWrapper.insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => console.log(error))
}

function getMovie(movieId) {
  if (movieId === undefined || movieId === null) {
    return;
  }
  let html = "";
  moviesWrapper.innerHTML = '';
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      html += `
            <div class="movie-box" data-name="${data.title}">
                <img src="${IMAGE_URL}${data.poster_path}" alt="">
                <h6>${data.title}</h6>
            </div>
            `
      moviesWrapper.insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => console.log(error))
}


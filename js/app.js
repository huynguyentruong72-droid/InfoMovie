const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genres: ["Hành động", "Khoa học viễn tưởng"],
        poster: "images/inception.jpg",
        description: "Kẻ trộm xâm nhập giấc mơ để đánh cắp bí mật.",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio"
    },
    {
        id: 2,
        title: "Avatar",
        year: 2009,
        genres: ["Phiêu lưu", "Khoa học viễn tưởng"],
        poster: "images/avatar.jpg",
        description: "Cuộc chiến sinh tồn trên hành tinh Pandora.",
        director: "James Cameron",
        actors: "Sam Worthington"
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genres: ["Hành động"],
        poster: "images/batman.jpg",
        description: "Batman đối đầu Joker.",
        director: "Christopher Nolan",
        actors: "Christian Bale"
    },
    {
        id: 4,
        title: "Titanic",
        year: 1997,
        genres: ["Lãng mạn", "Chính kịch"],
        poster: "images/titanic.jpg",
        description: "Chuyện tình trên con tàu định mệnh.",
        director: "James Cameron",
        actors: "Leonardo DiCaprio"
    },
    {
        id: 5,
        title: "The Matrix",
        year: 1999,
        genres: ["Hành động", "Khoa học viễn tưởng"],
        poster: "images/matrix.jpg",
        description: "Thế giới thực chỉ là ảo giác.",
        director: "Wachowski",
        actors: "Keanu Reeves"
    }
];

const movieList = document.getElementById("movieList");
const genreFilters = document.getElementById("genreFilters");
const searchInput = document.getElementById("searchInput");

let selectedGenres = [];
let searchKeyword = "";

/* RENDER MOVIES */
function renderMovies(list) {
    movieList.innerHTML = "";
    list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <img src="${movie.poster}">
            <div class="info">
                <h4>${movie.title}</h4>
                <p>${movie.year}</p>
            </div>
        `;
        card.onclick = () => openModal(movie);
        movieList.appendChild(card);
    });
}

/* GENRE FILTER */
function createGenreFilters() {
    const genres = new Set();
    movies.forEach(m => m.genres.forEach(g => genres.add(g)));

    genres.forEach(genre => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="checkbox" value="${genre}"> ${genre}
        `;
        label.querySelector("input").onchange = e => {
            if (e.target.checked) {
                selectedGenres.push(genre);
            } else {
                selectedGenres = selectedGenres.filter(g => g !== genre);
            }
            applyFilters();
        };
        genreFilters.appendChild(label);
        genreFilters.appendChild(document.createElement("br"));
    });
}

/* FILTER LOGIC */
function applyFilters() {
    let filtered = movies;

    if (selectedGenres.length > 0) {
        filtered = filtered.filter(m =>
            selectedGenres.some(g => m.genres.includes(g))
        );
    }

    if (searchKeyword) {
        filtered = filtered.filter(m =>
            m.title.toLowerCase().includes(searchKeyword)
        );
    }

    renderMovies(filtered);
}

/* DEBOUNCE */
function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

searchInput.addEventListener("input", debounce(e => {
    searchKeyword = e.target.value.toLowerCase();
    applyFilters();
}, 400));

/* MODAL */
const modal = document.getElementById("movieModal");
const closeBtn = document.querySelector(".close-btn");

function openModal(movie) {
    modal.style.display = "flex";
    document.getElementById("modalPoster").src = movie.poster;
    document.getElementById("modalTitle").textContent = movie.title;
    document.getElementById("modalYear").textContent = movie.year;
    document.getElementById("modalDescription").textContent = movie.description;
    document.getElementById("modalDirector").textContent = movie.director;
    document.getElementById("modalActors").textContent = movie.actors;
}

closeBtn.onclick = () => modal.style.display = "none";

/* DARK MODE */
const toggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
}
toggle.onchange = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
};

/* INIT */
createGenreFilters();
renderMovies(movies);

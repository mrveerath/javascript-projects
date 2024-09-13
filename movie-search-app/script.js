window.addEventListener("DOMContentLoaded", () => {
    const singleMovieContainer = document.querySelector(".show-Single-movie-detail");
    const closeBtn = document.querySelector(".close-btn");
    
    // Close movie detail modal
    closeBtn.addEventListener("click", () => {
        singleMovieContainer.style.display = "none";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const movieName = form.querySelector("input").value.trim(); // Ensure no extra spaces
        if (!movieName) {
            alert("Please Enter A Movie Name");
        } else {
            form.reset();
            let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}&language=en-US&page=1&include_adult=true`;
            fetchMovie(url)
                .then((movies) => {
                    representMovieList(movies); // Display search results
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });

    // Function to fetch data from the API using XMLHttpRequest
    async function fetchMovie(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        resolve(response.results || response); // results for list, raw response for details
                    } else {
                        reject("Movie Not Found");
                    }
                }
            };
            xhr.onerror = function () {
                reject("Network Error");
            };
            xhr.send();
        });
    }

    // Display list of movies from the search
    function representMovieList(movies) {
        const movieContainer = document.querySelector(".movie-container");
        movieContainer.innerHTML = "";
        const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

        movies.forEach((movie) => {
            const documentElem = document.createElement("div");
            documentElem.className = 'single-movie';
            documentElem.innerHTML = `
                <img src="${imageBaseUrl}/${movie.poster_path}" alt="${movie.title}" />
                <p>${movie.original_title}</p>
            `;

            // When a movie is clicked, fetch detailed information
            documentElem.onclick = () => {
                singleMovieContainer.style.display = "block"; // Show the movie details container

                // Fetch detailed information about the selected movie
                let detailUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`; // Movie details API
                let creditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}&language=en-US`; // Movie credits API

                // Fetch both movie details and credits
                Promise.all([fetchMovie(detailUrl), fetchMovie(creditsUrl)])
                    .then(([movieDetails, credits]) => {
                        representMovieDetails(movieDetails, credits);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
            movieContainer.appendChild(documentElem);
        });
    }

    // Display detailed information about a movie
    function representMovieDetails(movieDetails, credits) {
        const movieContainer = document.querySelector(".movie-detail");
        movieContainer.innerHTML = ""; // Clear previous content
    
        const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
        const director = credits.crew.find(member => member.job === "Director");
        const actors = credits.cast.slice(0, 10).map(actor => actor.name).join(", "); // Get top 10 actors
        const genres = movieDetails.genres.map(genre => genre.name).join(", "); // Get genres
        const productionCompanies = movieDetails.production_companies.map(company => company.name).join(", "); // Get production companies
        const languages = movieDetails.spoken_languages.map(lang => lang.name).join(", "); // Get spoken languages
        const country = movieDetails.production_countries.map(country => country.name).join(", "); // Get production countries
    
        // Display movie details with additional fields
        movieContainer.innerHTML = `
                <div class="movie-image">
                    <img src="${imageBaseUrl + movieDetails.poster_path}" alt="${movieDetails.title}">
                </div>
                <div class="movie-info">
                    <h2>${movieDetails.title}</h2>
                    <div class="more-details">
                    <p><strong>Country:</strong> ${country}</p>
                    <p><strong>Languages:</strong> ${languages}</p>
                    <p><strong>Runtime:</strong> ${movieDetails.runtime} minutes</p>
                    <p><strong>Tagline:</strong> ${movieDetails.tagline || "N/A"}</p>
                    <p><strong>Rating:</strong> ${movieDetails.vote_average} / 10 (${movieDetails.vote_count} votes)</p>
                    <p><strong>Budget:</strong> $${movieDetails.budget.toLocaleString()}</p>
                    <p><strong>Revenue:</strong> $${movieDetails.revenue.toLocaleString()}</p>
                    <p><strong>Release Date:</strong> ${movieDetails.release_date}</p>
                    <p><strong>Director:</strong> ${director ? director.name : 'N/A'}</p>
                    </div>
                    <p><strong>Genres:</strong> ${genres}</p>
                    <p><strong>Overview:</strong> ${movieDetails.overview}</p>
                    <p><strong>Cast:</strong> ${actors}</p>
                    <p><strong>Production Companies:</strong> ${productionCompanies}</p>
                </div>
        `;
    }
    
});

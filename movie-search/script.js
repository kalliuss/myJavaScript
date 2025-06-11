const API_KEY = "YOUR_APIKEY";
const searchInput = document.getElementById("searchInp");
const results = document.getElementById("results");
const infoMessage = document.getElementById("infoMessage")


//modal 
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');

async function searchMovies(query) {
    results.innerHTML = '';
    infoMessage.style.display = 'none';
  
    if (!query) {
      infoMessage.textContent = 'Film aramaya başlayın...';
      infoMessage.style.display = 'block';
      return;
    }
  
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
      const data = await response.json();
  
      if (data.Response === 'True') {
        if (data.Search.length === 0) {
          infoMessage.textContent = 'Film bulunamadı.';
          infoMessage.style.display = 'block';
        } else {
          displayMovies(data.Search);
        }
      } else {
        infoMessage.textContent = `Film bulunamadı: ${data.Error}`;
        infoMessage.style.display = 'block';
      }
    } catch (error) {
      infoMessage.textContent = 'Arama sırasında bir hata oluştu.';
      infoMessage.style.display = 'block';
      console.error(error);
    }
  }

function displayMovies(movies){
    results.innerHTML = movies.map(movie => `
    <div class="movie-card" data-imdbid="${movie.imdbID}">
      <img class="movie-poster" src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}" alt="${movie.Title}" />
      <div class="movie-info">
        <h3 class="movie-title">${movie.Title}</h3>
        <p class="movie-year">${movie.Year}</p>
      </div>
    </div>
  `).join("");
    
}
// debounce 

// ? debounce : Kullanıcı yazarken API çağrısı yapacağız. 
//? Ancak her tuş basışında anında çağrı yapmak yerine, kullanıcı yazmayı bitirince (örneğin 500 ms sonra) çağrı yapacağız. Buna debounce denir.

function debounce(func, delay){
    let timeoutId;
    return function(...args){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


const debouncedSearch = debounce((e) => {
    searchMovies(e.target.value.trim());
}, 500);

searchInput.addEventListener("input", debouncedSearch);


// modal kapatma fonks.

function closeModal(){
    modal.classList.remove('active');
    modalBody.innerHTML = "";
}

// modal kapatma butonu

modalCloseBtn.addEventListener('click', closeModal);

// modal dışına tıklayınca kapatma

modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
});


// movie card details

results.addEventListener('click', async (e) => {
    const movieCard = e.target.closest('.movie-card');
    if (!movieCard) return;
  
    const imdbID = movieCard.getAttribute('data-imdbid');  // imdbID burada tanımlanmalı ve kullanılmalı.
  
    console.log('Seçilen film imdbID:', imdbID);
  
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
      const data = await response.json();
      console.log('Detay API cevabı:', data);
  
      if (data.Response === 'True') {
        showMovieDetails(data);
      } else {
        alert(`Detay bilgisi alınamadı: ${data.Error}`);
      }
    } catch (error) {
      alert('Bir hata oluştu.');
      console.error(error);
    }
  });


// modal içeriği doldurma fonks

function showMovieDetails(movie) {
    modalBody.innerHTML = `
      <h2>${movie.Title} (${movie.Year})</h2>
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x440?text=No+Image'}" alt="${movie.Title}" style="width: 100%; max-width: 300px; border-radius: 12px; margin-bottom: 15px;">
      <p><strong>Tür:</strong> ${movie.Genre}</p>
      <p><strong>Yönetmen:</strong> ${movie.Director}</p>
      <p><strong>Oyuncular:</strong> ${movie.Actors}</p>
      <p><strong>Özet:</strong> ${movie.Plot}</p>
      <p><strong>IMDB Puanı:</strong> ${movie.imdbRating}</p>
    `;
    modal.classList.add('active');
  }



// dark mode


const darkModeToggle = document.getElementById('darkModeToggle');

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark');
    darkModeToggle.textContent = '☀️'; // Açık mod simgesi
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark');
    darkModeToggle.textContent = '🌙'; // Koyu mod simgesi
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Sayfa yüklendiğinde kayıtlı tercih varsa uygula
document.addEventListener('DOMContentLoaded', () => {
  const darkModeSetting = localStorage.getItem('darkMode');
  if (darkModeSetting === 'enabled') {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
});

// Toggle butonuna tıklandığında mod değiştir
darkModeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setDarkMode(!isDark);
});



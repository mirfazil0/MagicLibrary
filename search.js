// DOM elementləri
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const filterToggle = document.getElementById('filterToggle');
const filterPanel = document.getElementById('filterPanel');
const clearFilters = document.getElementById('clearFilters');
const applyFilters = document.getElementById('applyFilters');
const searchResults = document.getElementById('searchResults');
const searchResultsCount = document.getElementById('searchResultsCount');
const sortSelect = document.getElementById('sortSelect');
const priceFilterBtn = document.getElementById('priceFilterBtn');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const minRatingInput = document.getElementById('minRating');
const maxRatingInput = document.getElementById('maxRating');

// Cari filtrlər
let currentFilters = {
    query: '',
    genres: [],
    minPrice: 0,
    maxPrice: Infinity,
    minRating: 1,
    maxRating: 5
};

// Kitabları yüklə
function loadBooks() {
    if (typeof window.books === 'undefined' || !Array.isArray(window.books)) {
        window.books = [];
        const scriptElement = document.createElement('script');
        scriptElement.src = 'script.js';
        document.head.appendChild(scriptElement);
        
        return new Promise((resolve) => {
            scriptElement.onload = () => {
                if (Array.isArray(window.books)) {
                    resolve(window.books);
                } else {
                    console.error('Kitablar yüklənmədi');
                    resolve([]);
                }
            };
        });
    }
    return Promise.resolve(window.books);
}

// Səhifə yükləndikdə
document.addEventListener('DOMContentLoaded', async function() {
    // Reytinq inputlarına məhdudiyyətlər əlavə et
    if (minRatingInput) {
        minRatingInput.setAttribute('type', 'number');
        minRatingInput.setAttribute('min', '1');
        minRatingInput.setAttribute('max', '5');
        minRatingInput.setAttribute('step', '0.1');
        minRatingInput.value = '1';
        
        minRatingInput.addEventListener('input', function() {
            let value = parseFloat(this.value);
            if (value < 1) this.value = 1;
            if (value > 5) this.value = 5;
            if (maxRatingInput && value > parseFloat(maxRatingInput.value)) {
                this.value = maxRatingInput.value;
            }
        });
    }
    
    if (maxRatingInput) {
        maxRatingInput.setAttribute('type', 'number');
        maxRatingInput.setAttribute('min', '1');
        maxRatingInput.setAttribute('max', '5');
        maxRatingInput.setAttribute('step', '0.1');
        maxRatingInput.value = '5';
        
        maxRatingInput.addEventListener('input', function() {
            let value = parseFloat(this.value);
            if (value < 1) this.value = 1;
            if (value > 5) this.value = 5;
            if (minRatingInput && value < parseFloat(minRatingInput.value)) {
                this.value = minRatingInput.value;
            }
        });
    }

    // URL-dən axtarış parametrini al
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        currentFilters.query = searchQuery;
        // Axtarış parametrini URL-dən təmizlə
        window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Kitabları yüklə
    await loadBooks();
    
    // Event listener-ləri quraşdır
    setupEventListeners();
    
    // İlk yükləmədə bütün kitabları göstər
    performSearch();
});

// Event listener-ləri quraşdırma
function setupEventListeners() {
    // Axtarış
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            if (searchInput) {
                currentFilters.query = searchInput.value.trim();
                performSearch();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                currentFilters.query = searchInput.value.trim();
                performSearch();
            }
        });
    }

    // Filter paneli
    if (filterToggle && filterPanel) {
        filterToggle.addEventListener('click', () => {
            filterPanel.classList.toggle('active');
        });
    }

    // Filtrləri təmizlə
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            // Checkbox-ları təmizlə
            document.querySelectorAll('.genre-options input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });

            // Qiymət və reytinq inputlarını təmizlə
            if (minPriceInput) minPriceInput.value = '';
            if (maxPriceInput) maxPriceInput.value = '';
            if (minRatingInput) minRatingInput.value = '1';
            if (maxRatingInput) maxRatingInput.value = '5';
            if (searchInput) searchInput.value = '';

            // Filtrləri sıfırla
            currentFilters = {
                query: '',
                genres: [],
                minPrice: 0,
                maxPrice: Infinity,
                minRating: 1,
                maxRating: 5
            };

            performSearch();
            if (filterPanel) filterPanel.classList.remove('active');
        });
    }

    // Filtrləri tətbiq et
    if (applyFilters) {
        applyFilters.addEventListener('click', () => {
            // Janrları yığ
            const selectedGenres = Array.from(document.querySelectorAll('.genre-options input[type="checkbox"]:checked'))
                .map(cb => cb.value);

            // Qiymət aralığını al
            const minPrice = minPriceInput ? parseFloat(minPriceInput.value) || 0 : 0;
            const maxPrice = maxPriceInput ? parseFloat(maxPriceInput.value) || Infinity : Infinity;

            // Reytinq aralığını al və məhdudlaşdır
            let minRating = minRatingInput ? parseFloat(minRatingInput.value) || 1 : 1;
            let maxRating = maxRatingInput ? parseFloat(maxRatingInput.value) || 5 : 5;

            // Reytinq məhdudiyyətləri
            minRating = Math.min(Math.max(minRating, 1), 5);
            maxRating = Math.min(Math.max(maxRating, 1), 5);

            if (minRatingInput) minRatingInput.value = minRating.toString();
            if (maxRatingInput) maxRatingInput.value = maxRating.toString();

            // Filtrləri yenilə
            currentFilters = {
                query: searchInput ? searchInput.value.trim() : '',
                genres: selectedGenres,
                minPrice: minPrice,
                maxPrice: maxPrice,
                minRating: minRating,
                maxRating: maxRating
            };

            performSearch();
            if (filterPanel) filterPanel.classList.remove('active');
        });
    }

    // Reytinq filtri
    const ratingStars = document.querySelectorAll('.rating-filter .stars i');
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                currentFilters.minRating = rating === currentFilters.minRating ? 1 : rating;
                updateStars();
                if (applyFilters) applyFilters.click();
            });
        });
    }

    // Janr filtri
    const genreCheckboxes = document.querySelectorAll('.genre-filters input[type="checkbox"]');
    if (genreCheckboxes.length > 0) {
        genreCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (applyFilters) applyFilters.click();
            });
        });
    }

    // Qiymət filtri
    if (priceFilterBtn) {
        priceFilterBtn.addEventListener('click', () => {
            if (applyFilters) applyFilters.click();
        });
    }

    // Sıralama
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            if (applyFilters) applyFilters.click();
        });
    }
}

// Axtarışı yerinə yetir
function performSearch() {
    if (!window.books || !Array.isArray(window.books)) {
        console.error('Kitablar tapılmadı');
        return;
    }

    let filteredBooks = [...window.books];

    // Axtarış filtri
    if (currentFilters.query) {
        const query = currentFilters.query.toLowerCase();
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query)
        );
    }

    // Janr filtri
    if (currentFilters.genres && currentFilters.genres.length > 0) {
        filteredBooks = filteredBooks.filter(book => 
            currentFilters.genres.includes(book.category)
        );
    }

    // Qiymət filtri
    if (currentFilters.minPrice > 0 || currentFilters.maxPrice < Infinity) {
        filteredBooks = filteredBooks.filter(book => 
            book.price >= currentFilters.minPrice &&
            (currentFilters.maxPrice === Infinity || book.price <= currentFilters.maxPrice)
        );
    }

    // Reytinq filtri
    filteredBooks = filteredBooks.filter(book => 
        book.rating >= currentFilters.minRating &&
        book.rating <= currentFilters.maxRating
    );

    displaySearchResults(filteredBooks);
}

function displaySearchResults(books) {
    const searchResults = document.getElementById('searchResults');
    const template = document.getElementById('bookCardTemplate');
    searchResults.innerHTML = '';

    if (!books || books.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-book-open"></i>
                <p>Heç bir kitab tapılmadı.</p>
            </div>
        `;
        return;
    }

    books.forEach(book => {
        const bookCard = template.content.cloneNode(true);
        
        // Kitab məlumatlarını doldur
        const img = bookCard.querySelector('.book-image');
        img.src = book.imageUrl || 'default-book.jpg';
        img.alt = book.title;
        
        bookCard.querySelector('.book-title').textContent = book.title;
        bookCard.querySelector('.book-author').textContent = book.author;
        bookCard.querySelector('.book-rating').innerHTML = generateStars(book.rating);
        bookCard.querySelector('.book-price').textContent = `${book.price} AZN`;

        // Düymələrə ID-ləri əlavə et
        const favoriteBtn = bookCard.querySelector('.favorite-btn');
        const cartBtn = bookCard.querySelector('.add-to-cart-btn');
        favoriteBtn.dataset.id = book.id;
        cartBtn.dataset.id = book.id;

        // Favoritlərdə olub-olmadığını yoxla
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (favorites.includes(book.id)) {
            favoriteBtn.querySelector('i').classList.remove('far');
            favoriteBtn.querySelector('i').classList.add('fas');
        }

        // Hadisə dinləyicilərini əlavə et
        favoriteBtn.addEventListener('click', () => toggleFavorite(book.id));
        cartBtn.addEventListener('click', () => addToCart(book.id));

        searchResults.appendChild(bookCard);
    });

    // Nəticələrin sayını göstər
    const countElement = document.getElementById('searchResultsCount');
    if (countElement) {
        countElement.textContent = `${books.length} kitab tapıldı`;
    }
}

// Sevimlilərə əlavə et funksiyası
function toggleFavorite(bookId) {
    const user = firebase.auth().currentUser;
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const button = document.querySelector(`.favorite-btn[data-id="${bookId}"]`);
    if (!button) return;

    const icon = button.querySelector('i');
    const isFavorite = icon.classList.contains('fas');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
        // Sevimlilərdən çıxar
        const index = favorites.indexOf(bookId);
        if (index > -1) {
            favorites.splice(index, 1);
        }
        icon.classList.remove('fas');
        icon.classList.add('far');
    } else {
        // Sevimlilərə əlavə et
        if (!favorites.includes(bookId)) {
            favorites.push(bookId);
        }
        icon.classList.remove('far');
        icon.classList.add('fas');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    showNotification(isFavorite ? 'Kitab sevimlilərdən çıxarıldı!' : 'Kitab sevimlilərə əlavə edildi!');
}

// Səbətə əlavə et funksiyası
function addToCart(bookId) {
    const user = firebase.auth().currentUser;
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const book = window.books.find(b => b.id === bookId);
    if (!book) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            imageUrl: book.imageUrl,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification('Kitab səbətə əlavə edildi!');
}

// Bildiriş göstər
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Sevimlilər UI-ni yenilə
function updateFavoritesUI() {
    window.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        const bookId = button.getAttribute('data-id');
        const icon = button.querySelector('i');
        
        if (window.favorites.includes(bookId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
}

// Ulduzları generasiya et
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Ulduzları yenilə
function updateStars() {
    const stars = document.querySelectorAll('.rating-filter .stars i');
    stars.forEach(star => {
        const rating = parseInt(star.getAttribute('data-rating'));
        if (rating <= currentFilters.minRating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Filtrləri təmizlə
function clearAllFilters() {
    searchInput.value = '';
    document.querySelectorAll('.genre-filters input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.rating-filter .stars i').forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
    minPriceInput.value = '';
    maxPriceInput.value = '';
    sortSelect.value = 'nameAsc';
    
    currentFilters = {
        query: '',
        genres: [],
        minRating: 0,
        minPrice: 0,
        maxPrice: Infinity,
        sortBy: 'nameAsc'
    };
    
    applyFilters();
} 
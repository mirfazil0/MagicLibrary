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

// Event listener-ləri bir dəfə əlavə et
let isEventListenerAdded = false;

function setupSearchResultsEventListener() {
    if (!isEventListenerAdded && searchResults) {
        searchResults.addEventListener('click', handleSearchResultsClick);
        isEventListenerAdded = true;
    }
}

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
        currentFilters.query = searchQuery;
        // Axtarış parametrini URL-dən təmizlə
        window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Kitabları yüklə
    await loadBooks();
    
    // Event listener-ləri quraşdır
    setupEventListeners();
    setupSearchResultsEventListener();
    
    // İlk yükləmədə bütün kitabları göstər
    performSearch();

    // Firebase-i inicializasiya et
    if (typeof firebase !== 'undefined') {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // İstifadəçi daxil olubsa, mövcud sevimlilər vəziyyətini yenilə
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const favoriteButtons = document.querySelectorAll('.favorite-btn');
                
                favoriteButtons.forEach(button => {
                    const bookId = button.getAttribute('data-id');
                    const icon = button.querySelector('i');
                    
                    if (favorites.some(f => f.id === bookId)) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    }
                });
            }
        });
    }
});

// Event listener-ləri quraşdırma
function setupEventListeners() {
    // Axtarış
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            if (searchInput) {
                currentFilters.query = searchInput.value.trim();
                performSearch();
                searchInput.value = ''; // Axtarışdan sonra inputu təmizlə
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                currentFilters.query = searchInput.value.trim();
                performSearch();
                searchInput.value = ''; // Axtarışdan sonra inputu təmizlə
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

// Nəticələri göstər
function displaySearchResults(books) {
    if (!searchResultsCount || !searchResults) return;
    
    searchResultsCount.textContent = `${books.length} kitab tapıldı`;
    
    if (books.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-book-open"></i>
                <p>Heç bir kitab tapılmadı.</p>
            </div>
        `;
        return;
    }

    let html = '';
    books.forEach(book => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorite = favorites.some(f => f.id === book.id);
        
        html += `
            <div class="book-card">
                <div class="book-header">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${book.id}">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                <img src="${book.image}" alt="${book.title}" class="book-image">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <div class="price-info">
                    <p class="price">${book.price.toFixed(2)} AZN</p>
                    ${book.oldPrice ? `<p class="old-price">${book.oldPrice.toFixed(2)} AZN</p>` : ''}
                </div>
                <div class="rating-info">
                    <div class="rating">
                        ${generateStars(book.rating)}
                        <span class="rating-text">${book.rating}</span>
                    </div>
                    <span class="review-count">(${book.reviewCount} şərh)</span>
                </div>
                <button class="add-to-cart" data-id="${book.id}" onclick="addToCart('${book.id}')">
                    <i class="fas fa-shopping-cart"></i> Səbətə Əlavə Et
                </button>
            </div>
        `;
    });

    searchResults.innerHTML = html;
    
    // Event listener-i yenidən quraşdır
    setupSearchResultsEventListener();
}

// Event delegation istifadə edərək click hadisələrini idarə et
searchResults.addEventListener('click', handleSearchResultsClick);

// Click hadisələrini idarə et
function handleSearchResultsClick(e) {
    const target = e.target;
    
    // Sevimlilər düyməsinə klik
    const favoriteBtn = target.closest('.favorite-btn');
    if (favoriteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const bookId = favoriteBtn.getAttribute('data-id');
        toggleFavorite(bookId);
        return;
    }
}

// Sevimlilərə əlavə et funksiyası
function toggleFavorite(bookId) {
    const user = firebase.auth().currentUser;
    if (!user) {
        showNotification('Zəhmət olmasa əvvəlcə daxil olun');
        return;
    }

    const button = document.querySelector(`.favorite-btn[data-id="${bookId}"]`);
    if (!button) return;

    const icon = button.querySelector('i');
    const isFavorite = icon.classList.contains('fas');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
        // Sevimlilərdən çıxar
        const index = favorites.findIndex(f => f.id === bookId);
        if (index > -1) {
            favorites.splice(index, 1);
        }
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.classList.remove('active');
        showNotification('Kitab sevimlilərdən çıxarıldı');
    } else {
        // Sevimlilərə əlavə et
        const book = window.books.find(b => b.id === bookId);
        if (book && !favorites.some(f => f.id === bookId)) {
            favorites.push({
                id: book.id,
                title: book.title,
                author: book.author,
                price: book.price,
                image: book.image,
                rating: book.rating,
                reviewCount: book.reviewCount,
                category: book.category
            });
        }
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.classList.add('active');
        showNotification('Kitab sevimlilərə əlavə edildi');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateAllFavoriteButtons();
}

// Səbətə əlavə et funksiyası
function addToCart(bookId) {
    const user = firebase.auth().currentUser;
    if (!user) {
        showNotification('Zəhmət olmasa əvvəlcə daxil olun');
        return;
    }

    const book = window.books.find(b => b.id === bookId);
    if (!book) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
        showNotification('Kitabın sayı artırıldı');
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: 1
        });
        showNotification('Kitab səbətə əlavə edildi');
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Səbət sayğacını yenilə
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Navbar-dakı səbət linkini tap
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink) {
        // Mövcud sayğacı təmizlə
        const cartText = cartLink.textContent.replace(/\(\d+\)/, '').trim();
        
        // Yeni sayğacı əlavə et
        if (totalItems > 0) {
            cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> ${cartText} (${totalItems})`;
        } else {
            cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> ${cartText}`;
        }
    }
}

// Bildiriş göstər
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Bildirişi animasiya ilə göstər
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // 3 saniyə sonra bildirişi sil
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
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

// Səhifə yükləndikdə səbət sayğacını yenilə
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

function updateAllFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        const bookId = button.getAttribute('data-id');
        const icon = button.querySelector('i');
        
        if (favorites.some(f => f.id === bookId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('active');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('active');
        }
    });
} 
// Kitablar
window.books = [
    {
        id: "1984",
        title: "1984",
        author: "George Orwell",
        price: 12.99,
        oldPrice: 15.99,
        image: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.8,
        reviewCount: 128,
        category: "roman"
    },
    {
        id: "sefiller",
        title: "Səfillər",
        author: "Victor Hugo",
        price: 15.99,
        oldPrice: 18.99,
        image: "https://m.media-amazon.com/images/I/411JYpEGhiL._SY445_SX342_.jpg",
        rating: 4.9,
        reviewCount: 156,
        category: "roman"
    },
    {
        id: "donkixot",
        title: "Don Kixot",
        author: "Miguel de Cervantes",
        price: 14.99,
        oldPrice: 17.99,
        image: "https://m.media-amazon.com/images/I/31xB3tokZrL._SY445_SX342_.jpg",
        rating: 4.7,
        reviewCount: 142,
        category: "roman"
    },
    {
        id: "kosmos",
        title: "Kosmos",
        author: "Carl Sagan",
        price: 16.99,
        oldPrice: 19.99,
        image: "https://m.media-amazon.com/images/I/41BwlYT0sNL._SY445_SX342_.jpg",
        rating: 4.6,
        reviewCount: 98,
        category: "elm"
    },
    {
        id: "balacasahzade",
        title: "Balaca Şahzadə",
        author: "Antoine de Saint-Exupéry",
        price: 11.90,
        oldPrice: 13.90,
        image: "https://m.media-amazon.com/images/I/71OZY035QKL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.9,
        reviewCount: 203,
        category: "usaq"
    },
    {
        id: "secilensiirler",
        title: "Seçilən Şeirlər",
        author: "Nazim Hikmət",
        price: 13.90,
        oldPrice: 15.90,
        image: "https://www.yapikrediyayinlari.com.tr/dosyalar/2020/07/henuz-vakit-varken-gulum.jpg",
        rating: 4.4,
        reviewCount: 89,
        category: "siir"
    },
    {
        id: 'cinayetceza',
        title: "Cinayət və Cəza",
        author: "Fyodor Dostoyevski",
        price: 22.90,
        oldPrice: 25.90,
        image: "https://m.media-amazon.com/images/I/91y4Xf0a7pL._SY522_.jpg",
        rating: 4.5,
        reviewCount: 98,
        category: "roman"
    },
    {
        id: 'portaqal',
        title: "Portağal Şirinliyi",
        author: "Jose Mauro De Vasconcelos",
        price: 12.90,
        oldPrice: 14.90,
        image: "https://m.media-amazon.com/images/I/71uaI1psJpL._SY466_.jpg",
        rating: 4.3,
        reviewCount: 87,
        category: "usaq"
    },
    {
        id: 'heyvanistan',
        title: "Heyvanıstan",
        author: "George Orwell",
        price: 14.90,
        oldPrice: 17.90,
        image: "https://m.media-amazon.com/images/I/71je3-DsQEL._SY522_.jpg",
        rating: 4.6,
        reviewCount: 142,
        category: "roman"
    },
    {
        id: 'elkimyaci',
        title: "Əlkimyaçı",
        author: "Paulo Coelho",
        price: 16.90,
        oldPrice: 19.90,
        image: "https://m.media-amazon.com/images/I/51bDuU2p5zL._SY445_SX342_.jpg",
        rating: 4.6,
        reviewCount: 167,
        category: "felsefe"
    },
    {
        id: 'qisatarix',
        title: "Zamanın Qısa Tarixi",
        author: "Stephen Hawking",
        price: 18.90,
        oldPrice: 21.90,
        image: "https://m.media-amazon.com/images/I/51X2RycvYSL._SY445_SX342_.jpg",
        rating: 4.7,
        reviewCount: 89,
        category: "elm"
    },
    {
        id: 'genler',
        title: "Genlərin Dili",
        author: "Dean Hamer",
        price: 19.90,
        oldPrice: 22.90,
        image: "https://m.media-amazon.com/images/I/31w806HXl7L._SY445_SX342_.jpg",
        rating: 4.5,
        reviewCount: 67,
        category: "elm"
    },
    {
        id: 'fizika',
        title: "Fizikanın Fəlsəfəsi",
        author: "Werner Heisenberg",
        price: 23.90,
        oldPrice: 26.90,
        image: "https://m.media-amazon.com/images/I/51WQcu+tqcL._SY445_SX342_.jpg",
        rating: 4.6,
        reviewCount: 45,
        category: "elm"
    },
    {
        id: 'sapiens',
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 29.90,
        oldPrice: 32.90,
        image: "https://m.media-amazon.com/images/I/81tPEe0egBL._SX385_.jpg",
        rating: 4.7,
        reviewCount: 156,
        category: "tarix"
    },
    {
        id: 'osmanli',
        title: "Osmanlı İmperiyası",
        author: "Halil İnalcık",
        price: 27.90,
        oldPrice: 30.90,
        image: "https://m.media-amazon.com/images/I/51TwgwYwuPL._SY445_SX342_.jpg",
        rating: 4.8,
        reviewCount: 134,
        category: "tarix"
    },
    {
        id: 'medeniyyet',
        title: "Mədəniyyət Tarixi",
        author: "Will Durant",
        price: 32.90,
        oldPrice: 35.90,
        image: "https://m.media-amazon.com/images/I/41-VSUBW0jL._SY445_SX342_.jpg",
        rating: 4.6,
        reviewCount: 98,
        category: "tarix"
    },
    {
        id: 'selcuklu',
        title: "Böyük Səlcuklu İmperiyası",
        author: "İbrahim Kafesoğlu",
        price: 26.90,
        oldPrice: 29.90,
        image: "https://cdn1.dokuzsoft.com/u/otuken/img/c/s/u/sultan-meliksah-devrinde-buyuk-selcuklu-imparatorlugu3117beb5b74c97d72e28166f07ee6fe1.jpg",
        rating: 4.5,
        reviewCount: 87,
        category: "tarix"
    },
    {
        id: 'pinokio',
        title: "Pinokio",
        author: "Carlo Collodi",
        price: 9.90,
        oldPrice: 12.90,
        image: "https://m.media-amazon.com/images/I/71BTKYd1RgL._SY385_.jpg",
        rating: 4.7,
        reviewCount: 156,
        category: "usaq"
    },
    {
        id: 'alisa',
        title: "Möcüzələr Diyarında Alisa",
        author: "Lewis Carroll",
        price: 13.90,
        oldPrice: 16.90,
        image: "https://m.media-amazon.com/images/I/51gDkZW2+9S._SY445_SX342_.jpg",
        rating: 4.8,
        reviewCount: 178,
        category: "usaq"
    },
    {
        id: 'zerdust',
        title: "Zərdüşt Belə Deyib",
        author: "Friedrich Nietzsche",
        price: 18.90,
        oldPrice: 21.90,
        image: "https://m.media-amazon.com/images/I/41Qz9af9gKL._SY445_SX342_.jpg",
        rating: 4.5,
        reviewCount: 145,
        category: "felsefe"
    },
    {
        id: 'respublika',
        title: "Respublika",
        author: "Platon",
        price: 20.90,
        oldPrice: 23.90,
        image: "https://m.media-amazon.com/images/I/51syxaBianL._SY445_SX342_.jpg",
        rating: 4.7,
        reviewCount: 123,
        category: "felsefe"
    },
    {
        id: 'etika',
        title: "Nikomax Etikası",
        author: "Aristotel",
        price: 19.90,
        oldPrice: 22.90,
        image: "https://m.media-amazon.com/images/I/41S7bj7KB0L._SY445_SX342_.jpg",
        rating: 4.6,
        reviewCount: 98,
        category: "felsefe"
    },
    {
        id: 'yapraklar',
        title: "Çəmən Yarpaqları",
        author: "Walt Whitman",
        price: 15.90,
        oldPrice: 18.90,
        image: "https://m.media-amazon.com/images/I/71fFB5cimdL._SY425_.jpg",
        rating: 4.6,
        reviewCount: 76,
        category: "siir"
    },
    {
        id: 'qezeller',
        title: "Seçilmiş Qəzəllər",
        author: "Məhəmməd Füzuli",
        price: 14.90,
        oldPrice: 17.90,
        image: "https://kitaboxu.com/wp-content/uploads/2023/02/mehemmed-fizuli.png",
        rating: 4.8,
        reviewCount: 112,
        category: "siir"
    },
    {
        id: 'rubailer',
        title: "Rübailər",
        author: "Ömər Xəyyam",
        price: 12.90,
        oldPrice: 15.90,
        image: "https://m.media-amazon.com/images/I/51oCFIuMVHL._SY445_SX342_.jpg",
        rating: 4.9,
        reviewCount: 145,
        category: "siir"
    }
];

// Sevimlilər array-i - global səviyyədə
window.favorites = [];

// Sevimliləri yüklə
function loadFavorites() {
    try {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            const parsedFavorites = JSON.parse(savedFavorites);
            if (Array.isArray(parsedFavorites)) {
                window.favorites = parsedFavorites;
                console.log('Sevimlilər yükləndi:', window.favorites);
            }
        }
    } catch (error) {
        console.error('Sevimlilər yüklənərkən xəta baş verdi:', error);
        window.favorites = [];
    }
}

// Səhifə yükləndikdə
document.addEventListener('DOMContentLoaded', function() {
    // Kitabları qlobal dəyişənə əlavə et
    if (!window.books) {
        window.books = [];
        // Kateqoriyalardakı kitabları əlavə et
        if (typeof categoryData !== 'undefined') {
            for (let category in categoryData) {
                categoryData[category].books.forEach(book => {
                    if (!window.books.find(b => b.id === book.id)) {
                        window.books.push({
                            ...book,
                            category: category
                        });
                    }
                });
            }
        }
    }

    // Səbət funksionallığı
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Firebase konfiqurasiyası
    const firebaseConfig = {
        apiKey: "AIzaSyDrDx58dmssfeBLkPwCGcPbmdKVYUdC378",
        authDomain: "magiclibrary-7bd11.firebaseapp.com",
        projectId: "magiclibrary-7bd11",
        storageBucket: "magiclibrary-7bd11.firebasestorage.app",
        messagingSenderId: "822171231091",
        appId: "1:822171231091:web:a9cf3ddf08c304c2e4db06",
        measurementId: "G-H31EZNZ4W1"
    };

    // Firebase-i başlat
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Header axtarışını quraşdır
    setupHeaderSearch();

    // Auth state listener-i quraşdır
    setupAuthStateListener();

    // Ana səhifədəki "Səbətə əlavə et" düymələrinə click hadisəsi əlavə et
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.onclick = () => {
            const bookId = button.getAttribute('data-id');
            addToCart(bookId);
        };
    });

    // Sevimliləri yüklə
    loadFavorites();

    // Sevimlilərə əlavə et/çıxar düymələrinə click hadisəsi əlavə et
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const bookId = button.getAttribute('data-id');
            toggleFavorite(bookId);
        };
    });

    // Slider üçün arxa fon dəyişimi
    const sliderImages = [
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
        'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f'
    ];

    let currentSlide = 0;
    const slider = document.querySelector('.slider');

    if (slider) {
        function changeSliderBackground() {
            slider.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${sliderImages[currentSlide]}')`;
            currentSlide = (currentSlide + 1) % sliderImages.length;
        }

        setInterval(changeSliderBackground, 5000);
    }

    // Səbət sayını yenilə
    updateCartCount();
    
    // Səbət səhifəsindəyiksə, səbət məzmununu göstər
    if (window.location.href.includes('cart.html')) {
        updateCartDisplay();
    }

    // Sifarişi tamamla düyməsinə click hadisəsi
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.onclick = function() {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            if (!user.isLoggedIn) {
                alert('Sifarişi tamamlamaq üçün daxil olmalısınız!');
                window.location.href = 'login.html';
                return;
            }

            if (cart.length === 0) {
                alert('Səbətiniz boşdur!');
                return;
            }

            alert('Sifarişiniz qəbul edildi!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        };
    }

    // Hamburger Menü İşlevselliği
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navLinks = document.querySelector('.nav-links');
    
    // Overlay elementi yarat
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Hamburger menyuya klik
    hamburgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Menyu açıq/bağlı ikonunu dəyiş
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Overlay-ə klik
    overlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        hamburgerMenu.querySelector('i').className = 'fas fa-bars';
    });

    // Səhifə scroll olduqda menyunu bağla
    window.addEventListener('scroll', function() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerMenu.querySelector('i').className = 'fas fa-bars';
        }
    });

    // Menyu linklərinə klik
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerMenu.querySelector('i').className = 'fas fa-bars';
        });
    });

    // ESC düyməsinə basıldıqda menyunu bağla
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerMenu.querySelector('i').className = 'fas fa-bars';
        }
    });

    // Scroll zamanı axtarış çubuğunu gizlətmək üçün
    let lastScrollTop = 0;
    const searchBox = document.querySelector('.search-box-header');

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) { // Yalnız mobil cihazlarda
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Aşağı scroll
                searchBox.classList.add('hidden');
            } else {
                // Yuxarı scroll
                searchBox.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        }
    });

    // Axtarış düyməsi funksionallığı
    const searchToggleBtn = document.getElementById('searchToggle');
    const searchBoxHeader = document.querySelector('.search-box-header');
    const searchClose = document.getElementById('searchClose');

    if (searchToggleBtn && searchBoxHeader && searchClose) {
        searchToggleBtn.addEventListener('click', function() {
            searchBoxHeader.classList.toggle('active');
            if (searchBoxHeader.classList.contains('active')) {
                document.getElementById('headerSearchInput').focus();
            }
        });

        searchClose.addEventListener('click', function() {
            searchBoxHeader.classList.remove('active');
        });

        // ESC düyməsinə basıldıqda axtarış çubuğunu bağla
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchBoxHeader.classList.contains('active')) {
                searchBoxHeader.classList.remove('active');
            }
        });

        // Axtarış çubuğu xaricində bir yerə klik edildikdə bağla
        document.addEventListener('click', function(e) {
            if (!searchBoxHeader.contains(e.target) && !searchToggleBtn.contains(e.target)) {
                searchBoxHeader.classList.remove('active');
            }
        });
    }

    // Ana səhifədəki kitabları yüklə
    loadBestsellers();
    loadRecommended();
    updateCartCount();

    // Bütün sevimli düymələrini yenilə
    updateAllFavoriteButtons();

    // Sevimlilər səhifəsini yenilə
    updateFavoritesUI();

    // Kateqoriya səhifəsindəyiksə, kitabları yüklə
    if (window.location.href.includes('category.html')) {
        loadCategoryBooks();
    }
});

// Səbət sayını yeniləmə
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (!cartCountElement) return; // Element yoxdursa funksiyadan çıx
    
    const user = firebase.auth().currentUser;
    if (!user) {
        cartCountElement.textContent = '0';
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem(`cart_${user.uid}`) || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = count.toString();
}

// Səbət məzmununu göstərmə
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Səbətiniz boşdur</p>';
        updateTotals(0);
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>${item.author}</p>
                    <p class="price">${item.price.toFixed(2)} AZN</p>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <p>${itemTotal.toFixed(2)} AZN</p>
                    <button onclick="removeFromCart(${item.id})" class="remove-item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = html;
    updateTotals(subtotal);
}

// Məbləğləri yeniləmə
function updateTotals(subtotal) {
    const shipping = subtotal > 0 ? 5 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' AZN';
    document.getElementById('shipping').textContent = shipping.toFixed(2) + ' AZN';
    document.getElementById('total').textContent = total.toFixed(2) + ' AZN';
}

// Bildiriş göstərmə
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Məhsul səbətə əlavə edildi!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Kateqoriya filtri
function filterBooks(category) {
    console.log(`${category} kateqoriyası seçildi`);
    alert(`${category} kateqoriyasındakı kitablar göstərilir...`);
}

// Bütün səhifələrdəki sevimli düymələrini yenilə
function updateAllFavoriteButtons() {
    // Bütün sevimli düymələrini tap
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    // Hər bir düymə üçün
    favoriteButtons.forEach(button => {
        const bookId = button.getAttribute('data-id');
        const icon = button.querySelector('i');
        
        if (icon) {
            // Kitabın sevimlilərdə olub-olmadığını yoxla
            const isFavorite = window.favorites.some(f => f.id === bookId);
            
            // İkonun siniflərini yenilə
            icon.classList.remove('far', 'fas');
            icon.classList.add(isFavorite ? 'fas' : 'far');
            
            // Düymənin aktiv sinifini yenilə
            if (isFavorite) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    });
}

// Sevimlilərə əlavə et/çıxar
function toggleFavorite(bookId) {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert('Sevimlilərə əlavə etmək üçün daxil olmalısınız!');
        window.location.href = 'login.html';
        return;
    }

    // Kitabı tap
    let book = window.books.find(b => b.id === bookId);
    if (!book) {
        console.error('Kitab tapılmadı:', bookId);
        return;
    }

    // Sevimlilərdə olub-olmadığını yoxla
    const index = window.favorites.findIndex(f => f.id === bookId);

    if (index === -1) {
        // Sevimlilərə əlavə et
        window.favorites.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: book.image,
            rating: book.rating,
            reviewCount: book.reviewCount,
            category: book.category
        });
        showNotification('Kitab sevimlilərə əlavə edildi');
    } else {
        // Sevimlilərdən çıxar
        window.favorites.splice(index, 1);
        showNotification('Kitab sevimlilərdən çıxarıldı');
    }

    // Sevimliləri localStorage-a yaz
    try {
        localStorage.setItem('favorites', JSON.stringify(window.favorites));
        console.log('Sevimlilər yadda saxlanıldı:', window.favorites);
    } catch (error) {
        console.error('Sevimlilər yadda saxlanılarkən xəta baş verdi:', error);
    }
    
    // Bütün səhifələrdəki sevimli düymələrini yenilə
    updateAllFavoriteButtons();
    
    // Sevimlilər səhifəsini yenilə
    updateFavoritesUI();
}

// Sevimlilər UI-ı yenilə
function updateFavoritesUI() {
    const favoritesContainer = document.getElementById('favorites');
    if (!favoritesContainer) return;

    if (!window.favorites || window.favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="no-data">
                <i class="fas fa-heart fa-3x"></i>
                <p>Hələ heç bir kitabı sevimlilərə əlavə etməmisiniz.</p>
            </div>
        `;
        return;
    }

    let favoritesHTML = '<div class="favorites-grid">';
    window.favorites.forEach(book => {
        if (book && book.id && book.title) {
            favoritesHTML += `
                <div class="book-card">
                    <div class="book-header">
                        <button class="favorite-btn ${window.favorites.some(f => f.id === book.id) ? 'active' : ''}" data-id="${book.id}" onclick="toggleFavorite('${book.id}')">
                            <i class="${window.favorites.some(f => f.id === book.id) ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p class="author">${book.author}</p>
                    <p class="price">${book.price.toFixed(2)} AZN</p>
                    <div class="rating-info">
                        <div class="rating">
                            ${generateStars(book.rating)}
                            <span class="rating-text">${book.rating}</span>
                        </div>
                        <span class="review-count">(${book.reviewCount} şərh)</span>
                    </div>
                    <button class="add-to-cart" data-id="${book.id}" onclick="addToCart('${book.id}')">Səbətə Əlavə Et</button>
                </div>
            `;
        }
    });
    favoritesHTML += '</div>';
    favoritesContainer.innerHTML = favoritesHTML;
}

// İstifadəçinin sevimlilərini yükləmə və UI-ı yeniləmə
function loadAndUpdateFavorites(user) {
    if (!user) {
        updateFavoritesUI([]);
        return;
    }

    const favorites = JSON.parse(localStorage.getItem(`favorites_${user.uid}`) || '[]');
    
    // Bütün səhifələrdəki sevimlilər ikonlarını yenilə
    favorites.forEach(favorite => {
        const buttons = document.querySelectorAll(`.favorite-btn[data-id="${favorite.id}"]`);
        buttons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        });
    });

    updateFavoritesUI(favorites);
}

// Səbətə məhsul əlavə etmə
function addToCart(bookId) {
    // İstifadəçinin giriş edib-etmədiyini yoxla
    const user = firebase.auth().currentUser;
    
    if (!user) {
        alert('Məhsul əlavə etmək üçün daxil olmalısınız!');
        window.location.href = 'login.html';
        return;
    }

    // Kitabı tap
    let book = null;
    if (typeof books !== 'undefined' && Array.isArray(books)) {
        book = books.find(b => b.id == bookId);
    }
    if (!book && typeof categoryData !== 'undefined' && Array.isArray(categoryData)) {
        book = categoryData.find(b => b.id == bookId);
    }
    if (!book && typeof sampleBooks !== 'undefined' && Array.isArray(sampleBooks)) {
        book = sampleBooks.find(b => b.id == bookId);
    }

    if (!book) {
        console.error('Kitab tapılmadı');
        return;
    }

    // Səbəti yüklə
    let cart = JSON.parse(localStorage.getItem(`cart_${user.uid}`) || '[]');
    
    // Kitabın səbətdə olub-olmadığını yoxla
    const existingItem = cart.find(item => item.id == bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }
    
    // Səbəti yadda saxla
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
    
    // Bildiriş göstər
    showNotification('Məhsul səbətə əlavə edildi!');
    
    // Səbət sayını yenilə
    updateCartCount();
}

// Səbətdən məhsul silmə
function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Məhsul sayını artırma
function increaseQuantity(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

// Məhsul sayını azaltma
function decreaseQuantity(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === bookId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

// Çox satılan kitabları yüklə
function loadBestsellers() {
    const bestsellersGrid = document.getElementById('bestsellersGrid');
    if (!bestsellersGrid) return;

    // Çox satılan kitabları filter et (məsələn, satış sayına görə ilk 3)
    const bestsellers = window.books
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 3);

    bestsellersGrid.innerHTML = bestsellers.map(book => createBookCard(book)).join('');
    
    // Sevimli düymələrini yenilə
    updateAllFavoriteButtons();
}

// Tövsiyə edilən kitabları yüklə
function loadRecommended() {
    const recommendedGrid = document.getElementById('recommendedGrid');
    if (!recommendedGrid) return;

    // Tövsiyə edilən kitabları filter et (məsələn, reytinqə görə ilk 3)
    const recommended = window.books
        .filter(book => {
            // Bestsellers-də olan kitabları çıxar
            const bestsellers = window.books
                .sort((a, b) => b.reviewCount - a.reviewCount)
                .slice(0, 3);
            return !bestsellers.find(b => b.id === book.id);
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    recommendedGrid.innerHTML = recommended.map(book => createBookCard(book)).join('');
    
    // Sevimli düymələrini yenilə
    updateAllFavoriteButtons();
}

// Kitab kartı yaratmaq üçün funksiya
function createBookCard(book) {
    const isFavorite = favorites.some(f => f.id === book.id);
    return `
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
            </div>
            <div class="rating-info">
                <div class="rating">
                    ${generateStars(book.rating)}
                    <span class="rating-text">${book.rating}</span>
                </div>
                <span class="review-count">(${book.reviewCount} şərh)</span>
            </div>
            <button class="add-to-cart" data-id="${book.id}">
                <i class="fas fa-shopping-cart"></i> Səbətə Əlavə Et
            </button>
        </div>
    `;
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

// Bildiriş göstərmə
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Header axtarış funksionallığı
function setupHeaderSearch() {
    const headerSearchInput = document.getElementById('headerSearchInput');
    const headerSearchButton = document.getElementById('headerSearchButton');

    if (headerSearchInput && headerSearchButton) {
        function performSearch() {
            const searchQuery = headerSearchInput.value.trim();
            if (searchQuery) {
                window.location.href = `search.html?q=${encodeURIComponent(searchQuery)}`;
            }
        }

        headerSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        headerSearchButton.addEventListener('click', performSearch);
    }
}

// Firebase auth state dəyişikliyi
function setupAuthStateListener() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // İstifadəçi daxil olubsa
            const navLinks = document.getElementById('navLinks');
            if (navLinks) {
                const profileLink = navLinks.querySelector('a[href="profile.html"]');
                if (profileLink) {
                    const displayName = user.displayName || user.email.split('@')[0];
                    profileLink.innerHTML = `<i class="fas fa-user"></i> ${displayName}`;
                }
            }

            // İstifadəçinin sevimlilərini yüklə və UI-ı yenilə
            loadAndUpdateFavorites(user);
        } else {
            // İstifadəçi daxil olmayıbsa
            const favoriteButtons = document.querySelectorAll('.favorite-btn');
            favoriteButtons.forEach(button => {
                const icon = button.querySelector('i');
                if (icon) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            });

            // Sevimlilər siyahısını təmizlə
            updateFavoritesUI([]);
        }

        // Səbət sayını yenilə
        updateCartCount();
    });
}

// Kateqoriya səhifəsindəki kitabları yüklə
function loadCategoryBooks() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;

    // URL-dən kateqoriyanı al
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (!category) {
        console.error('Kateqoriya tapılmadı');
        return;
    }

    // Kateqoriyaya uyğun kitabları tap
    const categoryBooks = window.books.filter(book => book.category === category);

    // Kitabları göstər
    categoryGrid.innerHTML = categoryBooks.map(book => createBookCard(book)).join('');
    
    // Sevimli düymələrini yenilə
    updateAllFavoriteButtons();
} 
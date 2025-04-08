// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// İstifadəçi interfeysi yeniləmə funksiyası
function updateUI(user) {
    const authLinks = document.querySelector('.nav-links');
    if (authLinks) {
        if (user) {
            // Səbətdəki məhsul sayını hesabla
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            
            // İstifadəçi daxil olubsa
            authLinks.innerHTML = `
                <li><a href="index.html">Ana Səhifə</a></li>
                <li><a href="cart.html"><i class="fas fa-shopping-cart"></i> Səbətim (${cartCount})</a></li>
                <li><a href="profile.html"><i class="fas fa-user"></i> ${user.displayName || 'Profil'}</a></li>
                <li><a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Çıxış</a></li>
            `;

            // Səbətə əlavə et düyməsini aktiv et
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.onclick = function() {
                    const productId = this.getAttribute('data-id');
                    addToCart(productId);
                    return false; // Event'i dayandır
                };
            });
        } else {
            // İstifadəçi daxil olmayıbsa
            authLinks.innerHTML = `
                <li><a href="index.html">Ana Səhifə</a></li>
                <li><a href="login.html" onclick="redirectToLogin('cart')"><i class="fas fa-shopping-cart"></i> Səbətim (0)</a></li>
                <li><a href="login.html"><i class="fas fa-sign-in-alt"></i> Giriş</a></li>
            `;

            // Səbətə əlavə et düyməsini deaktiv et
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.onclick = function() {
                    redirectToLogin('cart');
                    return false;
                };
            });
        }
    }
}

// Səbət funksiyaları
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
    const cartContainer = document.querySelector('.cart-container');
    if (!cartContainer) return;

    const cartItems = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary');

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart fa-3x"></i>
                <h3>Səbətiniz boşdur</h3>
                <a href="index.html" class="continue-shopping">
                    <i class="fas fa-arrow-left"></i> Alış-verişə davam et
                </a>
            </div>
        `;
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.author}</p>
                    <p class="price">${item.price} AZN</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <p>${(item.price * item.quantity).toFixed(2)} AZN</p>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = cartHTML;
    cartSummary.innerHTML = `
        <h3>Səbət Xülasəsi</h3>
        <div class="total-details">
            <div>
                <span>Ümumi məbləğ:</span>
                <span>${total.toFixed(2)} AZN</span>
            </div>
            <div>
                <span>Çatdırılma:</span>
                <span>Pulsuz</span>
            </div>
            <div class="total">
                <span>Yekun məbləğ:</span>
                <span>${total.toFixed(2)} AZN</span>
            </div>
        </div>
        <button class="checkout-button">
            <i class="fas fa-lock"></i> Sifarişi rəsmiləşdir
        </button>
        <a href="index.html" class="continue-shopping">
            <i class="fas fa-arrow-left"></i> Alış-verişə davam et
        </a>
    `;
}

function addToCart(productId) {
    const user = auth.currentUser;
    if (!user) {
        alert('Məhsul əlavə etmək üçün daxil olmalısınız!');
        redirectToLogin('cart');
        return;
    }

    try {
        // Məhsul məlumatlarını əldə et
        const productCard = document.querySelector(`button[data-id="${productId}"]`).closest('.product-card, .book-card');
        if (!productCard) {
            throw new Error('Məhsul tapılmadı');
        }

        // Qiymət mətnini təmizlə və ədədə çevir
        const priceText = productCard.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

        // Müəllif mətnini əldə et
        let author = '';
        const authorElement = productCard.querySelector('.author') || productCard.querySelector('p:not(.price)');
        if (authorElement) {
            author = authorElement.textContent;
        }

        const product = {
            id: productId,
            name: productCard.querySelector('h3').textContent,
            author: author,
            price: price,
            image: productCard.querySelector('img').src,
            quantity: 1
        };

        console.log('Əlavə edilən məhsul:', product); // Debug üçün

        // Səbətdə eyni məhsul varsa sayını artır
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        // Səbəti yadda saxla
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Bildiriş göstər
        showNotification('Məhsul səbətə əlavə edildi!');
        
        // UI-ı yenilə
        updateUI(user);
        updateCartUI();

        return false; // Event'i dayandır
    } catch (error) {
        console.error('Səbətə əlavə etmə xətası:', error);
        console.log('Xətalı məhsul ID:', productId); // Debug üçün
        alert('Məhsul səbətə əlavə edilərkən xəta baş verdi.');
    }
}

function updateQuantity(productId, change) {
    try {
        // String ID-ni rəqəmə çevirmə cəhdi
        const numericId = productId.toString();
        const product = cart.find(item => item.id.toString() === numericId);
        
        if (product) {
            product.quantity += change;
            
            if (product.quantity < 1) {
                removeFromCart(numericId);
            } else {
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Həm səbət, həm də nav panelini yenilə
                updateCartUI();
                updateUI(auth.currentUser);
                
                // Bildiriş göstər
                showNotification('Məhsul sayı yeniləndi');
            }
        }
    } catch (error) {
        console.error('Məhsul sayını yeniləmə xətası:', error);
        alert('Məhsul sayını yeniləmə zamanı xəta baş verdi');
    }
}

function removeFromCart(productId) {
    try {
        // String ID-ni rəqəmə çevirmə cəhdi
        const numericId = productId.toString();
        
        // Məhsulu səbətdən sil
        cart = cart.filter(item => item.id.toString() !== numericId);
        
        // Səbəti yadda saxla
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Həm səbət, həm də nav panelini yenilə
        updateCartUI();
        updateUI(auth.currentUser);
        
        // Bildiriş göstər
        showNotification('Məhsul səbətdən silindi');
    } catch (error) {
        console.error('Məhsulu silmə xətası:', error);
        alert('Məhsulu səbətdən silmə zamanı xəta baş verdi');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Səbət səhifəsinə giriş yoxlaması
function redirectToLogin(page) {
    localStorage.setItem('redirectAfterLogin', page);
    window.location.href = 'login.html';
    return false;
}

// Giriş formu əməliyyatları
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            console.log('Giriş cəhdi:', email);
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log('Giriş uğurlu:', userCredential.user);
            localStorage.setItem('user', JSON.stringify(userCredential.user));
            updateUI(userCredential.user);
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Giriş xətası:', error);
            let errorMessage = 'Giriş uğursuz oldu: ';
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage += 'Yanlış e-poçt formatı.';
                    break;
                case 'auth/user-not-found':
                    errorMessage += 'Bu e-poçt ünvanı ilə hesab tapılmadı.';
                    break;
                case 'auth/wrong-password':
                    errorMessage += 'Yanlış şifrə.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage += 'E-poçt və ya şifrə yanlışdır.';
                    break;
                default:
                    errorMessage += error.message;
            }
            alert(errorMessage);
        }
    });
}

// Qeydiyyat formu əməliyyatları
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.toLowerCase();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Şifrələr uyğun gəlmir!');
            return;
        }

        try {
            // İstifadəçi adı validasiyası
            if (!/^[a-z][a-z0-9]*$/.test(username)) {
                throw new Error('İstifadəçi adı yalnız kiçik hərflər və rəqəmlərdən ibarət ola bilər və hərflə başlamalıdır.');
            }

            console.log('Qeydiyyat cəhdi:', email);
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            console.log('Qeydiyyat uğurlu:', userCredential.user);
            
            // İstifadəçi profilini yenilə
            await userCredential.user.updateProfile({
                displayName: username
            });

            // E-poçt təsdiqi göndər
            await userCredential.user.sendEmailVerification();
            alert('Qeydiyyat uğurla tamamlandı! Zəhmət olmasa e-poçt ünvanınızı təsdiqləyin.');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Qeydiyyat xətası:', error);
            alert(error.message);
        }
    });
}

// Şifrə sıfırlama əməliyyatları
const forgotPasswordLink = document.getElementById('forgotPassword');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = prompt('Zəhmət olmasa hesabınızın e-poçt ünvanını daxil edin:');
        
        if (email) {
            try {
                await auth.sendPasswordResetEmail(email);
                alert('Şifrə sıfırlama linki e-poçt ünvanınıza göndərildi.');
            } catch (error) {
                alert('Şifrə sıfırlama uğursuz oldu: ' + error.message);
            }
        }
    });
}

// Sessiya vəziyyətinin yoxlanması
auth.onAuthStateChanged((user) => {
    if (user) {
        // İstifadəçi daxil olub
        localStorage.setItem('user', JSON.stringify(user));
        updateUI(user);
        updateCartUI();

        // Səbət səhifəsində olub-olmadığını yoxla
        if (window.location.pathname.includes('cart.html')) {
            document.querySelector('.cart-container').style.display = 'block';
        }
    } else {
        // İstifadəçi daxil olmayıb
        localStorage.removeItem('user');
        updateUI(null);

        // Səbət səhifəsində olub-olmadığını yoxla
        if (window.location.pathname.includes('cart.html')) {
            redirectToLogin('cart');
        }
    }
});

// Çıxış əməliyyatı
function logout() {
    auth.signOut().then(() => {
        updateUI(null);
        window.location.href = 'login.html';
    }).catch((error) => {
        alert('Çıxış zamanı xəta baş verdi: ' + error.message);
    });
}

// Səhifə yükləndikdə UI-ı yenilə
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        updateUI(user);
        updateCartUI();
    }
});

// Qiymətləndirmə sistemi
let reviews = JSON.parse(localStorage.getItem('reviews')) || {};

function initializeRating() {
    const stars = document.querySelectorAll('.star-rating i');
    let currentRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            updateStars(index + 1);
        });

        star.addEventListener('mouseout', () => {
            updateStars(currentRating);
        });

        star.addEventListener('click', () => {
            currentRating = index + 1;
            document.querySelector('#ratingValue').value = currentRating;
        });
    });
}

function updateStars(count) {
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        star.className = index < count ? 'fas fa-star active' : 'far fa-star';
    });
}

function submitReview(productId) {
    const user = auth.currentUser;
    if (!user) {
        alert('Şərh yazmaq üçün daxil olmalısınız!');
        redirectToLogin('reviews');
        return;
    }

    const rating = parseFloat(document.querySelector('#ratingValue').value);
    const comment = document.querySelector('#reviewText').value.trim();

    if (!rating || !comment) {
        alert('Zəhmət olmasa həm qiymətləndirmə, həm də şərh yazın.');
        return;
    }

    if (!reviews[productId]) {
        reviews[productId] = [];
    }

    const review = {
        userId: user.uid,
        userName: user.displayName || 'İstifadəçi',
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
    };

    reviews[productId].push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    updateProductRating(productId);
    showNotification('Şərhiniz əlavə edildi!');
    
    // Formu sıfırla
    document.querySelector('#reviewText').value = '';
    document.querySelector('#ratingValue').value = '0';
    updateStars(0);
}

function updateProductRating(productId) {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return;

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / productReviews.length).toFixed(1);

    const ratingInfo = document.querySelector(`[data-id="${productId}"]`).closest('.product-card, .book-card').querySelector('.rating-info');
    if (ratingInfo) {
        const stars = ratingInfo.querySelectorAll('.rating i');
        const fullStars = Math.floor(averageRating);
        const hasHalfStar = averageRating % 1 >= 0.5;

        stars.forEach((star, index) => {
            if (index < fullStars) {
                star.className = 'fas fa-star';
            } else if (index === fullStars && hasHalfStar) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
        });

        ratingInfo.querySelector('.rating-text').textContent = averageRating;
        ratingInfo.querySelector('.review-count').textContent = `(${productReviews.length} şərh)`;
    }
}

// Səhifə yükləndikdə qiymətləndirmələri yenilə
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card, .book-card');
    productCards.forEach(card => {
        const productId = card.querySelector('.add-to-cart').getAttribute('data-id');
        updateProductRating(productId);
    });

    // Şərh formu varsa, qiymətləndirmə sistemini aktivləşdir
    if (document.querySelector('.star-rating')) {
        initializeRating();
    }
});

// Sevimlilər funksiyaları
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(productId) {
    const user = auth.currentUser;
    if (!user) {
        alert('Sevimlilərə əlavə etmək üçün daxil olmalısınız!');
        redirectToLogin('favorites');
        return;
    }

    try {
        const favoriteBtn = document.querySelector(`button.favorite-btn[data-id="${productId}"]`);
        const heartIcon = favoriteBtn.querySelector('i');
        const productCard = favoriteBtn.closest('.product-card, .book-card');

        // Məhsul məlumatlarını əldə et
        const product = {
            id: productId,
            name: productCard.querySelector('h3').textContent,
            author: productCard.querySelector('.author').textContent,
            price: parseFloat(productCard.querySelector('.price').textContent.replace(/[^0-9.]/g, '')),
            image: productCard.querySelector('img').src
        };

        const index = favorites.findIndex(item => item.id === productId);

        if (index === -1) {
            // Sevimlilərə əlavə et
            favorites.push(product);
            heartIcon.className = 'fas fa-heart';
            showNotification('Məhsul sevimlilərə əlavə edildi!');
        } else {
            // Sevimlilərdən çıxar
            favorites.splice(index, 1);
            heartIcon.className = 'far fa-heart';
            showNotification('Məhsul sevimlilərdən çıxarıldı!');
        }

        // Sevimliləri yadda saxla
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Profil səhifəsində sevimlilər bölməsini yenilə
        updateFavoritesUI();

        // Animasiya əlavə et
        favoriteBtn.classList.add('active');
        setTimeout(() => favoriteBtn.classList.remove('active'), 300);

    } catch (error) {
        console.error('Sevimlilərə əlavə etmə xətası:', error);
        alert('Sevimlilərə əlavə edilərkən xəta baş verdi.');
    }
}

function updateFavoritesUI() {
    const favoritesContainer = document.querySelector('#favorites');
    if (!favoritesContainer) return;

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="no-data">
                <i class="fas fa-heart fa-3x"></i>
                <p>Hələ heç bir kitabı sevimlilərə əlavə etməmisiniz.</p>
            </div>
        `;
        return;
    }

    let favoritesHTML = '<div class="favorites-grid">';
    favorites.forEach(item => {
        favoritesHTML += `
            <div class="book-card">
                <div class="book-header">
                    <button class="favorite-btn active" data-id="${item.id}" onclick="toggleFavorite('${item.id}')">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="author">${item.author}</p>
                <p class="price">${item.price} AZN</p>
                <button class="add-to-cart" data-id="${item.id}">Səbətə Əlavə Et</button>
            </div>
        `;
    });
    favoritesHTML += '</div>';
    favoritesContainer.innerHTML = favoritesHTML;
}

// Səhifə yükləndikdə sevimlilər ikonlarını yenilə
document.addEventListener('DOMContentLoaded', () => {
    // Mövcud kodlar...

    // Sevimlilər düymələrini aktivləşdir
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        const productId = button.getAttribute('data-id');
        const heartIcon = button.querySelector('i');
        
        // Əgər məhsul sevimlilərdədirsə, ikonu dolu göstər
        if (favorites.some(item => item.id === productId)) {
            heartIcon.className = 'fas fa-heart';
        }

        button.onclick = () => toggleFavorite(productId);
    });

    // Sevimlilər bölməsini yenilə
    updateFavoritesUI();
}); 
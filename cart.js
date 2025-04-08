// Səbət funksionallığı
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Səbətə məhsul əlavə etmə
function addToCart(bookId, title, author, price, image) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user.isLoggedIn) {
        alert('Məhsul əlavə etmək üçün daxil olmalısınız!');
        window.location.href = 'login.html';
        return;
    }

    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: bookId,
            title: title,
            author: author,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartNotification();
}

// Səbətdən məhsul silmə
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Məhsul sayını artırma
function increaseQuantity(bookId) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Məhsul sayını azaltma
function decreaseQuantity(bookId) {
    const item = cart.find(item => item.id === bookId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Səbət sayını yeniləmə
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartLink = document.querySelector('.nav-links a[href="cart.html"]');
    if (cartLink) {
        cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Səbətim (${cartCount})`;
    }
}

// Səbət məzmununu göstərmə
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Səbətiniz boşdur</p>';
        updateTotals(0, 0);
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
    const shipping = subtotal > 0 ? 5 : 0; // 5 AZN çatdırılma haqqı
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

// Sifarişi tamamlama
document.getElementById('checkoutButton')?.addEventListener('click', function() {
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

    // Burada sifariş tamamlama məntiqi əlavə olunacaq
    alert('Sifarişiniz qəbul edildi!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
});

// Səhifə yüklənəndə səbəti yenilə
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    updateCartCount();
}); 
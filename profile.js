// Profil səhifəsi funksionallığı
document.addEventListener('DOMContentLoaded', function() {
    // İstifadəçi məlumatlarını yüklə
    loadUserData();
    
    // Tab keçidləri üçün
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktiv tab-ı dəyiş
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Müvafiq məzmunu göstər
            const tabName = button.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabName) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // Profil şəklini dəyişmək üçün
    const changeAvatarButton = document.querySelector('.change-avatar');
    changeAvatarButton?.addEventListener('click', () => {
        // Müvəqqəti olaraq random şəkil
        const randomId = Math.floor(Math.random() * 1000);
        document.getElementById('profileAvatar').src = 
            `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwIJd9oWDTGxUU4bsrCO0yufLNJilmt8uLA&s`;
    });

    // Tənzimləmələri yadda saxlamaq üçün
    const settingsForm = document.getElementById('settingsForm');
    settingsForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
    });

    // Sifarişləri və sevimli kitabları yüklə
    loadOrders();
    loadFavorites();

    // İstifadəçi adı və email sahələrini qoru
    protectFields();
    // Hər 1 saniyədə bir yoxla
    setInterval(protectFields, 1000);
});

// İstifadəçi məlumatlarını yükləmə
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user.isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // Profil məlumatlarını göstər
    document.getElementById('userName').textContent = user.fullname || 'İstifadəçi';
    document.getElementById('userEmail').textContent = user.email || '';
    document.getElementById('joinDate').textContent = 
        new Date(user.registerDate).toLocaleDateString('az-AZ');

    // Tənzimləmə formasını doldur
    document.getElementById('fullName').value = user.fullname || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('address').value = user.address || '';
}

// Sifarişləri yükləmə
function loadOrders() {
    const ordersList = document.querySelector('.orders-list');
    if (!ordersList) return;

    let html = '';
    orders.forEach(order => {
        html += `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <h4>Sifariş #${order.id}</h4>
                        <p>${new Date(order.date).toLocaleDateString('az-AZ')}</p>
                    </div>
                    <span class="order-status ${order.status.toLowerCase()}">
                        ${order.status}
                    </span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.title} x ${item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)} AZN</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <span>Ümumi məbləğ:</span>
                    <span>${order.total.toFixed(2)} AZN</span>
                </div>
            </div>
        `;
    });

    ordersList.innerHTML = html || '<p class="no-data">Sifariş tapılmadı</p>';
}

// Sevimli kitabları yükləmə
function loadFavorites() {
    const favoritesGrid = document.querySelector('.favorites-grid');
    if (!favoritesGrid) return;

   
    let html = '';
    favorites.forEach(book => {
        html += `
            <div class="book-card">
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p class="price">${book.price.toFixed(2)} AZN</p>
                <button class="remove-favorite" onclick="removeFavorite(${book.id})">
                    <i class="fas fa-heart-broken"></i> Sil
                </button>
            </div>
        `;
    });

    favoritesGrid.innerHTML = html || '<p class="no-data">Sevimli kitab tapılmadı</p>';
}

// Tənzimləmələri yadda saxlama
function saveSettings() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Yeni məlumatları əldə et
    const newData = {
        ...user,
        fullname: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    // Şifrə dəyişikliyi
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    
    if (currentPassword && newPassword) {
        // Burada real layihədə şifrə yoxlanışı və dəyişdirilməsi əlavə olunmalıdır
        console.log('Şifrə dəyişdirildi');
    }

    // Məlumatları yadda saxla
    localStorage.setItem('user', JSON.stringify(newData));
    
    // İstifadəçiyə bildiriş göstər
    alert('Məlumatlarınız yadda saxlanıldı!');
    
    // Səhifəni yenilə
    loadUserData();
}

// Sevimlilər siyahısından silmə
function removeFavorite(bookId) {
    // Burada real layihədə sevimlilər siyahısından silmə əməliyyatı olacaq
    alert('Kitab sevimlilərdən silindi!');
    loadFavorites();
}

// İstifadəçi adı və email sahələrini qoru
function protectFields() {
    const settingsName = document.getElementById('settingsName');
    const settingsEmail = document.getElementById('settingsEmail');
    
    if (settingsName) {
        settingsName.readOnly = true;
        settingsName.disabled = true;
        settingsName.style.backgroundColor = '#f5f5f5';
        settingsName.style.cursor = 'not-allowed';
        
        settingsName.addEventListener('input', () => {
            settingsName.value = settingsName.getAttribute('data-original');
        });
        
        settingsName.addEventListener('paste', (e) => {
            e.preventDefault();
        });
    }
    
    if (settingsEmail) {
        settingsEmail.readOnly = true;
        settingsEmail.disabled = true;
        settingsEmail.style.backgroundColor = '#f5f5f5';
        settingsEmail.style.cursor = 'not-allowed';
        
        settingsEmail.addEventListener('input', () => {
            settingsEmail.value = settingsEmail.getAttribute('data-original');
        });
        
        settingsEmail.addEventListener('paste', (e) => {
            e.preventDefault();
        });
    }
} 
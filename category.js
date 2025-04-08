// Kateqoriya məlumatları
const categoryData = {
    roman: {
        title: 'Roman',
        icon: 'fa-book',
        books: [
            {
                id: '1984',
                name: '1984',
                author: 'George Orwell',
                price: 15.90,
                image: 'https://m.media-amazon.com/images/I/418Ug-5U2ML._SY445_SX342_.jpg',
                rating: 4.0,
                reviewCount: 125
            },
            {
                id: 'cinayetceza',
                name: 'Cinayət və Cəza',
                author: 'Fyodor Dostoyevski',
                price: 22.90,
                image: 'https://m.media-amazon.com/images/I/91y4Xf0a7pL._SY522_.jpg',
                rating: 4.5,
                reviewCount: 98
            },
            {
                id: 'heyvanistan',
                name: 'Heyvanıstan',
                author: 'George Orwell',
                price: 14.90,
                image: 'https://m.media-amazon.com/images/I/71je3-DsQEL._SY522_.jpg',
                rating: 4.6,
                reviewCount: 142
            },
            {
                id: 'sefiller',
                name: 'Səfillər',
                author: 'Victor Hugo',
                price: 24.90,
                image: 'https://m.media-amazon.com/images/I/411JYpEGhiL._SY445_SX342_.jpg',
                rating: 4.7,
                reviewCount: 156
            },
            {
                id: 'donkixot',
                name: 'Don Kixot',
                author: 'Miguel de Cervantes',
                price: 21.90,
                image: 'https://m.media-amazon.com/images/I/31xB3tokZrL._SY445_SX342_.jpg',
                rating: 4.4,
                reviewCount: 112
            }
        ]
    },
    elm: {
        title: 'Elm',
        icon: 'fa-flask',
        books: [
            {
                id: 'kosmos',
                name: 'Kosmos',
                author: 'Carl Sagan',
                price: 25.90,
                image: 'https://m.media-amazon.com/images/I/41BwlYT0sNL._SY445_SX342_.jpg',
                rating: 4.8,
                reviewCount: 75
            },
            {
                id: 'qisatarix',
                name: 'Zamanın Qısa Tarixi',
                author: 'Stephen Hawking',
                price: 18.90,
                image: 'https://m.media-amazon.com/images/I/51X2RycvYSL._SY445_SX342_.jpg',
                rating: 4.7,
                reviewCount: 89
            },
            {
                id: 'genler',
                name: 'Genlərin Dili',
                author: 'Dean Hamer',
                price: 19.90,
                image: 'https://m.media-amazon.com/images/I/31w806HXl7L._SY445_SX342_.jpg',
                rating: 4.5,
                reviewCount: 67
            },
            {
                id: 'fizika',
                name: 'Fizikanın Fəlsəfəsi',
                author: 'Werner Heisenberg',
                price: 23.90,
                image: 'https://m.media-amazon.com/images/I/51WQcu+tqcL._SY445_SX342_.jpg',
                rating: 4.6,
                reviewCount: 45
            }
        ]
    },
    tarix: {
        title: 'Tarix',
        icon: 'fa-landmark',
        books: [
            {
                id: 'sapiens',
                name: 'Sapiens',
                author: 'Yuval Noah Harari',
                price: 29.90,
                image: 'https://m.media-amazon.com/images/I/81tPEe0egBL._SX385_.jpg',
                rating: 4.7,
                reviewCount: 156
            },
            {
                id: 'osmanli',
                name: 'Osmanlı İmperiyası',
                author: 'Halil İnalcık',
                price: 27.90,
                image: 'https://m.media-amazon.com/images/I/51TwgwYwuPL._SY445_SX342_.jpg',
                rating: 4.8,
                reviewCount: 134
            },
            {
                id: 'medeniyyet',
                name: 'Mədəniyyət Tarixi',
                author: 'Will Durant',
                price: 32.90,
                image: 'https://m.media-amazon.com/images/I/41-VSUBW0jL._SY445_SX342_.jpg',
                rating: 4.6,
                reviewCount: 98
            },
            {
                id: 'selcuklu',
                name: 'Böyük Səlcuklu İmperiyası',
                author: 'İbrahim Kafesoğlu',
                price: 26.90,
                image: 'https://cdn1.dokuzsoft.com/u/otuken/img/c/s/u/sultan-meliksah-devrinde-buyuk-selcuklu-imparatorlugu3117beb5b74c97d72e28166f07ee6fe1.jpg',
                rating: 4.5,
                reviewCount: 87
            }
        ]
    },
    usaq: {
        title: 'Uşaq',
        icon: 'fa-child',
        books: [
            {
                id: 'balacasahzade',
                name: 'Balaca Şahzadə',
                author: 'Antoine de Saint-Exupéry',
                price: 11.90,
                image: 'https://m.media-amazon.com/images/I/71OZY035QKL._SY385_.jpg',
                rating: 4.9,
                reviewCount: 203
            },
            {
                id: 'portaqal',
                name: 'Portağal Şirinliyi',
                author: 'Jose Mauro De Vasconcelos',
                price: 12.90,
                image: 'https://m.media-amazon.com/images/I/71uaI1psJpL._SY466_.jpg',
                rating: 4.3,
                reviewCount: 87
            },
            {
                id: 'pinokio',
                name: 'Pinokio',
                author: 'Carlo Collodi',
                price: 9.90,
                image: 'https://m.media-amazon.com/images/I/71BTKYd1RgL._SY385_.jpg',
                rating: 4.7,
                reviewCount: 156
            },
            {
                id: 'alisa',
                name: 'Möcüzələr Diyarında Alisa',
                author: 'Lewis Carroll',
                price: 13.90,
                image: 'https://m.media-amazon.com/images/I/51gDkZW2+9S._SY445_SX342_.jpg',
                rating: 4.8,
                reviewCount: 178
            }
        ]
    },
    felsefe: {
        title: 'Fəlsəfə',
        icon: 'fa-brain',
        books: [
            {
                id: 'elkimyaci',
                name: 'Əlkimyaçı',
                author: 'Paulo Coelho',
                price: 16.90,
                image: 'https://m.media-amazon.com/images/I/51bDuU2p5zL._SY445_SX342_.jpg',
                rating: 4.6,
                reviewCount: 167
            },
            {
                id: 'zerdust',
                name: 'Zərdüşt Belə Deyib',
                author: 'Friedrich Nietzsche',
                price: 18.90,
                image: 'https://m.media-amazon.com/images/I/41Qz9af9gKL._SY445_SX342_.jpg',
                rating: 4.5,
                reviewCount: 145
            },
            {
                id: 'respublika',
                name: 'Respublika',
                author: 'Platon',
                price: 20.90,
                image: 'https://m.media-amazon.com/images/I/51syxaBianL._SY445_SX342_.jpg',
                rating: 4.7,
                reviewCount: 123
            },
            {
                id: 'etika',
                name: 'Nikomax Etikası',
                author: 'Aristotel',
                price: 19.90,
                image: 'https://m.media-amazon.com/images/I/41S7bj7KB0L._SY445_SX342_.jpg',
                rating: 4.6,
                reviewCount: 98
            }
        ]
    },
    siir: {
        title: 'Şeir',
        icon: 'fa-feather',
        books: [
            {
                id: 'secilensiirler',
                name: 'Seçilən Şeirlər',
                author: 'Nazim Hikmət',
                price: 13.90,
                image: 'https://www.yapikrediyayinlari.com.tr/dosyalar/2020/07/henuz-vakit-varken-gulum.jpg',
                rating: 4.4,
                reviewCount: 89
            },
            {
                id: 'yapraklar',
                name: 'Çəmən Yarpaqları',
                author: 'Walt Whitman',
                price: 15.90,
                image: 'https://m.media-amazon.com/images/I/71fFB5cimdL._SY425_.jpg',
                rating: 4.6,
                reviewCount: 76
            },
            {
                id: 'qezeller',
                name: 'Seçilmiş Qəzəllər',
                author: 'Məhəmməd Füzuli',
                price: 14.90,
                image: 'https://kitaboxu.com/wp-content/uploads/2023/02/mehemmed-fizuli.png',
                rating: 4.8,
                reviewCount: 112
            },
            {
                id: 'rubailer',
                name: 'Rübailər',
                author: 'Ömər Xəyyam',
                price: 12.90,
                image: 'https://m.media-amazon.com/images/I/51oCFIuMVHL._SY445_SX342_.jpg',
                rating: 4.9,
                reviewCount: 145
            }
        ]
    }
};

// URL-dən kateqoriyanı al
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Səhifəni yüklə
document.addEventListener('DOMContentLoaded', () => {
    if (category && categoryData[category]) {
        loadCategory(category);
    } else {
        window.location.href = 'index.html';
    }
});

// Kateqoriya məlumatlarını yüklə
function loadCategory(categoryId) {
    const categoryInfo = categoryData[categoryId];
    
    // Başlığı yenilə
    document.getElementById('categoryTitle').textContent = categoryInfo.title;
    document.title = `${categoryInfo.title} - Magic Library`;

    // Kitabları göstər
    const booksContainer = document.getElementById('categoryBooks');
    booksContainer.innerHTML = categoryInfo.books.map(book => `
        <div class="book-card">
            <div class="book-header">
                <button class="favorite-btn" data-id="${book.id}">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <img src="${book.image}" alt="${book.name}">
            <h3>${book.name}</h3>
            <p class="author">${book.author}</p>
            <p class="price">${book.price} AZN</p>
            <div class="rating-info">
                <div class="rating">
                    ${generateStars(book.rating)}
                    <span class="rating-text">${book.rating}</span>
                </div>
                <span class="review-count">(${book.reviewCount} şərh)</span>
            </div>
            <button class="add-to-cart" data-id="${book.id}">Səbətə Əlavə Et</button>
        </div>
    `).join('');

    // Event listener-ləri əlavə et
    initializeButtons();
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

// Düymələri aktivləşdir
function initializeButtons() {
    // Sevimlilərə əlavə et düyməsi
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.onclick = () => toggleFavorite(button.getAttribute('data-id'));
    });

    // Səbətə əlavə et düyməsi
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.onclick = () => addToCart(button.getAttribute('data-id'));
    });
} 
// DOM elementləri
const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorDiv = document.getElementById('error');
const successDiv = document.getElementById('success');

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

const db = firebase.firestore();

// Xəta mesajını göstər
function showError(message) {
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        if (successDiv) successDiv.style.display = 'none';
    }
}

// Uğur mesajını göstər
function showSuccess(message) {
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        if (errorDiv) errorDiv.style.display = 'none';
    }
}

// İstifadəçi adının mövcudluğunu yoxla
async function checkUsernameExists(username) {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('username', '==', username).get();
        return !snapshot.empty;
    } catch (error) {
        console.error('İstifadəçi adı yoxlanışı zamanı xəta:', error);
        throw error;
    }
}

// Qeydiyyat formasına submit hadisəsi əlavə et
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Input dəyərlərini al
        const username = usernameInput ? usernameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

        // Boş sahələri yoxla
        if (!username || !email || !password || !confirmPassword) {
            showError('Bütün sahələri doldurun');
            return;
        }

        // İstifadəçi adı formatını yoxla
        if (!/^[a-z][a-z0-9]*$/.test(username)) {
            showError('İstifadəçi adı kiçik hərflə başlamalı və yalnız kiçik hərflər və rəqəmlərdən ibarət olmalıdır');
            return;
        }

        // Şifrəni yoxla
        if (password.length < 6) {
            showError('Şifrə ən az 6 simvol olmalıdır');
            return;
        }

        // Şifrələrin uyğunluğunu yoxla
        if (password !== confirmPassword) {
            showError('Şifrələr uyğun gəlmir');
            return;
        }

        try {
            // İstifadəçi adının mövcudluğunu yoxla
            const usernameExists = await checkUsernameExists(username);
            if (usernameExists) {
                showError('Bu istifadəçi adı artıq istifadə olunur');
                return;
            }

            // İstifadəçini yarat
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // İstifadəçi profilini yenilə
            await user.updateProfile({
                displayName: username
            });

            // İstifadəçi məlumatlarını Firestore-da saxla
            await db.collection('users').doc(user.uid).set({
                username: username,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Uğurlu qeydiyyat
            showSuccess('Qeydiyyat uğurla tamamlandı! Yönləndirilirsiniz...');
            
            // Local storage-də istifadəçi məlumatlarını saxla
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                username: username,
                email: email,
                isLoggedIn: true
            }));

            // 2 saniyə sonra ana səhifəyə yönləndir
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            console.error('Qeydiyyat xətası:', error);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    showError('Bu email ünvanı artıq istifadə olunur');
                    break;
                case 'auth/invalid-email':
                    showError('Düzgün email ünvanı daxil edin');
                    break;
                case 'auth/operation-not-allowed':
                    showError('Email/şifrə ilə qeydiyyat aktiv deyil');
                    break;
                case 'auth/weak-password':
                    showError('Daha güclü şifrə daxil edin');
                    break;
                default:
                    showError('Qeydiyyat zamanı xəta baş verdi: ' + error.message);
            }
        }
    });
}

// Input-lara dəyişiklik hadisəsi əlavə et
if (usernameInput) {
    usernameInput.addEventListener('input', function() {
        if (errorDiv && errorDiv.style.display === 'block') {
            errorDiv.style.display = 'none';
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('input', function() {
        if (errorDiv && errorDiv.style.display === 'block') {
            errorDiv.style.display = 'none';
        }
    });
}

if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        if (errorDiv && errorDiv.style.display === 'block') {
            errorDiv.style.display = 'none';
        }
    });
}

if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', function() {
        if (errorDiv && errorDiv.style.display === 'block') {
            errorDiv.style.display = 'none';
        }
    });
} 
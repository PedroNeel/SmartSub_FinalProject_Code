<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Background slideshow
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            let currentSlide = 0;
            
            function nextSlide() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
            
            // Change slide every 5 seconds
            setInterval(nextSlide, 5000);
            
            // Initialize first slide
            slides[0].classList.add('active');
            
            // Form toggles
            const showRegisterForm = document.getElementById('show-register');
            const showLoginForm = document.getElementById('show-login');
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            
            if (showRegisterForm && showLoginForm) {
                showRegisterForm.addEventListener('click', function(e) {
                    e.preventDefault();
                    loginForm.style.display = 'none';
                    registerForm.style.display = 'block';
                });
                
                showLoginForm.addEventListener('click', function(e) {
                    e.preventDefault();
                    registerForm.style.display = 'none';
                    loginForm.style.display = 'block';
                });
            }
            
            // Password validation
            const passwordInput = document.getElementById('reg-password');
            const confirmInput = document.getElementById('reg-confirm');
            const passwordStrengthBar = document.getElementById('password-strength-bar');
            const passwordHint = document.getElementById('password-hint');
            const confirmHint = document.getElementById('confirm-hint');
            const registerBtn = document.getElementById('register-btn');
            
            function validatePassword() {
                const password = passwordInput.value;
                const confirm = confirmInput.value;
                let isValid = true;
                
                // Check password length
                if (password.length < 8) {
                    passwordHint.textContent = 'Password must be at least 8 characters';
                    passwordHint.className = 'password-hint invalid';
                    passwordStrengthBar.style.width = '0%';
                    passwordStrengthBar.style.background = '#e74c3c';
                    isValid = false;
                } else {
                    // Calculate strength
                    let strength = 0;
                    if (password.length >= 8) strength += 20;
                    if (password.length >= 12) strength += 20;
                    if (/[A-Z]/.test(password)) strength += 20;
                    if (/[0-9]/.test(password)) strength += 20;
                    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
                    
                    passwordStrengthBar.style.width = strength + '%';
                    
                    if (strength < 60) {
                        passwordStrengthBar.style.background = '#e74c3c';
                        passwordHint.textContent = 'Weak password';
                        passwordHint.className = 'password-hint invalid';
                    } else if (strength < 80) {
                        passwordStrengthBar.style.background = '#f39c12';
                        passwordHint.textContent = 'Moderate password';
                        passwordHint.className = 'password-hint';
                    } else {
                        passwordStrengthBar.style.background = '#2ecc71';
                        passwordHint.textContent = 'Strong password';
                        passwordHint.className = 'password-hint valid';
                    }
                }
                
                // Check password match
                if (confirm && password !== confirm) {
                    confirmHint.textContent = 'Passwords do not match';
                    confirmHint.className = 'password-hint invalid';
                    isValid = false;
                } else if (confirm) {
                    confirmHint.textContent = 'Passwords match';
                    confirmHint.className = 'password-hint valid';
                } else {
                    confirmHint.textContent = '';
                }
                
                // Enable/disable register button
                registerBtn.disabled = !isValid || !password || !confirm;
                
                return isValid;
            }
            
            passwordInput.addEventListener('input', validatePassword);
            confirmInput.addEventListener('input', validatePassword);
            
            // Simple routing
            function showPage(pageId) {
                document.querySelectorAll('main > div').forEach(div => {
                    div.classList.add('hidden');
                });
                document.getElementById(pageId).classList.remove('hidden');
            }
            
            // Check URL hash on load
            function checkHash() {
                const hash = window.location.hash.substring(1);
                if (hash === 'dashboard' || hash === 'teachers' || hash === 'substitutes' || hash === 'reports') {
                    // Simulate logged in state
                    document.getElementById('login-page').classList.add('hidden');
                    showPage(hash + '-page');
                } else {
                    document.getElementById('login-page').classList.remove('hidden');
                }
            }
            
            window.addEventListener('hashchange', checkHash);
            checkHash();
            
            // Form submissions
            document.getElementById('loginForm')?.addEventListener('submit', function(e) {
                e.preventDefault();
                // In a real app, you would authenticate here
                window.location.hash = 'dashboard';
            });
            
            document.getElementById('registerForm')?.addEventListener('submit', function(e) {
                e.preventDefault();
                if (!validatePassword()) return;
                
                // In a real app, you would register the user here
                alert('Registration successful! Please login.');
                window.location.hash = 'login';
                document.getElementById('login-form').style.display = 'block';
                document.getElementById('register-form').style.display = 'none';
                
                // Clear form
                document.getElementById('reg-name').value = '';
                document.getElementById('reg-surname').value = '';
                document.getElementById('reg-email').value = '';
                document.getElementById('reg-password').value = '';
                document.getElementById('reg-confirm').value = '';
            });
            
            // Initialize chart
            const ctx = document.getElementById('absenceChart')?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Mathematics', 'Science', 'English', 'History'],
                        datasets: [{
                            label: 'Absences',
                            data: [12, 8, 5, 3],
                            backgroundColor: 'rgba(52, 152, 219, 0.7)'
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        });
    </script>
// login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = this.username.value.trim();
  const password = this.password.value.trim();

  // Simple validation
  if (!username || !password) {
    alert('Please enter both username and password.');
    return;
  }

  // TODO: Replace with real authentication check
  // e.g. fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) })

  // On success, redirect to homepage
  window.location.href = 'http://127.0.0.1:5500/index.html'; //redirect to start page with user info once we add the storage
});

const passwordInput   = document.getElementById('password');
const toggleBtn       = document.getElementById('togglePassword');

toggleBtn.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  toggleBtn.textContent = isHidden ? 'hide password' : 'show password';
  toggleBtn.setAttribute(
    'aria-label',
    isHidden ? 'Hide password' : 'Show password'
  );
});

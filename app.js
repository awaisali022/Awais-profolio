// ===========================
// AOS ANIMATION
// ===========================
if (window.AOS) AOS.init({ duration: 700, once: true });

// ===========================
// DARK / LIGHT MODE TOGGLE
// ===========================
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
  darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

// ===========================
// SHOW/HIDE PASSWORD (LOGIN)
// ===========================
const showPass = document.getElementById('showPassword');
const passwordField = document.getElementById('passwordLogin');
if (showPass && passwordField) {
  showPass.addEventListener('change', () => {
    passwordField.type = showPass.checked ? 'text' : 'password';
  });
}

// ===========================
// LOGIN FORM VALIDATION
// ===========================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function validatePassword(password) {
  if (!password || password.length < 6) return false;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
}

// Load saved login data
window.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailLogin');
  const passwordInput = document.getElementById('passwordLogin');
  const rememberMe = document.getElementById('rememberMe');

  const savedEmail = localStorage.getItem('savedEmail');
  const savedPassword = localStorage.getItem('savedPassword');

  if (emailInput && passwordInput && rememberMe && savedEmail && savedPassword) {
    emailInput.value = savedEmail;
    passwordInput.value = savedPassword;
    rememberMe.checked = true;
  }
});

// Login form submit
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('emailLogin');
    const passwordInput = document.getElementById('passwordLogin');
    const rememberMe = document.getElementById('rememberMe')?.checked;

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!validateEmail(email)) return alert('Invalid email format!');
    if (!validatePassword(password)) return alert('Password must be at least 6 characters and include letters and numbers.');

    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedPassword', password);
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
    }

    alert('Login Successful! Redirecting...');
    setTimeout(() => window.location.href = 'dashboard.html', 1000);
  });
}

// ===========================
// DASHBOARD CHARTS (IF PRESENT)
// ===========================
if (document.getElementById('projectsChart') || document.getElementById('tasksChart')) {
  // Projects Bar Chart
  const projectsCtx = document.getElementById('projectsChart')?.getContext('2d');
  if (projectsCtx) {
    new Chart(projectsCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Projects Completed',
          data: [2, 3, 1, 4, 3, 5],
          backgroundColor: '#1abc9c'
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  // Tasks Line Chart
  const tasksCtx = document.getElementById('tasksChart')?.getContext('2d');
  if (tasksCtx) {
    new Chart(tasksCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Tasks Completed',
          data: [5, 8, 6, 10],
          borderColor: '#923f3fff',
          fill: false,
          tension: 0.4
        }]
      },
      options: { responsive: true 
        
      }
    });
  }
}

// ===========================
// OPTIONAL: Smooth Scroll for Anchors
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

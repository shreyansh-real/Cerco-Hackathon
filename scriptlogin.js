function getRegisteredUsers() {
    const users = localStorage.getItem('cerco_users');
    return users ? JSON.parse(users) : [];
}

function saveRegisteredUsers(users) {
    localStorage.setItem('cerco_users', JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem('cerco_current_user');
    return user ? JSON.parse(user) : null;
}

document.getElementById('show-register').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.add('active');
});

document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    const users = getRegisteredUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('cerco_current_user', JSON.stringify({ name: user.name, email: user.email }));
        window.location.href = "home.html";
    } else {
        alert("Email not registered. Please register first.");
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    const name = prompt("Please enter your full name:", "");
    if (!name || name.trim() === "") {
        alert("Name is required for registration.");
        return;
    }
    const [pass, confirmPass] = Array.from(this.querySelectorAll('input[type="password"]')).map(el => el.value);

    if (!email || !pass || !confirmPass) {
        alert("Please fill in all fields.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (pass.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    if (pass !== confirmPass) {
        alert("Passwords don't match!");
        return;
    }

    const users = getRegisteredUsers();
    const existing = users.find(u => u.email === email);
    if (existing) {
        alert("This email is already registered. Please log in.");
        return;
    }

    users.push({ name: name.trim(), email, password: pass });
    saveRegisteredUsers(users);

    alert("Registration successful! Redirecting to login...");
    setTimeout(() => {
        document.getElementById('register-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
    }, 1500);
});

// 1. Theme Handling
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const toggle = document.getElementById('themeToggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (toggle) toggle.checked = true;
    } else {
        document.body.classList.add('light-mode');
        if (toggle) toggle.checked = false;
    }
});

function toggleTheme() {
    const body = document.body;
    const toggle = document.getElementById('themeToggle');

    if (toggle.checked) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// 2. Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// 3. Close Menu Helper (Attached to links so menu closes on click)
function closeMenu() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
}

// 4. Mobile Dropdown Toggle
function toggleDropdown(event) {
    // Only toggle on click if screen is mobile size
    if (window.innerWidth <= 768) {
        event.preventDefault(); 
        const dropdown = document.getElementById('contactDropdown');
        dropdown.classList.toggle('show');
    }
}

// 5. Handle Contact Form
function handleContact(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if(name && email) {
        alert(`Thank you, ${name}! We have received your message and will contact you at ${email} shortly.`);
        event.target.reset();
    }
}
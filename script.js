// ==========================================
// 1. ADD YOUR PROJECT DETAILS & IMAGES HERE
// ==========================================
const projectsData = [
    {
        title: "Rhythm of rain by Sowparnika",
        location: "Whitefield, Bangalore",
        price: "85 L onwards",
        status: "Under Construction",
        desc: "A premium high-rise residential community featuring state-of-the-art amenities and breathtaking views of the city skyline.",
        // CHANGED: Use local filename here
        img: "ROR.jpeg" 
    },
    {
        title: "ATMOS by JR eastfields",
        location: "Whitefield, Bangalore",
        price: "₹2 Cr onwards",
        status: "Under Construction",
        desc: "Exclusive eco-friendly luxury villas nestled in nature, offering a perfect blend of modern living and serenity.",
        // CHANGED: Use local filename here
        img: "ATMOS.jpeg"
    },
    {
        title: "SBR One Residence",
        location: "Hopefarm, Bangalore",
        price: "₹2.2 Cr onwards",
        status: "Under Construction",
        desc: "A next-generation commercial space designed for startups and established tech giants, featuring smart infrastructure.",
        // CHANGED: Use local filename here
        img: "ONE_RES.jpg"
    }
];

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    // Theme
    const savedTheme = localStorage.getItem('theme');
    const toggle = document.getElementById('themeToggle');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (toggle) toggle.checked = true;
    } else {
        document.body.classList.add('light-mode');
        if (toggle) toggle.checked = false;
    }

    initParticles();
    renderProjects();
});

// --- PARTICLES ---
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return; // Safety check
    
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 5 + 2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.setProperty('--tx', `${(Math.random()-0.5)*100}vw`);
        p.style.setProperty('--ty', `${(Math.random()-0.5)*100}vh`);
        p.style.animationDuration = `${Math.random()*20+10}s`;
        container.appendChild(p);
    }
}

// --- RENDER PROJECTS ---
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = ""; 

    projectsData.forEach((proj, index) => {
        const cardHTML = `
            <div class="card project-card" onclick="viewProject(${index})">
                <div class="project-img-wrapper">
                    <img src="${proj.img}" alt="${proj.title}" onerror="this.src='https://via.placeholder.com/400x250?text=Image+Not+Found'">
                    <span class="status-badge">${proj.status}</span>
                </div>
                <h3>${proj.title}</h3>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

// --- VIEW PROJECT POPUP ---
function viewProject(index) {
    const p = projectsData[index];
    document.getElementById('viewImg').src = p.img;
    document.getElementById('viewTitle').innerText = p.title;
    document.getElementById('viewLocation').innerText = p.location;
    document.getElementById('viewPrice').innerText = p.price;
    document.getElementById('viewStatus').innerText = p.status;
    document.getElementById('viewDesc').innerText = p.desc;
    document.getElementById('viewProjectModal').style.display = 'block';
}

function closeViewProjectModal() {
    document.getElementById('viewProjectModal').style.display = 'none';
}

// --- GENERAL UI ---
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

function toggleMobileMenu() { 
    const nav = document.getElementById('nav-links');
    if(nav) nav.classList.toggle('active'); 
}

function closeMenu() { 
    const nav = document.getElementById('nav-links');
    if(nav) nav.classList.remove('active'); 
}

function toggleDropdown(e) { 
    const drop = document.getElementById('contactDropdown');
    if(drop) drop.classList.toggle('show'); 
}

// --- FORMS (WHATSAPP) ---
function handleContact(e) {
    e.preventDefault(); 
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const msg = document.getElementById('message').value;
    
    // Note: 'email' was checked in previous code but not defined. Removed it for safety.
    if(name && phone && msg) {
        const text = `*Inquiry*%0aName: ${name}%0aPhone: ${phone}%0aMsg: ${msg}`;
        window.open(`https://wa.me/918618303398?text=${text}`, '_blank');
        e.target.reset();
    }
}

let currentRating = 0;
function rateUs(stars) {
    currentRating = stars;
    const ratingText = document.getElementById('rating-text');
    if(ratingText) ratingText.innerText = `You rated us ${stars} stars.`;
    document.getElementById('feedbackModal').style.display = 'block';
}

function submitFeedback() {
    const txt = document.getElementById('feedbackText').value;
    if(txt.trim() === "") { alert("Please enter suggestions"); return; }
    const text = `*Feedback*%0aRating: ${currentRating}%0aMsg: ${txt}`;
    window.open(`https://wa.me/918618303398?text=${text}`, '_blank');
    document.getElementById('feedbackText').value = "";
    closeFeedbackModal();
}

function closeFeedbackModal() { 
    document.getElementById('feedbackModal').style.display = 'none'; 
}

window.onclick = function(e) {
    const modals = ['viewProjectModal', 'feedbackModal'];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if(modal && e.target == modal) modal.style.display = "none";
    });
}
document.addEventListener('DOMContentLoaded', function () {
// UI Elements
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const viewAllBtn = document.getElementById('viewAllBtn');
const offersModal = document.getElementById('offersModal');
const closeModal = document.querySelector('.close-modal');
const allOffersGrid = document.getElementById('allOffersGrid');
const categoryModal = document.getElementById('categoryModal');
const modalCategoryTitle = document.getElementById('modalCategoryTitle');
const closeCategoryModal = document.getElementById('closeCategoryModal');
const categoryServicesGrid = document.getElementById('categoryServicesGrid');
const filterBtn = document.getElementById('filterBtn');
const sortBtn = document.getElementById('sortBtn');
const filterDropdown = document.getElementById('filterDropdown');
const sortDropdown = document.getElementById('sortDropdown');


// === Profile Dropdown & Modals ===
const openAccount = document.getElementById('openAccount');
const openSettings = document.getElementById('openSettings');
const logoutBtn = document.getElementById('logoutBtn');
const settingsModal = document.getElementById('settingsModal');
const accountModal = document.getElementById('accountModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');
const closeAccountModal = document.getElementById('closeAccountModal');
// Toggle sidebar on mobile
if (menuToggle) {
menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
}
document.addEventListener('click', (e) => {
if (window.innerWidth <= 768 &&
!sidebar.contains(e.target) &&
!menuToggle.contains(e.target) &&
sidebar.classList.contains('active')) {
sidebar.classList.remove('active');
}
});
// Modals
viewAllBtn?.addEventListener('click', (e) => {
e.preventDefault();
offersModal.style.display = 'block';
renderAllOffers();
});
closeModal?.addEventListener('click', () => offersModal.style.display = 'none');
closeCategoryModal?.addEventListener('click', () => categoryModal.style.display = 'none');
closeSettingsModal?.addEventListener('click', () => settingsModal.style.display = 'none');
closeAccountModal?.addEventListener('click', () => accountModal.style.display = 'none');
window.addEventListener('click', (e) => {
if (e.target === offersModal) offersModal.style.display = 'none';
if (e.target === categoryModal) categoryModal.style.display = 'none';
if (e.target === settingsModal) settingsModal.style.display = 'none';
if (e.target === accountModal) accountModal.style.display = 'none';
});
// Dropdowns
filterBtn?.addEventListener('click', () => {
filterDropdown.style.display = filterDropdown.style.display === 'block' ? 'none' : 'block';
});
sortBtn?.addEventListener('click', () => {
sortDropdown.style.display = sortDropdown.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener('click', (e) => {
if (!filterBtn?.contains(e.target) && !filterDropdown?.contains(e.target)) filterDropdown.style.display = 'none';
if (!sortBtn?.contains(e.target) && !sortDropdown?.contains(e.target)) sortDropdown.style.display = 'none';
});
// Account action
openAccount?.addEventListener('click', (e) => {
e.preventDefault();
accountModal.style.display = 'block';
});
// Settings action
openSettings?.addEventListener('click', (e) => {
e.preventDefault();
settingsModal.style.display = 'block';
});
// Logout action
logoutBtn?.addEventListener('click', (e) => {
e.preventDefault();
if (confirm('Are you sure you want to log out?')) {
localStorage.removeItem('userToken');
window.location.href = 'login.html';
}
});
// === SETTINGS FUNCTIONALITY ===
const notificationToggle = document.getElementById('notificationToggle');
const languageSelect = document.getElementById('languageSelect');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
// Load saved settings
if (localStorage.getItem('notifications') !== null) {
notificationToggle.checked = localStorage.getItem('notifications') === 'true';
}
if (localStorage.getItem('language')) {
languageSelect.value = localStorage.getItem('language');
}
if (localStorage.getItem('darkMode') === 'true') {
themeToggle.checked = true;
document.body.classList.add('dark-mode');
themeLabel.textContent = 'Dark Mode';
} else {
themeLabel.textContent = 'Light Mode';
}
// Save notification setting
notificationToggle.addEventListener('change', () => {
localStorage.setItem('notifications', notificationToggle.checked);
});
// Save language setting
languageSelect.addEventListener('change', () => {
localStorage.setItem('language', languageSelect.value);
});
// Theme toggle
themeToggle.addEventListener('change', () => {
if (themeToggle.checked) {
document.body.classList.add('dark-mode');
themeLabel.textContent = 'Dark Mode';
localStorage.setItem('darkMode', 'true');
} else {
document.body.classList.remove('dark-mode');
themeLabel.textContent = 'Light Mode';
localStorage.setItem('darkMode', 'false');
}
});



// ===== OFFER DATA =====
const offerData = [
{ title: "First-Time Customer Incentives", subtitle: "Special welcome deals!", promo: ["20% off first booking", "Free consultation"], products: ["🎁", "👋", "✨"], color: "#ff6b00" },
{ title: "Bundled & Value Packages", subtitle: "More services, lower price!", promo: ["AC + Pest Control @ ₹999", "Save up to 30%"], products: ["🧾", "🏠", "👨‍👩‍👧‍👦"], color: "#4a90e2" },
{ title: "Urgency & Loyalty Offers", subtitle: "Book now or earn rewards!", promo: ["15% off if booked by Sunday", "Refer & get ₹100"], products: ["⏰", "⭐", "🤝"], color: "#50c878" },
{ title: "Combo & Cross-Service Deals", subtitle: "Mix services, save big!", promo: ["Pest + Plumbing: 25% off", "Home cleaning + AC @ ₹1499"], products: ["🔧", "🧹", "❄️"], color: "#9b59b6" },
{ title: "Weekend Specials", subtitle: "Exclusive deals every weekend!", promo: ["Extra 10% off on Sat-Sun", "Priority booking"], products: ["📅", "🎉", "⚡"], color: "#e74c3c" },
{ title: "Local Hero Discounts", subtitle: "Support your neighborhood pros!", promo: ["10% off local providers", "Verified & trusted"], products: ["📍", "👷", "👍"], color: "#f39c12" }
];
let currentHomeIndex = 0;
const homeBanner = document.getElementById('homeOfferBanner');
function updateHomeOffer() {
const offer = offerData[currentHomeIndex];
homeBanner.innerHTML = `
<div class="offer-text">
<h2>${offer.title}</h2>
<p>${offer.subtitle}</p>
<div class="promo">
<div>${offer.promo[0]}</div>
<div>${offer.promo[1]}</div>
</div>
</div>
<div class="offer-products">
${offer.products.map(p => `<div class="offer-product">${p}</div>`).join('')}
</div>
`;
homeBanner.style.background = `linear-gradient(135deg, ${offer.color}, ${darkenColor(offer.color, 20)})`;
}
function darkenColor(hex, percent) {
let R = parseInt(hex.substring(1, 3), 16);
let G = parseInt(hex.substring(3, 5), 16);
let B = parseInt(hex.substring(5, 7), 16);
R = Math.floor(R * (100 - percent) / 100);
G = Math.floor(G * (100 - percent) / 100);
B = Math.floor(B * (100 - percent) / 100);
return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
}
setInterval(() => {
currentHomeIndex = (currentHomeIndex + 1) % offerData.length;
updateHomeOffer();
}, 4000);
updateHomeOffer();
function renderAllOffers() {
allOffersGrid.innerHTML = '';
offerData.forEach(offer => {
const card = document.createElement('div');
card.className = 'modal-offer-card';
card.style.background = `linear-gradient(135deg, ${offer.color}, ${darkenColor(offer.color, 25)})`;
card.innerHTML = `
<div class="modal-offer-content">
<h3>${offer.title}</h3>
<p>${offer.subtitle}</p>
<div class="promo">
<div>${offer.promo[0]}</div>
<div>${offer.promo[1]}</div>
</div>
</div>
`;
allOffersGrid.appendChild(card);
});
}



// ===== SERVICE CATALOG =====
const serviceCatalog = {
"Home Cleaning": [
{ type: "basic", title: "Basic Home Cleaning", description: "Regular dusting, vacuuming, and surface wiping.", tasks: 350, projects: 3, progress: 72, provider: "Priya Sharma", rating: 4.8, experience: "3 years", price: 999, availability: "available", location: "Mumbai" },
{ type: "deep", title: "Deep Cleaning Package", description: "Thorough cleaning including behind appliances.", tasks: 622, projects: 4, progress: 0, provider: "Rajesh Kumar", rating: 4.9, experience: "5 years", price: 1999, availability: "available", location: "Pune" },
{ type: "specialized", title: "Specialized Kitchen Cleaning", description: "Grease removal, oven cleaning, sanitization.", tasks: 410, projects: 2, progress: 85, provider: "Anita Mehta", rating: 4.7, experience: "4 years", price: 1499, availability: "limited", location: "Ahmedabad" },
{ type: "move-in", title: "Move-In/Out Cleaning", description: "Perfect for new tenants or property handover.", tasks: 580, projects: 5, progress: 60, provider: "Vikram Singh", rating: 4.6, experience: "6 years", price: 2499, availability: "available", location: "Nagpur" },
{ type: "post-construction", title: "Post-Construction Cleaning", description: "Remove dust, debris, and construction residue.", tasks: 700, projects: 6, progress: 45, provider: "Sunita Patel", rating: 4.9, experience: "7 years", price: 2999, availability: "unavailable", location: "Mumbai" },
{ type: "carpet", title: "Carpet & Upholstery Cleaning", description: "Steam cleaning for carpets, sofas, and curtains.", tasks: 320, projects: 1, progress: 90, provider: "Amit Joshi", rating: 4.8, experience: "2 years", price: 1799, availability: "available", location: "Pune" }
],
"Plumbing Services": [
{ type: "basic", title: "Basic Plumbing Repairs", description: "Fix leaky faucets, clogged sinks, and running toilets.", tasks: 420, projects: 5, progress: 65, provider: "Ramesh Yadav", rating: 4.7, experience: "4 years", price: 499, availability: "available", location: "Ahmedabad" },
{ type: "installation", title: "Installation Services", description: "Install new taps, showers, water heaters, and pipes.", tasks: 310, projects: 3, progress: 80, provider: "Sanjay Mehta", rating: 4.9, experience: "6 years", price: 1299, availability: "limited", location: "Nagpur" },
{ type: "drainage", title: "Drainage & Blockage Solutions", description: "Unclog drains, sewer lines, and fix slow drainage.", tasks: 580, projects: 7, progress: 50, provider: "Arjun Nair", rating: 4.8, experience: "5 years", price: 899, availability: "available", location: "Mumbai" },
{ type: "emergency", title: "24/7 Emergency Repairs", description: "Burst pipes, major leaks, and urgent fixes.", tasks: 290, projects: 4, progress: 90, provider: "Kavita Reddy", rating: 4.9, experience: "8 years", price: 1499, availability: "available", location: "Pune" },
{ type: "water-pump", title: "Water Pump Installation", description: "Install or repair submersible and booster pumps.", tasks: 210, projects: 2, progress: 70, provider: "Vijay Deshmukh", rating: 4.6, experience: "3 years", price: 1999, availability: "unavailable", location: "Ahmedabad" },
{ type: "pipe-inspection", title: "Pipe Inspection & Camera Survey", description: "Locate hidden leaks and blockages with camera tech.", tasks: 150, projects: 1, progress: 95, provider: "Neha Gupta", rating: 4.8, experience: "2 years", price: 2499, availability: "limited", location: "Nagpur" }
],
"Electrical Works": [
{ type: "wiring", title: "Home Wiring & Rewiring", description: "New installations or complete rewiring of old homes.", tasks: 380, projects: 4, progress: 60, provider: "Manoj Tiwari", rating: 4.8, experience: "7 years", price: 2499, availability: "available", location: "Mumbai" },
{ type: "repair", title: "Electrical Repairs", description: "Fix switches, sockets, tripping breakers, and lights.", tasks: 520, projects: 6, progress: 75, provider: "Deepak Verma", rating: 4.7, experience: "5 years", price: 599, availability: "available", location: "Pune" },
{ type: "lighting", title: "Lighting Installation", description: "LED, decorative, and smart lighting setups.", tasks: 300, projects: 3, progress: 85, provider: "Anjali Rao", rating: 4.9, experience: "4 years", price: 1799, availability: "limited", location: "Ahmedabad" },
{ type: "panel", title: "DB Panel Upgrade", description: "Modernize fuse boxes and install safety breakers.", tasks: 220, projects: 2, progress: 90, provider: "Suresh Iyer", rating: 4.8, experience: "9 years", price: 2999, availability: "available", location: "Nagpur" },
{ type: "inverter", title: "Inverter & UPS Setup", description: "Install backup power systems for homes/offices.", tasks: 180, projects: 2, progress: 70, provider: "Rohan Malhotra", rating: 4.6, experience: "3 years", price: 3499, availability: "unavailable", location: "Mumbai" },
{ type: "smart", title: "Smart Home Automation", description: "Voice-controlled lights, fans, and security systems.", tasks: 120, projects: 1, progress: 95, provider: "Isha Khanna", rating: 4.9, experience: "2 years", price: 4999, availability: "limited", location: "Pune" }
],
"Painting & Renovation": [
{ type: "interior", title: "Interior Painting", description: "Walls, ceilings, and accent painting for living spaces.", tasks: 410, projects: 5, progress: 70, provider: "Arun Singh", rating: 4.7, experience: "6 years", price: 1999, availability: "available", location: "Ahmedabad" },
{ type: "exterior", title: "Exterior Painting", description: "Weatherproof painting for facades and balconies.", tasks: 290, projects: 3, progress: 80, provider: "Meera Patel", rating: 4.8, experience: "5 years", price: 2999, availability: "limited", location: "Nagpur" },
{ type: "texture", title: "Texture & POP Work", description: "False ceilings, cornices, and wall textures.", tasks: 250, projects: 2, progress: 85, provider: "Karan Shah", rating: 4.9, experience: "7 years", price: 3999, availability: "available", location: "Mumbai" },
{ type: "polish", title: "Wood Polishing", description: "Restore shine to doors, cabinets, and furniture.", tasks: 180, projects: 2, progress: 90, provider: "Ritu Agarwal", rating: 4.6, experience: "4 years", price: 2499, availability: "unavailable", location: "Pune" },
{ type: "waterproof", title: "Waterproofing", description: "Terrace, bathroom, and wall leakage solutions.", tasks: 320, projects: 4, progress: 65, provider: "Vikas Choudhary", rating: 4.8, experience: "8 years", price: 3499, availability: "available", location: "Ahmedabad" },
{ type: "full-renovation", title: "Full Home Renovation", description: "Complete makeover from design to execution.", tasks: 90, projects: 1, progress: 95, provider: "Aditya Kapoor", rating: 4.9, experience: "10 years", price: 99999, availability: "limited", location: "Nagpur" }
],
"Carpenter Services": [
{ type: "furniture", title: "Custom Furniture", description: "Wardrobes, beds, study tables, and modular units.", tasks: 340, projects: 4, progress: 75, provider: "Rajiv Malhotra", rating: 4.8, experience: "6 years", price: 4999, availability: "available", location: "Mumbai" },
{ type: "repair", title: "Furniture Repair", description: "Fix broken chairs, wobbly tables, and loose joints.", tasks: 480, projects: 6, progress: 60, provider: "Sunil Das", rating: 4.7, experience: "5 years", price: 799, availability: "available", location: "Pune" },
{ type: "door", title: "Door & Window Fitting", description: "Install or replace wooden and sliding doors/windows.", tasks: 260, projects: 3, progress: 85, provider: "Anil Sharma", rating: 4.9, experience: "7 years", price: 3499, availability: "limited", location: "Ahmedabad" },
{ type: "kitchen", title: "Modular Kitchen Setup", description: "Design and build custom kitchen cabinets.", tasks: 190, projects: 2, progress: 90, provider: "Nisha Jain", rating: 4.8, experience: "4 years", price: 14999, availability: "available", location: "Nagpur" },
{ type: "flooring", title: "Wooden Flooring", description: "Install laminate, engineered, or solid wood floors.", tasks: 150, projects: 2, progress: 80, provider: "Prakash Rao", rating: 4.6, experience: "3 years", price: 8999, availability: "unavailable", location: "Mumbai" },
{ type: "decor", title: "Decorative Woodwork", description: "Shelves, panels, and ornamental carvings.", tasks: 120, projects: 1, progress: 95, provider: "Deepika Sen", rating: 4.9, experience: "2 years", price: 5999, availability: "limited", location: "Pune" }
],
"Appliances Repair": [
{ type: "ac", title: "AC Repair & Servicing", description: "Cooling issues, gas refill, and compressor checks.", tasks: 520, projects: 6, progress: 70, provider: "Rahul Kapoor", rating: 4.8, experience: "5 years", price: 899, availability: "available", location: "Ahmedabad" },
{ type: "washing", title: "Washing Machine Repair", description: "Drainage, spin, motor, and error code fixes.", tasks: 480, projects: 5, progress: 75, provider: "Sneha Desai", rating: 4.7, experience: "4 years", price: 799, availability: "available", location: "Nagpur" },
{ type: "fridge", title: "Refrigerator Repair", description: "Cooling failure, defrost issues, and compressor noise.", tasks: 410, projects: 4, progress: 80, provider: "Mohan Lal", rating: 4.9, experience: "6 years", price: 999, availability: "limited", location: "Mumbai" },
{ type: "microwave", title: "Microwave Oven Repair", description: "Heating problems, turntable, and door switch fixes.", tasks: 290, projects: 3, progress: 85, provider: "Geeta Menon", rating: 4.6, experience: "3 years", price: 699, availability: "available", location: "Pune" },
{ type: "tv", title: "TV & LED Repair", description: "Screen, sound, power, and connectivity issues.", tasks: 250, projects: 2, progress: 90, provider: "Arvind Kumar", rating: 4.8, experience: "5 years", price: 1299, availability: "unavailable", location: "Ahmedabad" },
{ type: "annual", title: "Annual Maintenance Contract", description: "Yearly servicing for all home appliances.", tasks: 180, projects: 2, progress: 95, provider: "Tina Roy", rating: 4.9, experience: "2 years", price: 2499, availability: "limited", location: "Nagpur" }
],
"Beauty and Wellness": [
{ type: "facial", title: "Advanced Facials", description: "Hydra, anti-aging, and acne-clearing treatments.", tasks: 620, projects: 7, progress: 80, provider: "Divya Nair", rating: 4.9, experience: "5 years", price: 1299, availability: "available", location: "Mumbai" },
{ type: "massage", title: "Therapeutic Massage", description: "Swedish, deep tissue, and aromatherapy sessions.", tasks: 580, projects: 6, progress: 75, provider: "Riya Sharma", rating: 4.8, experience: "4 years", price: 1499, availability: "available", location: "Pune" },
{ type: "hair", title: "Hair Spa & Treatment", description: "Damage repair, frizz control, and scalp therapy.", tasks: 510, projects: 5, progress: 85, provider: "Ananya Patel", rating: 4.7, experience: "3 years", price: 999, availability: "limited", location: "Ahmedabad" },
{ type: "waxing", title: "Full Body Waxing", description: "Smooth skin with premium wax and aftercare.", tasks: 490, projects: 6, progress: 70, provider: "Kriti Verma", rating: 4.8, experience: "4 years", price: 1799, availability: "available", location: "Nagpur" },
{ type: "makeup", title: "Bridal & Party Makeup", description: "Long-lasting, HD makeup for special occasions.", tasks: 320, projects: 4, progress: 90, provider: "Simran Kaur", rating: 4.9, experience: "6 years", price: 2999, availability: "unavailable", location: "Mumbai" },
{ type: "wellness", title: "Wellness Packages", description: "Detox, weight loss, and holistic therapy bundles.", tasks: 210, projects: 2, progress: 95, provider: "Dr. Neha Gupta", rating: 4.9, experience: "8 years", price: 4999, availability: "limited", location: "Pune" }
],
"Gardening and Landscaping": [
{ type: "lawn", title: "Lawn Care & Mowing", description: "Regular trimming, edging, and fertilization.", tasks: 380, projects: 4, progress: 75, provider: "Rajesh Green", rating: 4.7, experience: "3 years", price: 799, availability: "available", location: "Ahmedabad" },
{ type: "planting", title: "Plantation Services", description: "Flowers, shrubs, trees, and seasonal gardening.", tasks: 320, projects: 3, progress: 80, provider: "Sunita Bloom", rating: 4.8, experience: "4 years", price: 1499, availability: "available", location: "Nagpur" },
{ type: "landscaping", title: "Garden Landscaping", description: "Design pathways, fountains, and decorative layouts.", tasks: 210, projects: 2, progress: 85, provider: "Vikram Earth", rating: 4.9, experience: "6 years", price: 4999, availability: "limited", location: "Mumbai" },
{ type: "pest", title: "Pest & Weed Control", description: "Eco-friendly solutions for insects and weeds.", tasks: 290, projects: 3, progress: 70, provider: "Anand Nature", rating: 4.6, experience: "2 years", price: 1299, availability: "available", location: "Pune" },
{ type: "irrigation", title: "Drip Irrigation Setup", description: "Water-efficient automated watering systems.", tasks: 150, projects: 1, progress: 90, provider: "Meera Aqua", rating: 4.8, experience: "5 years", price: 2999, availability: "unavailable", location: "Ahmedabad" },
{ type: "maintenance", title: "Monthly Garden Maintenance", description: "Comprehensive care package for lush greenery.", tasks: 420, projects: 5, progress: 95, provider: "GreenThumb Co.", rating: 4.9, experience: "7 years", price: 1999, availability: "limited", location: "Nagpur" }
],
"Mechanics Services": [
{ type: "oil", title: "Oil Change & Basic Service", description: "Engine oil, filter, and fluid top-ups.", tasks: 720, projects: 8, progress: 80, provider: "Ravi Auto", rating: 4.7, experience: "4 years", price: 1299, availability: "available", location: "Mumbai" },
{ type: "brake", title: "Brake Repair & Replacement", description: "Pads, discs, and fluid system checks.", tasks: 580, projects: 6, progress: 75, provider: "Sandeep Garage", rating: 4.8, experience: "5 years", price: 1999, availability: "available", location: "Pune" },
{ type: "ac", title: "Car AC Servicing", description: "Gas refill, cooling coil, and blower repair.", tasks: 490, projects: 5, progress: 85, provider: "CoolRide Motors", rating: 4.9, experience: "6 years", price: 1499, availability: "limited", location: "Ahmedabad" },
{ type: "battery", title: "Battery Replacement", description: "Test, replace, and dispose of old batteries.", tasks: 420, projects: 4, progress: 90, provider: "PowerStart Auto", rating: 4.6, experience: "3 years", price: 2499, availability: "available", location: "Nagpur" },
{ type: "dent", title: "Dent & Paint Repair", description: "Minor dents, scratches, and paint touch-ups.", tasks: 310, projects: 3, progress: 80, provider: "SmoothFinish Cars", rating: 4.8, experience: "4 years", price: 2999, availability: "unavailable", location: "Mumbai" },
{ type: "full", title: "Full Vehicle Inspection", description: "Comprehensive health check for engine and chassis.", tasks: 250, projects: 2, progress: 95, provider: "SafeDrive Experts", rating: 4.9, experience: "7 years", price: 3499, availability: "limited", location: "Pune" }
]
};



// Render services for a category
function renderCategoryServices(categoryName) {
const services = serviceCatalog[categoryName] || [];
let currentFilters = {
types: new Set(services.map(s => s.type)),
sortBy: "popularity"
};
modalCategoryTitle.textContent = `${categoryName} Services`;
filterDropdown.innerHTML = '';
const uniqueTypes = [...new Set(services.map(s => s.type))];
uniqueTypes.forEach(type => {
const label = document.createElement('label');
label.innerHTML = `<input type="checkbox" value="${type}" checked> ${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
filterDropdown.appendChild(label);
});
filterDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
cb.addEventListener('change', () => {
if (cb.checked) currentFilters.types.add(cb.value);
else currentFilters.types.delete(cb.value);
BookNowFiltersAndSort(services, currentFilters);
});
});
sortDropdown.querySelectorAll('input[type="radio"]').forEach(radio => {
radio.addEventListener('change', () => {
currentFilters.sortBy = radio.value;
BookNowFiltersAndSort(services, currentFilters);
});
});
BookNowFiltersAndSort(services, currentFilters);
}
function BookNowFiltersAndSort(services, filters) {
let filtered = services.filter(s => filters.types.has(s.type));
switch (filters.sortBy) {
case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
default: filtered.sort((a, b) => b.tasks - a.tasks); break;
}
categoryServicesGrid.innerHTML = '';
if (filtered.length === 0) {
categoryServicesGrid.innerHTML = `<p style="text-align:center;grid-column:1/-1;font-size:18px;color:#666;">No services match your criteria.</p>`;
return;
}
filtered.forEach(service => {
const dotClass = service.availability;
const card = document.createElement('div');
card.className = 'service-card';
card.innerHTML = `
  <div class="service-card-inner">
  <button class="feedback-btn"data-i18n="giveFeedback">💬 Give Feedback</button>
    <div class="service-tag">${service.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
    <h3 class="service-title">${service.title}</h3>
    <p class="service-desc">${service.description}</p>
    <div class="service-location">
      <span class="location-icon">📍</span> ${service.location}
    </div>
    <div class="service-stats">
      <div class="stat-item"><span>📋</span> ${service.tasks} tasks</div>
      <div class="stat-item"><span>💼</span> ${service.projects} projects</div>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${service.progress}%"></div>
    </div>
    <div class="service-footer">
      <div class="provider-info">
        <div class="provider-avatar">${service.provider.charAt(0)}</div>
        <div>
          <div class="provider-name">${service.provider}</div>
          <div class="provider-rating">⭐ ${service.rating} · ${service.experience}</div>
        </div>
      </div>
      <div>
        <div class="service-price">₹${service.price}</div>
        <div style="display:flex;align-items:center;margin-top:8px;">
          <span class="availability-dot ${dotClass}"></span>
          <button class="BookNow-btn"data-i18n="bookNow">Book Now</button>
        </div>
      </div>
    </div>
  </div>
`;
categoryServicesGrid.appendChild(card);
});
}
// ===== FREQUENTLY USED SERVICES =====
function getRandomServices(count = 6) {
const allServices = [];
for (const category in serviceCatalog) {
serviceCatalog[category].forEach(service => {
allServices.push({ ...service });
});
}
return allServices
.sort(() => 0.5 - Math.random())
.slice(0, count);
}
function renderFrequentlyUsedServices() {
const grid = document.getElementById('frequentlyUsedGrid');
if (!grid) return;
const services = getRandomServices(6);
grid.innerHTML = '';
services.forEach(service => {
const dotClass = service.availability || 'available';
const card = document.createElement('div');
card.className = 'service-card';
card.innerHTML = `
<div class="service-tag">${service.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
<button class="feedback-btn">💬 Give Feedback</button>
<h3 class="service-title">${service.title}</h3>
<p class="service-desc">${service.description}</p>
<div class="service-location">
<span class="location-icon">📍</span> ${service.location}
</div>
<div class="service-stats">
<div class="stat-item"><span>📋</span> ${service.tasks} tasks</div>
<div class="stat-item"><span>💼</span> ${service.projects} projects</div>
</div>
<div class="progress-bar">
<div class="progress-fill" style="width: ${service.progress}%"></div>
</div>
<div class="service-footer">
<div class="provider-info">
<div class="provider-avatar">${service.provider.charAt(0)}</div>
<div>
<div class="provider-name">${service.provider}</div>
<div class="provider-rating">⭐ ${service.rating} · ${service.experience}</div>
</div>
</div>
<div>
<div class="service-price">₹${service.price}</div>
<div style="display:flex;align-items:center;margin-top:8px;">
<span class="availability-dot ${dotClass}"></span>
<button class="BookNow-btn">Book Now</button>
</div>
</div>
</div>
`;
grid.appendChild(card);
});
}
renderFrequentlyUsedServices();



// ===== LIVE SEARCH FUNCTIONALITY (REPLACES OFFERS + CATEGORIES WITH RESULTS) =====
const searchInput = document.getElementById('searchInput');
const offersSection = document.querySelector('.offers-section');
const categoriesSection = document.querySelector('.categories-section');
const frequentlyUsedSection = document.querySelector('.frequently-used-section');
const searchResultsContainer = document.getElementById('searchResultsContainer');
const searchServicesGrid = document.getElementById('searchServicesGrid');

if (searchInput) {
  // Flatten all services with category info
  const allServicesWithCategory = [];
  for (const [category, services] of Object.entries(serviceCatalog)) {
    services.forEach(service => {
      allServicesWithCategory.push({ ...service, category });
    });
  }

  function performSearch(query) {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      // Restore original layout
      searchResultsContainer.style.display = 'none';
      offersSection.style.display = '';
      categoriesSection.style.display = '';
      frequentlyUsedSection.style.marginTop = '100px'; // restore original spacing
      return;
    }

    // Filter matching services
    const matches = allServicesWithCategory.filter(service =>
      service.title.toLowerCase().includes(trimmedQuery) ||
      service.description.toLowerCase().includes(trimmedQuery) ||
      service.category.toLowerCase().includes(trimmedQuery) ||
      service.provider.toLowerCase().includes(trimmedQuery) ||
      service.location.toLowerCase().includes(trimmedQuery)
    );

    // Hide original sections
    offersSection.style.display = 'none';
    categoriesSection.style.display = 'none';
    frequentlyUsedSection.style.marginTop = '40px'; // reduce gap above Frequently Used

    // Render results
    searchServicesGrid.innerHTML = '';
    if (matches.length === 0) {
      searchServicesGrid.innerHTML = `<p style="text-align:center; grid-column:1/-1; font-size:18px; color:#666;">No services found for "${query}"</p>`;
    } else {
      matches.forEach(service => {
        const dotClass = service.availability || 'available';
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
          <div class="service-card-inner">
            <button class="feedback-btn">💬 Give Feedback</button>
            <div class="service-tag">${service.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-desc">${service.description}</p>
            <div class="service-location">
              <span class="location-icon">📍</span> ${service.location}
            </div>
            <div class="service-stats">
              <div class="stat-item"><span>📋</span> ${service.tasks} tasks</div>
              <div class="stat-item"><span>💼</span> ${service.projects} projects</div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${service.progress}%"></div>
            </div>
            <div class="service-footer">
              <div class="provider-info">
                <div class="provider-avatar">${service.provider.charAt(0)}</div>
                <div>
                  <div class="provider-name">${service.provider}</div>
                  <div class="provider-rating">⭐ ${service.rating} · ${service.experience}</div>
                </div>
              </div>
              <div>
                <div class="service-price">₹${service.price}</div>
                <div style="display:flex;align-items:center;margin-top:8px;">
                  <span class="availability-dot ${dotClass}"></span>
                  <button class="BookNow-btn">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        `;
        searchServicesGrid.appendChild(card);
      });
    }

    searchResultsContainer.style.display = 'block';
  }

  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 300);
  });
}

// === FEEDBACK MODAL WITH PROVIDER DETAILS ===
const feedbackModal = document.getElementById('feedbackModal');
const closeFeedbackModal = document.getElementById('closeFeedbackModal');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackTitle = document.getElementById('feedbackTitle');
const feedbackDesc = document.getElementById('feedbackDesc');
const titleCount = document.getElementById('titleCount');
const descCount = document.getElementById('descCount');
const titleError = document.getElementById('titleError');
const descError = document.getElementById('descError');
const resetFeedbackBtn = document.getElementById('resetFeedback');
const starRatingContainer = document.getElementById('starRatingContainer');
const userRatingInput = document.getElementById('userRating');

// Store current service data when feedback is opened
let currentFeedbackService = null;

// Open modal on "Give Feedback" click with service context
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('feedback-btn')) {
    // Traverse up to find the service card
    const card = e.target.closest('.service-card');
    if (!card) return;

    // Extract service data from innerHTML or dataset (we'll embed it)
    // Since data isn't stored as attributes, we parse it from DOM
    const providerName = card.querySelector('.provider-name')?.textContent || 'Unknown';
    const rating = card.querySelector('.provider-rating')?.textContent?.split(' ')[1] || '4.5';
    const experience = card.querySelector('.provider-rating')?.textContent?.split('·')[1]?.trim() || 'N/A';
    const location = card.querySelector('.service-location')?.textContent?.replace('📍', '').trim() || 'N/A';
    const title = card.querySelector('.service-title')?.textContent || '';

    currentFeedbackService = { providerName, rating, experience, location, title };

    // Update modal UI
    document.getElementById('feedbackProviderName').textContent = providerName;
    document.getElementById('feedbackProviderFullName').textContent = providerName;
    document.getElementById('feedbackProviderRating').textContent = rating;
    document.getElementById('feedbackProviderExp').textContent = experience;
    document.getElementById('feedbackProviderLocation').textContent = location;

    // Generate 3 random mock past feedbacks
    const pastFeedbacks = [
      { user: "Rahul", rating: 5, comment: "Excellent work! Very professional." },
      { user: "Priya", rating: 4, comment: "Good service, but arrived late." },
      { user: "Amit", rating: 5, comment: "Highly recommend. Will book again!" },
      { user: "Sneha", rating: 3, comment: "Average quality, expected better." },
      { user: "Vikram", rating: 5, comment: "Perfect! Cleaned my entire house." }
    ].sort(() => 0.5 - Math.random()).slice(0, 3);

    const pastFeedbacksList = document.getElementById('pastFeedbacksList');
    pastFeedbacksList.innerHTML = pastFeedbacks.map(f => `
      <div class="past-feedbacks-list-item">
        <div><strong>${f.user}</strong> • ${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}</div>
        <div style="margin-top:4px; color:#666;">"${f.comment}"</div>
      </div>
    `).join('');

    // Reset form & rating
    feedbackForm.reset();
    titleCount.textContent = "0/32";
    descCount.textContent = "0/100";
    titleError.textContent = "";
    descError.textContent = "";
    userRatingInput.value = "5";
    updateStars(5);

    feedbackModal.style.display = 'block';
    feedbackTitle.focus();
  }
});

// Star rating interaction
function updateStars(rating) {
  const stars = starRatingContainer.querySelectorAll('.star');
  stars.forEach((star, i) => {
    star.classList.toggle('active', i < rating);
  });
}

starRatingContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('star')) {
    const rating = parseInt(e.target.dataset.value);
    userRatingInput.value = rating;
    updateStars(rating);
  }
});

starRatingContainer.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('star')) {
    const rating = parseInt(e.target.dataset.value);
    updateStars(rating);
  }
});

starRatingContainer.addEventListener('mouseleave', () => {
  const currentRating = parseInt(userRatingInput.value);
  updateStars(currentRating);
});

// Close modal
closeFeedbackModal?.addEventListener('click', () => {
  feedbackModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === feedbackModal) feedbackModal.style.display = 'none';
});

// Real-time character count & validation (keep existing)
feedbackTitle.addEventListener('input', () => {
  const len = feedbackTitle.value.length;
  titleCount.textContent = `${len}/32`;
  if (len < 5 && len > 0) {
    titleError.textContent = "Subject must be at least 5 characters.";
  } else if (len > 32) {
    titleError.textContent = "Subject must be at most 32 characters.";
  } else {
    titleError.textContent = "";
  }
});
feedbackDesc.addEventListener('input', () => {
  const len = feedbackDesc.value.length;
  descCount.textContent = `${len}/100`;
  if (len < 20 && len > 0) {
    descError.textContent = "Description must be at least 20 characters.";
  } else if (len > 100) {
    descError.textContent = "Description must be at most 100 characters.";
  } else {
    descError.textContent = "";
  }
});

resetFeedbackBtn?.addEventListener('click', () => {
  feedbackForm.reset();
  titleCount.textContent = "0/32";
  descCount.textContent = "0/100";
  titleError.textContent = "";
  descError.textContent = "";
  userRatingInput.value = "5";
  updateStars(5);
});

// Handle form submit
feedbackForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = feedbackTitle.value.trim();
  const desc = feedbackDesc.value.trim();
  const rating = parseInt(userRatingInput.value);
  let valid = true;

  if (title.length < 5) {
    titleError.textContent = "Subject must be at least 5 characters.";
    valid = false;
  } else if (title.length > 32) {
    titleError.textContent = "Subject must be at most 32 characters.";
    valid = false;
  } else {
    titleError.textContent = "";
  }

  if (desc.length < 20) {
    descError.textContent = "Description must be at least 20 characters.";
    valid = false;
  } else if (desc.length > 100) {
    descError.textContent = "Description must be at most 100 characters.";
    valid = false;
  } else {
    descError.textContent = "";
  }

  if (valid) {
    alert(`✅ Thank you for your feedback!\n\nProvider: ${currentFeedbackService.providerName}\nRating: ${rating}★\nSubject: ${title}\nComment: ${desc}`);
    // In real app: send { provider, rating, title, desc } to backend
    feedbackModal.style.display = 'none';
    feedbackForm.reset();
    titleCount.textContent = "0/32";
    descCount.textContent = "0/100";
  }
});

// Category click handler
document.querySelectorAll('.category-card').forEach(card => {
card.addEventListener('click', () => {
const category = card.dataset.category;
if (serviceCatalog[category]) {
categoryModal.style.display = 'block';
renderCategoryServices(category);
} else {
alert(`You selected: ${category}`);
}

});
});


// ===== LANGUAGE SWITCHING =====
const translations = {
  en: {
    welcome: "𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕋𝕠 ℂ𝕖𝕣𝕔𝕠 !",
    searchPlaceholder: "Search services...",
    searchBtn: "Search",
    topOffers: "🔥Top Offers",
    viewAll: "View All",
    browseCategories: "Browse Categories",
    home: "Home",
    contact: "Contact",
    account: "Account",
    settings: "Settings",
    logout: "Logout",
    notifications: "Notifications",
    language: "Language",
    theme: "Theme",
    lightMode: "Light Mode",
    save: "Save",
    cancel: "Cancel"
  },
  hi: {
    welcome: "ℂ𝕖𝕣𝕔𝕠 में आपका स्वागत है!",
    searchPlaceholder: "सेवाएँ खोजें...",
    searchBtn: "खोजें",
    topOffers: "🔥शीर्ष ऑफ़र्स",
    viewAll: "सभी देखें",
    browseCategories: "श्रेणियाँ ब्राउज़ करें",
    home: "होम",
    contact: "संपर्क",
    account: "खाता",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    notifications: "सूचनाएँ",
    language: "भाषा",
    theme: "थीम",
    lightMode: "लाइट मोड",
    save: "सहेजें",
    cancel: "रद्द करें"
  },
  es: {
    welcome: "¡Bienvenido a Cerco!",
    searchPlaceholder: "Buscar servicios...",
    searchBtn: "Buscar",
    topOffers: "🔥Ofertas Destacadas",
    viewAll: "Ver Todo",
    browseCategories: "Explorar Categorías",
    home: "Inicio",
    contact: "Contacto",
    account: "Cuenta",
    settings: "Ajustes",
    logout: "Cerrar Sesión",
    notifications: "Notificaciones",
    language: "Idioma",
    theme: "Tema",
    lightMode: "Modo Claro",
    save: "Guardar",
    cancel: "Cancelar"
  },
  fr: {
    welcome: "Bienvenue sur Cerco !",
    searchPlaceholder: "Rechercher des services...",
    searchBtn: "Rechercher",
    topOffers: "🔥Meilleures Offres",
    viewAll: "Voir Tout",
    browseCategories: "Parcourir les Catégories",
    home: "Accueil",
    contact: "Contact",
    account: "Compte",
    settings: "Paramètres",
    logout: "Déconnexion",
    notifications: "Notifications",
    language: "Langue",
    theme: "Thème",
    lightMode: "Mode Clair",
    save: "Enregistrer",
    cancel: "Annuler"
  }
};

function applyLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key] !== undefined) {
      // Handle different element types safely
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.placeholder = translations[lang][key];
      } else if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'OPTION') {
        el.textContent = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Special: Update welcome message with user name
  const currentUser = JSON.parse(localStorage.getItem('cerco_current_user'));
  if (currentUser) {
    const welcomeText = translations[lang]?.welcome || "Welcome to Cerco!";
    const displayName = currentUser.isGuest ? "Guest" : currentUser.name;
    const welcomeEl = document.getElementById('welcomeMessage');
  if (welcomeEl) {
    welcomeEl.innerHTML = `<b>${welcomeText.replace('!', '')}, ${displayName}!</b>`;
  }
}

  // Update theme label based on current mode (since it uses dynamic text)
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  if (themeLabel) {
    if (themeToggle.checked) {
      themeLabel.textContent = lang === 'hi' ? 'डार्क मोड' :
                              lang === 'es' ? 'Modo Oscuro' :
                              lang === 'fr' ? 'Mode Sombre' : 'Dark Mode';
    } else {
      themeLabel.textContent = translations[lang]?.lightMode || 'Light Mode';
    }
  }
}

// Load and apply saved language
const savedLang = localStorage.getItem('language') || 'en';
languageSelect.value = savedLang;
applyLanguage(savedLang);

// Listen for language change
languageSelect.addEventListener('change', () => {
  const newLang = languageSelect.value;
  localStorage.setItem('language', newLang);
  applyLanguage(newLang);
});


});

// === CONTACT MODAL ===
const contactModal = document.getElementById('contactModal');
const openContactModal = document.getElementById('openContactModal');
const closeContactModal = document.getElementById('closeContactModal');
const contactForm = document.getElementById('contactForm');

// Open modal
openContactModal?.addEventListener('click', (e) => {
  e.preventDefault();
  contactModal.style.display = 'block';
});

// Close modal
closeContactModal?.addEventListener('click', () => {
  contactModal.style.display = 'none';
});

// Close if clicked outside
window.addEventListener('click', (e) => {
  if (e.target === contactModal) contactModal.style.display = 'none';
});

// Form validation & submit
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const email = document.getElementById('userEmail').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const message = document.getElementById('userMessage').value.trim();

  // Reset errors
  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('emailError').textContent = "Please enter a valid Gmail.";
    valid = false;
  }

  // Validate phone (basic)
  if (phone.length < 10) {
    document.getElementById('phoneError').textContent = "Enter a valid phone number.";
    valid = false;
  }

  // Validate message
  if (message.length < 10) {
    document.getElementById('messageError').textContent = "Message must be at least 10 characters.";
    valid = false;
  }

  if (valid) {
    alert("✅ Thank you! Your message has been sent to the developer.");
    contactForm.reset();
    contactModal.style.display = 'none';
    // In real app: send data via fetch()
  }
});

// Reset form
document.getElementById('resetContactForm')?.addEventListener('click', () => {
  contactForm?.reset();
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
});

🌐 Cerco – Service Discovery Platform
Hackathon Project | Frontend Prototype | Team of 3

A responsive, multilingual web platform for discovering local services — built entirely with HTML, CSS, and vanilla JavaScript.

🎯 Overview
Cerco (Latin for "to seek") is a user-centric frontend prototype designed to help users find, explore, and book trusted local service providers — from plumbers and electricians to beauticians and gardeners — all through an elegant, intuitive interface.

Developed during a college hackathon by a team of three students, Cerco focuses on UI/UX excellence, accessibility, dark/light mode, and real-time language switching — without relying on any external frameworks or backend systems.

✨ Core Features
🔍 Smart Service Discovery
Search bar with future-ready placeholder
Browse by category: 9 major service domains (e.g., Home Cleaning, Plumbing, Beauty)
Frequently Used Services: Algorithmically randomized popular picks
Top Offers Carousel: Auto-rotating promotional banners with dynamic gradients
🌍 Multilingual Support (4 Languages)
Users can instantly switch the entire UI language via Settings:

English
हिन्दी (Hindi)
Español (Spanish)
Français (French)
Language preference is saved in localStorage and persists across sessions.

🎨 Personalized Experience
Account Panel displays:
User name (editable inline)
Email & masked phone
Location: Mumbai, India
Member since: Jan 2024
Active bookings count
Dark/Light Mode Toggle with smooth transition and persistent setting
⚙️ Interactive Modals
Settings Modal: Control notifications, language, and theme
Account Modal: Edit profile name with validation
Category Modal: View filtered & sorted service listings with:
Type-based filtering (e.g., “Deep Cleaning”, “Emergency Repairs”)
Sorting by popularity, rating, or price
Feedback Modal: Rate providers with star ratings, subject, and description (with character limits and validation)
Contact Developer Modal: Send messages directly to the team
💬 User Engagement Tools
“💬 Give Feedback” button on every service card
“Book Now” CTA with real-time availability indicators:
✅ Available (green dot)
⚠️ Limited (yellow dot)
❌ Unavailable (red dot)
📱 Fully Responsive Design
Mobile-first sidebar navigation with hamburger menu
Adaptive grids (1–3 columns based on screen size)
Touch-friendly buttons and modals
Optimized footer with social links and policies
🛠️ Technical Stack
Layer	Technology
Frontend	HTML5, CSS3, Vanilla JavaScript (ES6)
Styling	Custom CSS (no Bootstrap/Tailwind)
State	localStorage for user preferences
Assets	Emoji icons + custom logo images
Hosting	Azure Dev Tunnels (temporary demo URL)
❗ Note: This is a frontend-only prototype. All data (users, services, offers) is hardcoded in JavaScript for demo purposes. No backend, database, or authentication system is implemented.

🧩 Key Components
1. Hero Section
Full-width background image with overlay
Prominent search bar and welcome message personalized with user’s name
2. Offers System
Rotating single banner on homepage (setInterval)
“View All” modal showing 6 categorized promotional cards with gradient backgrounds
3. Service Catalog
9 categories × 6 services each = 54 unique service listings
Each includes: title, description, price, location, provider, rating, experience, task count, and availability
4. Dynamic Filtering & Sorting
Real-time update of service cards based on selected filters and sort order
Clean dropdown UI with hover/click interactions
5. Internationalization (i18n) Ready
Language selector in Settings modal
All translatable strings are hardcoded in English but structured for easy i18n expansion (as shown in the codebase)
6. Modern Footer
Logo + slogan
Contact info + social media (Instagram, Facebook, GitHub, WhatsApp)
Legal links (Privacy, Terms, Refund Policy)
Copyright notice
👥 Team & Context
Team Size: 3 undergraduate students
Development Time: Hackathon sprint (typically 24–48 hours)
Goal: Demonstrate rapid prototyping, UI polish, and user empathy using only core web technologies
Constraints: No backend, no external libraries (pure vanilla JS)
This project reflects the team’s focus on user experience, visual design, and functional completeness within tight time limits.

🚀 How to Navigate
Log in (simulated via localStorage user object)
Explore services via:
Search bar
Category tiles
“Frequently Used” section
Open Settings (⚙️) to:
Toggle dark mode
Switch language
Manage notifications
Click Account (👤) to:
View profile
Edit your display name
Use “Give Feedback” or “Book Now” on any service card
Scroll to Footer to contact developers or view policies
📝 Final Notes
The website is fully functional as a demo.
All interactive elements (modals, toggles, forms) include client-side validation.
The code is clean, commented, and organized across index.html, stylehome.css, and scripthome.js.
Designed with hackathon judging criteria in mind: innovation, usability, completeness, and presentation.
Made with ❤️ for the Hackathon
Cerco — Find What You Need, Instantly.


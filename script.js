// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.querySelector('.main-content');
    const homeSection = document.getElementById('home');
    const cvSection = document.getElementById('cv');
    const photosSection = document.getElementById('photos');
    const insightsSection = document.getElementById('insights');
    const contactSection = document.getElementById('contact');
    
    // Function to hide all sections
    function hideAllSections() {
        if (mainContent) mainContent.style.display = 'none';
        if (homeSection) homeSection.style.display = 'none';
        if (cvSection) cvSection.style.display = 'none';
        if (photosSection) photosSection.style.display = 'none';
        if (insightsSection) insightsSection.style.display = 'none';
        if (contactSection) contactSection.style.display = 'none';
    }
    
    // Show home section initially
    if (mainContent) mainContent.style.display = 'block';
    if (homeSection) homeSection.style.display = 'block';
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections first
            hideAllSections();
            
            // Show target section
            const targetId = this.getAttribute('href').substring(1);
            
            // Handle home navigation
            if (targetId === 'home') {
                if (mainContent) mainContent.style.display = 'block';
                if (homeSection) homeSection.style.display = 'block';
            } 
            // Handle CV section
            else if (targetId === 'cv' && cvSection) {
                cvSection.style.display = 'flex';
            }
            // Handle Photos section
            else if (targetId === 'photos' && photosSection) {
                photosSection.style.display = 'block';
            }
            // Handle Insights section
            else if (targetId === 'insights' && insightsSection) {
                insightsSection.style.display = 'block';
            }
            // Handle Contact section
            else if (targetId === 'contact' && contactSection) {
                contactSection.style.display = 'block';
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to various elements
document.addEventListener('DOMContentLoaded', () => {
    // Research areas
    const researchAreas = document.querySelectorAll('.research-area');
    researchAreas.forEach(area => {
        area.style.opacity = '0';
        area.style.transform = 'translateY(20px)';
        area.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(area);
    });
    
    // Photo items
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Paper items (Insights section)
    const paperItems = document.querySelectorAll('.paper-item');
    paperItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Category filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const paperItems = document.querySelectorAll('.paper-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            paperItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'flex';
                    // Re-trigger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
// Set dark theme by default
const body = document.body;
body.setAttribute('data-theme', 'dark');

// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter when page loads
window.addEventListener('load', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        setTimeout(() => {
            typeWriter(typewriterElement, 'Full Stack Developer', 150);
        }, 1000);
    }
});

// Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll Animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.classList.add('animated');
        }
    });
}

// Initialize EmailJS when page loads
window.addEventListener('load', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: 'Af_8uBYW9LTsuUVSE',
            blockHeadless: true,
            limitRate: {
                id: 'app',
                throttle: 10000,
            },
        });
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS not loaded');
    }
});

// Contact Form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            alert('Email service is not available. Please try again later.');
            return;
        }
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        console.log('Form data:', { name, email, subject, message });
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare template parameters (using standard EmailJS variable names)
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject || 'New Contact Form Message',
            message: message,
            to_name: 'Gerald Ablanzar'
        };
        
        console.log('Sending email with params:', templateParams);
        
        // Send email directly to Gerald
        emailjs.send('service_t0wlofe', 'template_d57jsww', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            console.error('Error details:', error);
            
            // More detailed error handling
            let errorMessage = 'Failed to send message. ';
            if (error.status === 422) {
                errorMessage += 'Please check your EmailJS template variables.';
            } else if (error.status === 400) {
                errorMessage += 'Invalid request. Please try again.';
            } else if (error.text) {
                errorMessage += error.text;
            } else {
                errorMessage += 'Please contact me directly at raldablanzar@email.com';
            }
            
            alert('Error: ' + errorMessage);
        })
        .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
} else {
    console.error('Contact form not found');
}

// Project Modal
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

const projectData = {
    'ecommerce': {
        title: 'AttendEase: Attendance Monitoring System',
        description: 'AttendEase is a web-based RFID attendance monitoring system powered by Raspberry Pi, designed for the faculty and staff of Vicente P. Trinidad National High School. It automates time-in/out logging through RFID scanning and provides a secure web portal with role-based access for administrators, subject group heads / department heads, and users.',
        features: [
            'Automated RFID-based attendance logging via kiosk',
            'Role-based access for administrators, subject heads, and faculty/staff',
            'Attendance log management and report generation (DTR)',
            'Service credit tracking for faculty and staff',
            'Announcements posting and engagement',
            'Document requirements portal for uploads and downloads',
            'Secure audit trails, system logs, and user notifications',
            'Account management with password recovery features'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel (PHP)', 'Python', 'MySQL', 'Raspberry Pi with RFID reader', 'LCD I2C'],
        github: '#',
        demo: '#',
        image: 'src/images/AMS.png'
    },
    'task-manager': {
        title: 'Jayel Inventory and Accounting System',
        description: 'The Jayel Inventory and Accounting System is a comprehensive business management solution built for Jayel Marketing Rondex Enterprises Corp. This Laravel-based web application streamlines inventory tracking, order processing, supplier management, and financial operations through an intuitive admin interface powered by Filament.',
        features: [
            'Inventory Management',
            'Order Processing',
            'Supplier Operations',
            'Financial Tools',
            'Data Import/Export',
            'User Management',
            'Reporting',
            'Notification System'
        ],
        technologies: ['PHP', 'Laravel', 'PostgreSQL', 'PostgreSQL', 'Filament ', 'Tailwind CSS'],
        github: '#',
        demo: '#',
        image: 'src/images/Jayel.png'
    },
    'weather-app': {
        title: 'HavenSphere',
        description: 'HavenSphere is a comprehensive hotel/accommodation booking management system built with Laravel that allows guests to browse and book rooms online while providing administrators with tools to manage properties, reservations, and track system activities. The system includes both web and desktop applications with PWA capabilities for enhanced user experience.',
        features: [
            'Room Management',
            'Booking System',
            '7-day Forecast',
            'User Authentication',
            'Dashboard Analytics',
            'Feedback System',
            'System Logging',
            'Email Notifications'
        ],
        technologies: ['Laravel', 'TailwindCSS', 'MySQL','Electron.js', 'PWA'],
        github: '#',
        demo: '#',
        image: 'src/images/HavenSphere.png'
    },
    'social-media': {
        title: 'AnaAmahanBeautyWorks',
        description: 'Ana Amahan Beauty Works is a professional beauty services website showcasing a freelance makeup artist and certified eyelash technician. The site features a portfolio of makeup and eyelash extension work, client testimonials, service pricing, and booking functionality for various beauty services including bridal makeup, prom looks, and eyelash extensions.',
        features: [
            'Portfolio Gallery',
            'Service Pricing',
            'Client Testimonials',
            'Booking System',
            'About Section',
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        github: '#',
        demo: '#',
        image: 'src/images/Ana.png'
    }
};

document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            showProjectModal(project);
        }
    });
});

function showProjectModal(project) {
    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 2rem;">
            <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-primary);">${project.title}</h2>
            <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">${project.description}</p>
        </div>
        
        <div class="modal-section" style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--text-primary);">Key Features</h3>
            <ul style="list-style: none; padding: 0;">
                ${project.features.map(feature => `
                    <li style="margin-bottom: 0.5rem; color: var(--text-secondary); position: relative; padding-left: 1.5rem;">
                        <i class="fas fa-check" style="color: var(--primary-color); position: absolute; left: 0; top: 0.2rem;"></i>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="modal-section" style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--text-primary);">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
        </div>
        
        <div class="modal-actions" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="${project.github}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i> View Code
            </a>
            <a href="${project.demo}" class="btn btn-primary" target="_blank">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    `;
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

projectModal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17, 24, 39, 0.98)';
    } else {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
    }
});

// Event listeners
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', createParticles);

// Initialize animations on page load
function initializeAnimations() {
    // Add animation classes to elements
    const elementsToAnimate = [
        { selector: '.about-text', class: 'fade-in' },
        { selector: '.timeline', class: 'slide-in-right' },
        { selector: '.skill-category', class: 'scale-in' },
        { selector: '.project-card', class: 'fade-in' },
        { selector: '.contact-info', class: 'slide-in-left' },
        { selector: '.contact-form', class: 'slide-in-right' }
    ];
    
    elementsToAnimate.forEach(item => {
        document.querySelectorAll(item.selector).forEach((element, index) => {
            element.classList.add(item.class);
            element.style.transitionDelay = (index * 0.1) + 's';
        });
    });
    
    // Initial check for visible elements
    setTimeout(() => {
        revealOnScroll();
        animateSkillBars();
    }, 100);
}

// Run animations when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAnimations);
// Fallback for when DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    initializeAnimations();
}

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        revealOnScroll();
        animateSkillBars();
    }, 10);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter egg: Konami code
let konamiCode = '';
const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';

document.addEventListener('keydown', (e) => {
    konamiCode += e.code;
    
    if (konamiSequence.indexOf(konamiCode) !== 0) {
        konamiCode = '';
    }
    
    if (konamiCode === konamiSequence) {
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s ease';
        setTimeout(() => {
            document.body.style.transform = '';
            alert('🎉 You found the secret! Thanks for exploring!');
        }, 2000);
        konamiCode = '';
    }
});
// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const currentYearSpan = document.getElementById('currentYear');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    setupScrollAnimations();
    setCurrentYear();
});

// Initialize website functionality
function initializeWebsite() {
    // Add smooth scrolling for all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Contact form submission
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Form input validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

// Handle scroll effects
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Header background change
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Trigger scroll animations
    triggerScrollAnimations();
}

// Toggle mobile menu
function toggleMobileMenu() {
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
        mobileNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    } else {
        mobileNav.classList.add('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards and other elements
    const animatedElements = document.querySelectorAll('.feature-card, .why-us-card, .contact-card, .contact-form-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Trigger scroll animations
function triggerScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .why-us-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Form validation functions
function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!fieldValue) {
                errorMessage = 'Name is required';
                isValid = false;
            } else if (fieldValue.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!fieldValue) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(fieldValue)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = fieldValue.replace(/[\s\-\(\)]/g, '');
            if (!fieldValue) {
                errorMessage = 'Phone number is required';
                isValid = false;
            } else if (!phoneRegex.test(cleanPhone)) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!fieldValue) {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (fieldValue.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = document.getElementById(field.name + 'Error');
    
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error');
    
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validate all fields
    const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;
    
    formInputs.forEach(input => {
        const fieldEvent = { target: input };
        if (!validateField(fieldEvent)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showFormMessage('Please correct the errors above.', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: sanitizeInput(formData.get('name')),
        email: sanitizeInput(formData.get('email')),
        phone: sanitizeInput(formData.get('phone')),
        company: sanitizeInput(formData.get('company')),
        message: sanitizeInput(formData.get('message')),
        timestamp: new Date().toISOString(),
        id: Date.now()
    };
    
    // Show loading state
    setSubmitButtonLoading(true);
    hideFormMessage();
    
    try {
        // Simulate API call (replace with actual API endpoint)
        await simulateFormSubmission(data);
        
        // Store data locally for demonstration
        storeFormSubmission(data);
        
        // Show success message
        showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Failed to send message. Please try again.', 'error');
    } finally {
        setSubmitButtonLoading(false);
    }
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/[<>]/g, '')
        .trim();
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure for demo
            if (Math.random() > 0.1) { // 90% success rate
                resolve(data);
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

// Store form submission locally
function storeFormSubmission(data) {
    try {
        const existingData = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        existingData.push(data);
        localStorage.setItem('contactSubmissions', JSON.stringify(existingData));
        
        console.log('Form submission stored:', data);
    } catch (error) {
        console.error('Error storing form submission:', error);
    }
}

// Show form message
function showFormMessage(message, type) {
    formMessage.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'flex';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            hideFormMessage();
        }, 5000);
    }
}

// Hide form message
function hideFormMessage() {
    formMessage.style.display = 'none';
}

// Set submit button loading state
function setSubmitButtonLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            SENDING MESSAGE...
        `;
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <i class="fas fa-paper-plane"></i>
            SEND MESSAGE
        `;
    }
}

// Set current year in footer
function setCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedHandleScroll = debounce(handleScroll, 10);
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', debouncedHandleScroll);

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card,
    .why-us-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Security: Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Console message for developers
console.log('%cManogna Piragold India Pvt. Ltd.', 'color: #0f766e; font-size: 24px; font-weight: bold;');
console.log('%cQuality is our Mantra', 'color: #6b7280; font-size: 16px;');
console.log('Website developed with modern web technologies for optimal performance and security.');

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeInput,
        validateField,
        scrollToSection
    };
}
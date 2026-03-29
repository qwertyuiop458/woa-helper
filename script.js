// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const optionCards = document.querySelectorAll('.option-card');
const generateBtns = document.querySelectorAll('.generate-btn');
const generationStatus = document.getElementById('generationStatus');
const resultSection = document.getElementById('resultSection');
const generatedImage = document.getElementById('generatedImage');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const newImageBtn = document.getElementById('newImageBtn');

// Smooth scrolling for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Option card selection
optionCards.forEach(card => {
    card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// Generate button functionality
generateBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const type = btn.getAttribute('data-type');
        await generateImage(type);
    });
});

// Generate image function
async function generateImage(type) {
    try {
        // Show generation status
        generationStatus.style.display = 'block';
        resultSection.style.display = 'none';
        
        // Scroll to generation status
        generationStatus.scrollIntoView({ behavior: 'smooth' });
        
        // Simulate generation process
        await simulateGeneration(type);
        
        // Show result
        generationStatus.style.display = 'none';
        resultSection.style.display = 'block';
        
        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error generating image:', error);
        showError('Произошла ошибка при создании изображения. Попробуйте еще раз.');
    }
}

// Simulate generation process
async function simulateGeneration(type) {
    return new Promise((resolve) => {
        const steps = [
            'Создание текстуры старой бумаги...',
            'Рисование анатомической фигуры...',
            'Добавление элементов эпохи Возрождения...',
            'Применение эффектов старения...',
            'Финальная обработка...'
        ];
        
        let currentStep = 0;
        const statusText = generationStatus.querySelector('p');
        
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                statusText.textContent = steps[currentStep];
                currentStep++;
            } else {
                clearInterval(interval);
                
                // Set the appropriate image based on type
                if (type === 'basic') {
                    generatedImage.src = 'renaissance_anatomy_study.png';
                } else {
                    generatedImage.src = 'advanced_renaissance_anatomy.png';
                }
                
                resolve();
            }
        }, 1000);
    });
}

// Download functionality
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = generatedImage.src;
    link.download = `renaissance_anatomy_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccess('Изображение успешно скачано!');
});

// Share functionality
shareBtn.addEventListener('click', async () => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: 'Мое анатомическое исследование эпохи Возрождения',
                text: 'Создано с помощью Renaissance Anatomy Generator',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            await copyToClipboard(window.location.href);
            showSuccess('Ссылка скопирована в буфер обмена!');
        }
    } catch (error) {
        console.error('Error sharing:', error);
        showError('Ошибка при попытке поделиться');
    }
});

// New image button
newImageBtn.addEventListener('click', () => {
    resultSection.style.display = 'none';
    document.querySelector('#generator').scrollIntoView({ behavior: 'smooth' });
});

// Copy to clipboard utility
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Show success message
function showSuccess(message) {
    showNotification(message, 'success');
}

// Show error message
function showError(message) {
    showNotification(message, 'error');
}

// Show notification
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.option-card, .gallery-item, .feature');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Add loading animation to buttons
generateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Создание...';
        btn.disabled = true;
        
        // Reset button after generation
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 5000);
    });
});

// Add hover effects to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to generate image
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeCard = document.querySelector('.option-card.active');
        if (activeCard) {
            const generateBtn = activeCard.querySelector('.generate-btn');
            if (generateBtn) {
                generateBtn.click();
            }
        }
    }
    
    // Escape to close notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
});

// Add service worker for offline functionality (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add analytics tracking (if needed)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics or other analytics service
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Track generation events
    if (eventName === 'image_generated') {
        trackEvent('generator_used', {
            type: eventData.type,
            timestamp: new Date().toISOString()
        });
    }
}

// Export functions for external use
window.RenaissanceAnatomyGenerator = {
    generateImage,
    showSuccess,
    showError,
    trackEvent
};
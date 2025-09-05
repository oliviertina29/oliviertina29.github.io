// Fonction principale d'initialisation
function initializeAll() {
    console.log('Initializing all functions');
    
    setupSmoothScrolling();
    setupHeaderAnimation();
    setupContactForm();
    animateSections();
    animateSkills();
    handleSkillTooltip();
    handleCertificateDisplay();
    animateExperiences();
    animateHeaderText();
    setupParticles();
    animateOnScroll();
    animateLanguageBars();
    setupMoreButton();
}

// Gestion de l'affichage de la nouvelle section
function setupMoreButton() {
    const moreBtn = document.getElementById('moreBtn');
    const moreSection = document.getElementById('more-about-me');

    if (moreBtn && moreSection) {
        moreBtn.addEventListener('click', function() {
            moreSection.classList.toggle('hidden');
            moreBtn.textContent = moreSection.classList.contains('hidden') ? 'More About Me' : 'Less About Me';
        });
    }
}

// Fonction pour animer les barres de langues
function animateLanguageBars() {
    const languageBars = document.querySelectorAll('.language-item .bg-blue-500, .language-item .bg-green-500');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    languageBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
        observer.observe(bar);
    });
}

// Fonction pour animer les éléments au défilement 
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-fadeIn, .animate-slideInFromRight');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}
// Configuration du défilement fluide
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Configuration de l'animation de l'en-tête
function setupHeaderAnimation() {
    let header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('bg-opacity-90', 'backdrop-blur-sm');
        } else {
            header.classList.remove('bg-opacity-90', 'backdrop-blur-sm');
        }
    });
}

// Configuration du formulaire de contact
function setupContactForm() {
    let contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// Gestion de la soumission du formulaire de contact
function handleContactFormSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    
    fetch(e.target.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            e.target.reset();
        } else {
            throw new Error('Network error');
        }
    }).catch(error => {
        alert('Oops! An error occurred. Please try again later.');
    });
}

// Animation des sections
function animateSections() {
    const sections = document.querySelectorAll('main section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
    
        observer.observe(section);
    });
}

// Animation des compétences
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.color = '#00ffff'; // Cyan
            item.classList.add('neon-glow');
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.color = ''; // Retour à la couleur par défaut
            item.classList.remove('neon-glow');
        });
    });
}

// Création d'une infobulle de compétence
function createSkillTooltip(skill) {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip bg-blue-600 text-white p-2 rounded absolute hidden';
    tooltip.textContent = `Skill: ${skill}`;
    document.body.appendChild(tooltip);
    return tooltip;
}

// Gestion de l'affichage des infobulles de compétences
function handleSkillTooltip() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const tooltip = createSkillTooltip(item.dataset.skill);
        item.addEventListener('mouseenter', (e) => {
            const rect = item.getBoundingClientRect();
            tooltip.style.left = `${rect.right + 10}px`;
            tooltip.style.top = `${rect.top}px`;
            tooltip.classList.remove('hidden');
        });
        item.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        });
    });
}

// Gestion de l'affichage des certificats
function handleCertificateDisplay() {
    const modal = document.getElementById('certModal');
    const certViewer = document.getElementById('certViewer');
    const closeModal = document.getElementById('closeModal');
    const viewButtons = document.querySelectorAll('.view-cert');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const certPath = button.getAttribute('data-cert');
            certViewer.src = certPath;
            modal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        certViewer.src = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            certViewer.src = '';
        }
    });
}

// Animation des expériences
function animateExperiences() {
    const experiences = document.querySelectorAll('#experiences .right-timeline, #experiences .left-timeline');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    experiences.forEach(exp => {
        observer.observe(exp);
    });
}

// Animation du texte de l'en-tête
function animateHeaderText() {
    typeWriter('name', 100);
    setTimeout(() => typeWriter('title', 50), 2000);
    setTimeout(() => typeWriter('quote', 75), 4000);
}

// Fonction pour animer le texte lettre par lettre
function typeWriter(elementId, speed = 100) {
    const element = document.getElementById(elementId);
    const text = element.getAttribute('data-text');
    element.innerHTML = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Configuration des particules
function setupParticles() {
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded');
    });
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', initializeAll);
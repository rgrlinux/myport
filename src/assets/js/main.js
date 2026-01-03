
/* Base */
import '../css/base/variables.css';
import '../css/base/reset.css';
import '../css/base/base.css';
import '../css/base/typography.css';
import '../css/base/utilities.css';

/* Components */
import '../css/components/buttons.css';
import '../css/components/cards.css';

/* Layout */
import '../css/layout/header.css';
import '../css/layout/footer.css';

/* Sections */
import '../css/sections/hero.css';
import '../css/sections/about.css';
import '../css/sections/common.css';

// ==========================================================================
// MODERN CSS LANDING PAGE - MAIN JAVASCRIPT
// ==========================================================================

// Configurações
const CONFIG = {
    header: {
        height: 80,
        scrolledClass: 'scrolled',
        scrollThreshold: 100
    },
    scroll: {
        behavior: 'smooth',
        offset: 0
    },
    observer: {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    }
};

// Estado da aplicação
const state = {
    currentSection: 'home',
    isMobileMenuOpen: false,
    isLanguageMenuOpen: false,
    scrollPosition: 0,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// Elementos DOM
const elements = {
    header: document.querySelector('.header'),
    navToggle: document.querySelector('.nav__toggle'),
    navMenu: document.querySelector('.nav__menu'),
    languageToggle: document.querySelector('.language-btn'),
    languageMenu: document.querySelector('.language-menu'),
    navLinks: document.querySelectorAll('.nav__link'),
    scrollUpBtn: document.querySelector('.scroll-btn--up'),
    scrollDownBtn: document.querySelector('.scroll-btn--down'),
    sections: document.querySelectorAll('section[id]'),
    skipLink: document.querySelector('.skip-link')
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================

function init() {
    console.log('🚀 Modern CSS Landing Page iniciada');
    
    // Configurar eventos
    setupEventListeners();
    
    // Configurar observadores
    setupObservers();
    
    // Configurar acessibilidade
    setupAccessibility();
    
    // Atualizar estado inicial
    updateScrollState();
    updateActiveSection();
    
    // Ativar scroll buttons se necessário
    toggleScrollButtons();
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

function setupEventListeners() {
    // Scroll events
    window.addEventListener('scroll', debounce(handleScroll, 100));
    
    // Mobile menu
    if (elements.navToggle && elements.navMenu) {
        elements.navToggle.addEventListener('click', toggleMobileMenu);
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!elements.navToggle.contains(e.target) && 
                !elements.navMenu.contains(e.target) && 
                state.isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
        
        // Fechar menu ao clicar em link
        elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (state.isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });
        });
    }
    
    // Language selector
    if (elements.languageToggle && elements.languageMenu) {
        elements.languageToggle.addEventListener('click', toggleLanguageMenu);
        
        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!elements.languageToggle.contains(e.target) && 
                !elements.languageMenu.contains(e.target) && 
                state.isLanguageMenuOpen) {
                closeLanguageMenu();
            }
        });
        
        // Selecionar idioma
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                selectLanguage(lang);
                closeLanguageMenu();
            });
        });
    }
    
    // Scroll buttons
    if (elements.scrollUpBtn) {
        elements.scrollUpBtn.addEventListener('click', scrollToTop);
    }
    
    if (elements.scrollDownBtn) {
        elements.scrollDownBtn.addEventListener('click', scrollToNextSection);
    }
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleInternalLinkClick);
    });
    
    // Skip link
    if (elements.skipLink) {
        elements.skipLink.addEventListener('click', handleSkipLinkClick);
    }
    
    // Resize
    window.addEventListener('resize', debounce(handleResize, 250));
}

// ==========================================================================
// SCROLL HANDLING
// ==========================================================================

function handleScroll() {
    updateScrollState();
    updateActiveSection();
    toggleScrollButtons();
}

function updateScrollState() {
    state.scrollPosition = window.scrollY;
    
    // Header scroll effect
    if (elements.header) {
        if (state.scrollPosition > CONFIG.header.scrollThreshold) {
            elements.header.classList.add(CONFIG.header.scrolledClass);
        } else {
            elements.header.classList.remove(CONFIG.header.scrolledClass);
        }
    }
}

function updateActiveSection() {
    let current = 'home';
    const scrollPosition = state.scrollPosition + CONFIG.header.height + 100;
    
    elements.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight) {
            current = section.id;
        }
    });
    
    if (current !== state.currentSection) {
        state.currentSection = current;
        updateActiveNavLink();
    }
}

function updateActiveNavLink() {
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === state.currentSection) {
            link.classList.add('active');
        }
    });
}

function toggleScrollButtons() {
    const isAtTop = state.scrollPosition < 100;
    const isAtBottom = 
        window.innerHeight + state.scrollPosition >= 
        document.body.offsetHeight - 100;
    
    if (elements.scrollUpBtn) {
        if (isAtTop) {
            elements.scrollUpBtn.classList.remove('visible');
        } else {
            elements.scrollUpBtn.classList.add('visible');
        }
    }
    
    if (elements.scrollDownBtn) {
        if (isAtBottom) {
            elements.scrollDownBtn.classList.remove('visible');
        } else {
            elements.scrollDownBtn.classList.add('visible');
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: state.prefersReducedMotion ? 'auto' : CONFIG.scroll.behavior
    });
}

function scrollToNextSection() {
    const sections = Array.from(elements.sections);
    const currentIndex = sections.findIndex(
        section => section.id === state.currentSection
    );
    
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        const scrollTo = nextSection.offsetTop - CONFIG.header.height;
        
        window.scrollTo({
            top: scrollTo,
            behavior: state.prefersReducedMotion ? 'auto' : CONFIG.scroll.behavior
        });
    } else {
        scrollToTop();
    }
}

// ==========================================================================
// MENU HANDLING
// ==========================================================================

function toggleMobileMenu() {
    if (state.isMobileMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    state.isMobileMenuOpen = true;
    elements.navToggle.setAttribute('aria-expanded', 'true');
    elements.navMenu.setAttribute('aria-hidden', 'false');
}

function closeMobileMenu() {
    state.isMobileMenuOpen = false;
    elements.navToggle.setAttribute('aria-expanded', 'false');
    elements.navMenu.setAttribute('aria-hidden', 'true');
}

function toggleLanguageMenu() {
    if (state.isLanguageMenuOpen) {
        closeLanguageMenu();
    } else {
        openLanguageMenu();
    }
}

function openLanguageMenu() {
    state.isLanguageMenuOpen = true;
    elements.languageToggle.setAttribute('aria-expanded', 'true');
    elements.languageMenu.setAttribute('aria-hidden', 'false');
}

function closeLanguageMenu() {
    state.isLanguageMenuOpen = false;
    elements.languageToggle.setAttribute('aria-expanded', 'false');
    elements.languageMenu.setAttribute('aria-hidden', 'true');
}

function selectLanguage(lang) {
    console.log('🌐 Idioma selecionado:', lang);
    // Aqui você implementaria a mudança de idioma
    // Por enquanto, apenas atualiza o botão
    const flag = lang === 'pt' ? '🇧🇷' : lang === 'en' ? '🇺🇸' : '🇪🇸';
    const code = lang.toUpperCase();
    
    if (elements.languageToggle) {
        elements.languageToggle.querySelector('.language-flag').textContent = flag;
        elements.languageToggle.querySelector('.language-code').textContent = code;
    }
}

// ==========================================================================
// LINK HANDLING
// ==========================================================================

function handleInternalLinkClick(e) {
    e.preventDefault();
    
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const targetElement = document.querySelector(href);
    if (!targetElement) return;
    
    const scrollTo = targetElement.offsetTop - CONFIG.header.height;
    
    window.scrollTo({
        top: scrollTo,
        behavior: state.prefersReducedMotion ? 'auto' : CONFIG.scroll.behavior
    });
    
    // Atualizar URL sem recarregar a página
    history.pushState(null, null, href);
}

function handleSkipLinkClick(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        
        // Remover tabindex após o foco
        setTimeout(() => {
            target.removeAttribute('tabindex');
        }, 1000);
    }
}

// ==========================================================================
// OBSERVERS
// ==========================================================================

function setupObservers() {
    // Intersection Observer para animações
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        },
        {
            threshold: CONFIG.observer.threshold,
            rootMargin: CONFIG.observer.rootMargin
        }
    );
    
    // Observar elementos para fade-in
    document.querySelectorAll('.feature-card, .service, .cta-card').forEach(el => {
        fadeObserver.observe(el);
    });
}

// ==========================================================================
// ACCESSIBILITY
// ==========================================================================

function setupAccessibility() {
    // Adicionar atributos ARIA
    if (elements.navToggle) {
        elements.navToggle.setAttribute('aria-controls', 'nav-menu');
        elements.navToggle.setAttribute('aria-expanded', 'false');
    }
    
    if (elements.navMenu) {
        elements.navMenu.setAttribute('aria-hidden', 'true');
    }
    
    if (elements.languageToggle) {
        elements.languageToggle.setAttribute('aria-controls', 'language-menu');
        elements.languageToggle.setAttribute('aria-expanded', 'false');
    }
    
    if (elements.languageMenu) {
        elements.languageMenu.setAttribute('aria-hidden', 'true');
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Fechar menus com Escape
        if (e.key === 'Escape') {
            if (state.isMobileMenuOpen) closeMobileMenu();
            if (state.isLanguageMenuOpen) closeLanguageMenu();
        }
        
        // Navegação por tab no menu mobile
        if (state.isMobileMenuOpen && e.key === 'Tab') {
            const focusableElements = elements.navMenu.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            
            if (e.shiftKey && document.activeElement === focusableElements[0]) {
                e.preventDefault();
                elements.navToggle.focus();
            } else if (!e.shiftKey && 
                      document.activeElement === focusableElements[focusableElements.length - 1]) {
                e.preventDefault();
                elements.navToggle.focus();
            }
        }
    });
}

// ==========================================================================
// UTILITIES
// ==========================================================================

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

function handleResize() {
    // Fechar menu mobile em telas grandes
    if (window.innerWidth >= 768 && state.isMobileMenuOpen) {
        closeMobileMenu();
    }
    
    // Fechar menu de idioma se estiver aberto
    if (state.isLanguageMenuOpen) {
        closeLanguageMenu();
    }
}

// ==========================================================================
// START APPLICATION
// ==========================================================================

// Esperar o DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exportar para debug (opcional)
window.App = {
    state,
    elements,
    toggleMobileMenu,
    scrollToTop
};

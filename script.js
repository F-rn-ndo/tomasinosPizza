/* =================================
   TOMASINOS - ARCHIVO JAVASCRIPT
   Pizzería - Nuevo León, México
   ================================= */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funciones
    initializeMobileMenu();
    initializeScrollEffects();
    initializeAnimations();
    initializeNavigation();
    
    console.log('Tomasinos Website - JavaScript cargado correctamente');
});

/* =================================
   MENÚ MÓVIL
   ================================= */

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Verificar que los elementos existan
    if (!mobileMenuBtn || !navMenu) {
        console.log('Elementos del menú móvil no encontrados');
        return;
    }
    
    // Toggle del menú móvil
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animación del botón hamburguesa
        const hamburgerLines = mobileMenuBtn.querySelectorAll('.hamburger-line');
        mobileMenuBtn.classList.toggle('active');
        
        // Cambiar las líneas del hamburger a X
        if (navMenu.classList.contains('active')) {
            hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgerLines[1].style.opacity = '0';
            hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburgerLines[0].style.transform = 'none';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'none';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Resetear botón hamburguesa
            const hamburgerLines = mobileMenuBtn.querySelectorAll('.hamburger-line');
            hamburgerLines[0].style.transform = 'none';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'none';
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnButton && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Resetear botón hamburguesa
            const hamburgerLines = mobileMenuBtn.querySelectorAll('.hamburger-line');
            hamburgerLines[0].style.transform = 'none';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'none';
        }
    });
}

/* =================================
   EFECTOS DE SCROLL
   ================================= */

function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    if (!header) {
        console.log('Header no encontrado');
        return;
    }
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Cambiar estilo del header al hacer scroll
        if (scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
        
        // Efecto parallax en el hero (solo en la página principal)
        const hero = document.querySelector('.hero');
        if (hero && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            const parallaxSpeed = 0.5;
            const yPos = scrollY * parallaxSpeed;
            hero.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    // Smooth scroll para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* =================================
   ANIMACIONES DE ENTRADA
   ================================= */

function initializeAnimations() {
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1, // Activar cuando 10% del elemento sea visible
        rootMargin: '0px 0px -50px 0px' // Activar un poco antes
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos con animación
    const animatedElements = document.querySelectorAll('.feature-card, .pizza-card, .menu-item');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Animación de contador (si hay números)
    animateCounters();
}

/* =================================
   NAVEGACIÓN ACTIVA
   ================================= */

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Marcar enlace activo basado en la página actual
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* =================================
   FUNCIONES AUXILIARES
   ================================= */

// Animación de contadores
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const speed = 200; // Velocidad de la animación
        
        const updateCount = () => {
            const current = parseInt(counter.textContent);
            const increment = target / speed;
            
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar animación cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y remover notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para validar formularios (para uso futuro)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
        
        // Validación específica para email
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#f44336';
                isValid = false;
            }
        }
        
        // Validación específica para teléfono
        if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^[\d\-\+\(\)\s]+$/;
            if (!phoneRegex.test(input.value)) {
                input.style.borderColor = '#f44336';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Función para cargar contenido dinámicamente (para uso futuro)
function loadContent(url, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Mostrar loader
    container.innerHTML = '<div class="loader">Cargando...</div>';
    
    fetch(url)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            // Re-inicializar animaciones para el nuevo contenido
            initializeAnimations();
        })
        .catch(error => {
            console.error('Error cargando contenido:', error);
            container.innerHTML = '<p>Error cargando el contenido. Por favor, recarga la página.</p>';
        });
}

// Función para optimizar imágenes lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para manejar errores globales
window.addEventListener('error', function(event) {
    console.error('Error en el sitio web:', event.error);
    
    // En producción, aquí podrías enviar el error a un servicio de logging
    // sendErrorToLoggingService(event.error);
});

// Función para mejorar la accesibilidad
function initializeAccessibility() {
    // Agregar navegación por teclado para elementos personalizados
    const customButtons = document.querySelectorAll('.cta-btn, .btn-small, .whatsapp-float');
    
    customButtons.forEach(button => {
        // Hacer elementos focusables
        if (!button.hasAttribute('tabindex')) {
            button.setAttribute('tabindex', '0');
        }
        
        // Agregar soporte para Enter y Espacio
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                button.click();
            }
        });
    });
    
    // Anunciar cambios dinámicos para lectores de pantalla
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    
    // Función global para anunciar cambios
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Inicializar características adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializeAccessibility();
});

/* =================================
   UTILIDADES DE RENDIMIENTO
   ================================= */

// Throttle function para optimizar eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function para optimizar eventos de resize
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimizar eventos de scroll con throttle
window.addEventListener('scroll', throttle(function() {
    // Aquí van las funciones optimizadas de scroll
    initializeScrollEffects();
}, 16)); // ~60fps

// Optimizar eventos de resize con debounce
window.addEventListener('resize', debounce(function() {
    // Recalcular dimensiones si es necesario
    console.log('Ventana redimensionada');
}, 250));

console.log('🍕 Tomasinos - Sistema JavaScript inicializado correctamente');
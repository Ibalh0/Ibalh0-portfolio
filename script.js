document.addEventListener('DOMContentLoaded', () => {
    const pfp = document.getElementById('pfp');
    const emojiContainer = document.getElementById('emoji-container');
    const skillBars = document.querySelectorAll('.bar div');
    const statsValues = document.querySelectorAll('.stat-value');
    const sections = document.querySelectorAll('section');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalEmojis = document.getElementById('modal-emojis');
    const closeModal = document.querySelector('.close-modal');

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor', 'cursor-plus');
    cursor.innerHTML = '+';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .view-details');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.mixBlendMode = 'normal';
            cursor.style.backgroundColor = '#ff69b4';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.mixBlendMode = 'difference';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
            opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });

    pfp.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createEmoji();
            }, i * 100);
        }
    });

    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = '👋';
        
        const rect = pfp.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        emoji.style.left = `${centerX}px`;
        emoji.style.top = `${centerY}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;
        
        emojiContainer.appendChild(emoji);

        setTimeout(() => {
            emoji.style.opacity = '1';
            emoji.style.transform = `translate(${targetX - centerX}px, ${targetY - centerY}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`;
        }, 50);

        setTimeout(() => {
            emoji.remove();
        }, 1000);
    }

    function animateSkillBars() {
        const skillPercentages = {
            'python': 69,
            'javascript': 81,
            'html': 91,
            'css': 96,
            'uiux': 88,
            'database': 89,
            'typescript': 78,
            'lua': 69
        };

        skillBars.forEach(bar => {
            const skillName = bar.className;
            const percent = skillPercentages[skillName];
            const percentElement = bar.parentElement.previousElementSibling.querySelector('.percent');
            
            let currentWidth = 0;
            const duration = 2000; 
            const interval = 20; 
            const steps = duration / interval;
            const increment = percent / steps;

            const animation = setInterval(() => {
                currentWidth += increment;
                if (currentWidth >= percent) {
                    currentWidth = percent;
                    clearInterval(animation);
                }
                bar.style.width = `${currentWidth}%`;
                percentElement.textContent = `${Math.round(currentWidth)}%`;
            }, interval);
        });
    }

    function animateStats() {
        statsValues.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-value'));
            let currentValue = 0;
            const duration = 3000;
            const interval = 50;
            
            const steps = duration / interval;
            const increment = targetValue / steps;

            const animation = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(animation);
                }
                stat.textContent = Math.floor(currentValue).toLocaleString();
                if (stat.id === 'lines-written' || stat.id === 'errors-in-code') {
                    stat.textContent += '+';
                }
            }, interval);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                } else if (entry.target.id === 'stats') {
                    animateStats();
                }
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    document.getElementById('projects-started').setAttribute('data-value', '39');
    document.getElementById('projects-finished').setAttribute('data-value', '16');
    document.getElementById('lines-written').setAttribute('data-value', '345694');
    document.getElementById('errors-in-code').setAttribute('data-value', '872');

    projectCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                const emojis = ['🚀', '💻', '🎨', '🔧'];

                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modalEmojis.innerHTML = emojis.join(' ');

                modal.classList.add('show');
            });
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    const uiShowcase = document.getElementById('ui-showcase');
    const uiGrid = uiShowcase.querySelector('.ui-grid');
    const revealBtn = document.createElement('button');
    revealBtn.textContent = 'Click to Reveal';
    revealBtn.classList.add('view-details');
    uiShowcase.insertBefore(revealBtn, uiGrid);

    uiGrid.style.filter = 'blur(10px)';
    uiGrid.style.transition = 'filter 0.5s ease';

    revealBtn.addEventListener('click', () => {
        uiGrid.style.filter = 'blur(0)';
        revealBtn.style.display = 'none';
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});
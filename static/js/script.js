document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const htmlElement = document.documentElement;

    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    });

    

    // Fade-in animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Fetch Stats
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            animateValue('stat-commits', 0, parseInt(data.commits) || 100, 1500, String(data.commits).includes('+') ? '+' : '');
            animateValue('stat-repos', 0, parseInt(data.repositories) || 0, 1500, '');
            document.getElementById('stat-loc').textContent = data.lines_of_code;
            animateValue('stat-days', 0, parseInt(data.active_days) || 0, 1500, '');
        })
        .catch(error => {
            console.error('Error fetching stats:', error);
            // Fallbacks in case fetch fails
            document.getElementById('stat-commits').textContent = "342";
            document.getElementById('stat-repos').textContent = "12";
            document.getElementById('stat-loc').textContent = "15k+";
            document.getElementById('stat-days').textContent = "180";
        });

    function animateValue(id, start, end, duration, suffix = '') {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Mobile Menu Toggle
    const navLinks = document.querySelector('.nav-links');
    const navLogo = document.querySelector('.nav-logo');
    
    // Add mobile menu button dynamically
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle Menu');
    document.querySelector('.nav-content').insertBefore(mobileMenuBtn, themeToggleBtn);

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });

    // Discord Copy to Clipboard
    const discordCopy = document.getElementById('discord-copy');
    if (discordCopy) {
        discordCopy.addEventListener('click', () => {
            const username = "farahtanveer_95966";
            navigator.clipboard.writeText(username).then(() => {
                const originalText = discordCopy.textContent;
                discordCopy.textContent = "Copied!";
                discordCopy.style.color = "var(--accent-color)";
                setTimeout(() => {
                    discordCopy.textContent = originalText;
                    discordCopy.style.color = "";
                }, 2000);
            });
        });
    }
    // Project Modal Logic
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalProblem = document.getElementById('modal-problem');
    const modalApproach = document.getElementById('modal-approach');
    const modalOutcome = document.getElementById('modal-outcome');
    const closeModal = document.querySelector('.close-modal');

    if (modal) {
        document.querySelectorAll('.open-modal').forEach(button => {
            button.addEventListener('click', () => {
                const title = button.getAttribute('data-title');
                const problem = button.getAttribute('data-problem');
                const approach = button.getAttribute('data-approach');
                const outcome = button.getAttribute('data-outcome');

                modalTitle.textContent = title;
                modalProblem.textContent = problem;
                modalApproach.textContent = approach;
                modalOutcome.textContent = outcome;

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; 
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    const discordHeroBtn = document.getElementById('discord-hero-btn');
    if (discordHeroBtn) {
        discordHeroBtn.addEventListener('click', () => {
            const username = "farahtanveer_95966";
            navigator.clipboard.writeText(username).then(() => {
                const originalHtml = discordHeroBtn.innerHTML;
                discordHeroBtn.innerHTML = '<span style="font-size: 0.6rem; font-weight: bold; color: var(--accent-color);">COPIED</span>';
                setTimeout(() => {
                    discordHeroBtn.innerHTML = originalHtml;
                }, 2000);
            });
        });
    }
});

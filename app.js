// Basic interactive behaviors for the one-page site

document.addEventListener('DOMContentLoaded', function() {
    // set year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.main-nav ul');
    navToggle && navToggle.addEventListener('click', () => {
        if (navList.style.display === 'flex') {
            navList.style.display = 'none';
        } else {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'column';
            navList.style.background = 'rgba(0,0,0,.95)';
            navList.style.padding = '12px';
            navList.style.position = 'absolute';
            navList.style.right = '18px';
            navList.style.top = '64px';
            navList.style.borderRadius = '8px';
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // hide mobile menu after click (if open)
                if (window.innerWidth < 760 && navList) navList.style.display = 'none';
            }
        });
    });

    // Newsletter submit (client-side demo)
    const nlForm = document.getElementById('newsletter-form');
    const nlMsg = document.getElementById('newsletter-msg');
    nlForm && nlForm.addEventListener('submit', function(e) {
        e.preventDefault();
        nlMsg.textContent = 'Thanks — subscription received. You will get our next update via email.';
        nlForm.reset();
    });

    // Donation form (demo)
    const donationForm = document.getElementById('donation-form');
    const donationMsg = document.getElementById('donation-msg');
    donationForm && donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        donationMsg.textContent = 'Thank you! We received your donation request. Our team will contact you.';
        donationForm.reset();
    });
    // Simulate donate success
    const donateSim = document.getElementById('donate-sim');
    donateSim && donateSim.addEventListener('click', () => {
        donationMsg.textContent = 'Simulated payment success ✅ — Thank you for supporting WAKU.';
    });

    // Contact form (demo)
    const contactForm = document.getElementById('contact-form');
    const contactMsg = document.getElementById('contact-msg');
    contactForm && contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        contactMsg.textContent = 'Message sent — we will get back to you within 48 hours.';
        contactForm.reset();
    });

    // Live chat toggle
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close');
    const chatForm = document.getElementById('chat-form');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            if (chatBox.style.display === 'block') {
                chatBox.style.display = 'none';
            } else {
                chatBox.style.display = 'block';
                chatBox.setAttribute('aria-hidden', 'false');
            }
        });
    }
    chatClose && chatClose.addEventListener('click', () => {
        chatBox.style.display = 'none';
        chatBox.setAttribute('aria-hidden', 'true');
    });

    // Chat form (simple echo)
    chatForm && chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;
        appendChat('user', msg);
        chatInput.value = '';
        // simple bot reply after delay
        setTimeout(() => {
            appendChat('bot', 'Thanks! A member of our team will follow up. Meanwhile please check the donate or contact sections.');
        }, 900);
    });

    function appendChat(type, text) {
        const div = document.createElement('div');
        div.className = 'message ' + (type === 'bot' ? 'bot' : 'user');
        div.textContent = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Basic reveal animation on scroll
    const revealEls = document.querySelectorAll('.card, .blog-item, .action, .report-left, .about-text');
    const obsOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'none';
            }
        });
    }, obsOptions);
    revealEls.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(14px)';
        el.style.transition = 'all .6s ease';
        observer.observe(el);
    });

});
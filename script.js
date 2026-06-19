// --- Navigation Scroll Effect ---
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Scroll Reveal Animation ---
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();


// --- Canvas Background Animation (Elegant Waves) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let lines = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initLines();
}

function initLines() {
    lines = [];
    const numberOfLines = 15;
    for (let i = 0; i < numberOfLines; i++) {
        lines.push({
            yOffset: (height / numberOfLines) * i,
            amplitude: 40 + Math.random() * 40,
            frequency: 0.001 + Math.random() * 0.002,
            phase: Math.random() * Math.PI * 2,
            speed: 0.005 + Math.random() * 0.005
        });
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.lineWidth = 1;
    // Elegant silver/white stroke
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    
    lines.forEach(line => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
            // A sine wave with varying amplitude
            const y = line.yOffset + 
                      Math.sin(x * line.frequency + line.phase) * line.amplitude +
                      Math.sin(x * line.frequency * 2 + line.phase * 0.5) * (line.amplitude * 0.5);
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Advance phase for movement
        line.phase += line.speed;
    });

    requestAnimationFrame(animateCanvas);
}

window.addEventListener('resize', resize);
resize();
animateCanvas();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

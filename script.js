const btn = document.getElementById('button');
const sectionAll = document.querySelectorAll('section[id]');
const inputName = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');


/* ===== Loader =====*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})

/*===== Header =====*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('abajo', window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('not-active');
        document.querySelector('.nav_menu').classList.remove('active');
        document.querySelector('.nav_menu').classList.add('not-active');
    }
    else {
        this.classList.add('active');
        this.classList.remove('not-active');
        document.querySelector('.nav_menu').classList.remove('not-active');
        document.querySelector('.nav_menu').classList.add('active');
    }
});

/*===== Cambio de idioma =====*/
const changeLanguage = async language => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for(const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }
}

flagsElement.addEventListener('click', (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
})

/*===== class active por secciones =====*/
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sectionAll.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
        }
        else {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

// Control de Scroll
let lastScroll = 0;
const scrollThreshold = 100;
const floatButtons = document.querySelector('.float-buttons');
const goTopContainer = document.querySelector('.go-top-container');

window.onscroll = function() {
    const currentScroll = document.documentElement.scrollTop;
    
    // Control de aparición
    if (currentScroll > scrollThreshold) {
        floatButtons.classList.add('visible');
        goTopContainer.classList.add('show');
    } else {
        floatButtons.classList.remove('visible');
        goTopContainer.classList.remove('show');
    }
    
    // Control de animación smooth
    const scrollDiff = currentScroll - lastScroll;
    if (Math.abs(scrollDiff) > 50) {
        floatButtons.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
        floatButtons.style.transition = 'all 0.3s ease';
    }
    lastScroll = currentScroll;
}

// Animación WhatsApp
document.querySelector('.whatsapp-float').addEventListener('click', function(e) {
    e.preventDefault();
    const particles = this.querySelector('.particles');
    const originalPosition = window.scrollY;
    
    // Bloquear scroll durante animación
    document.documentElement.style.overflow = 'hidden';
    
    // Animación explosión
    particles.style.animation = 'explode 0.6s ease-out forwards';
    
    // Redirección después de 1s
    setTimeout(() => {
        window.open(this.href, '_blank');
        particles.style.animation = '';
        document.documentElement.style.overflow = '';
        window.scrollTo(0, originalPosition);
    }, 1000);

    // Dirección aleatoria partículas
    document.documentElement.style.setProperty('--x', Math.random());
    document.documentElement.style.setProperty('--y', Math.random());
});

// Función Ir arriba
goTopContainer.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Mejorar animación de desaparición
    floatButtons.style.transition = 'all 0.3s ease';
    floatButtons.classList.remove('visible');
});
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 150) {
      el.classList.add('active-reveal');
    }
  });
});

// ── Reveal elements ──
const revealElements = document.querySelectorAll(
  '.home-container, .about-container, .projects-container, .cert-container, .contact-strip'
);
revealElements.forEach(el => el.classList.add('reveal'));

// ── Back to top ──
const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #00b4ff;
  color: #0a0a0f;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
  box-shadow: 0 0 16px rgba(0,180,255,0.4);
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout',  () => backToTop.style.transform = 'scale(1)');

// ── Hover effects ──
const cards = document.querySelectorAll('.project-card, .c1, .cert-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.3s ease';
  });
});

// ── Typing animation ──
const typingElement = document.querySelector('.info-home h3');
const words = ["AI/ML Engineer", "UI/UX Designer", "Java Enthusiast", "Data Analyst"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const displayedText = currentWord.substring(0, charIndex);
  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}

// ── Certificate Modal ──
function viewCert(url) {
  const modal   = document.getElementById('cert-modal');
  const content = document.getElementById('modal-content');

  content.innerHTML = `<div class="modal-loading">⏳ Loading certificate...</div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const isImg = /\.(png|jpg|jpeg|webp|gif)$/i.test(url);
  const isPdf = url.toLowerCase().includes('.pdf');

  if (isImg) {
    const img = new Image();
    img.onload = () => {
      content.innerHTML = `<img src="${url}" alt="Certificate"/>`;
    };
    img.onerror = () => certError(url);
    img.src = url;
  } else if (isPdf) {
    content.innerHTML = `
      <iframe
        src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true"
        title="Certificate">
      </iframe>`;
  } else {
    certError(url);
  }
}

function closeCertModal() {
  document.getElementById('cert-modal').classList.remove('open');
  document.getElementById('modal-content').innerHTML = '';
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target.id === 'cert-modal') closeCertModal();
}

function certError(url) {
  document.getElementById('modal-content').innerHTML = `
    <div class="modal-error">
      Could not preview this certificate.<br/>
      <a href="${url}" target="_blank">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Directly
      </a>
    </div>`;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertModal();
});

// ── Loading screen ──
document.addEventListener("DOMContentLoaded", () => {

  type();

  const loadingText   = document.getElementById("loading-text");
  const mainIcon      = document.querySelector(".main-icon");
  const subIcons      = document.querySelectorAll(".sub-icons i");
  const designerText  = document.getElementById("designer-text");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay = 0) {
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText,  0);
  showElement(mainIcon,     800);
  subIcons.forEach((icon, idx) => showElement(icon, 1600 + idx * 400));
  showElement(designerText, 2800);

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display = 'none', 500);
  }, 4000);

});

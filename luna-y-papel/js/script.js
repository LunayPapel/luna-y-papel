// ==========================================================
// LUNA Y PAPEL — script.js
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header con sombra al hacer scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Revelado suave al hacer scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 0.08}s`;
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Formulario de captación ---------- */
  const form = document.getElementById('leadForm');
  const successBox = document.getElementById('leadSuccess');
  const successName = document.getElementById('successName');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const clearFieldError = (input, errorEl) => {
    input.classList.remove('invalid');
    errorEl.textContent = '';
  };

  const setFieldError = (input, errorEl, message) => {
    input.classList.add('invalid');
    errorEl.textContent = message;
  };

  if (form) {
    [nameInput, emailInput].forEach(input => {
      input.addEventListener('input', () => {
        if (input === nameInput) clearFieldError(nameInput, nameError);
        if (input === emailInput) clearFieldError(emailInput, emailError);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const nameValue = nameInput.value.trim();
      const emailValue = emailInput.value.trim();

      if (nameValue.length < 2) {
        setFieldError(nameInput, nameError, 'Cuéntanos cómo te llamas.');
        valid = false;
      } else {
        clearFieldError(nameInput, nameError);
      }

      if (!isValidEmail(emailValue)) {
        setFieldError(emailInput, emailError, 'Revisa tu correo electrónico.');
        valid = false;
      } else {
        clearFieldError(emailInput, emailError);
      }

      if (!valid) return;

      // -----------------------------------------------------------
      // GUARDAR EL LEAD (opcional, para más adelante)
      // -----------------------------------------------------------
      // Ahora mismo el nombre y el correo NO se guardan en ningún sitio:
      // el PDF se descarga directamente en el navegador de la persona.
      // Si más adelante quieres ir construyendo una lista real de
      // suscriptores, aquí es donde se añadiría el envío a un servicio
      // como Formspree, Google Sheets o MailerLite. Por ejemplo, con
      // Formspree (gratis, sin backend propio):
      //
      // fetch('https://formspree.io/f/TU_ID_DE_FORMULARIO', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: nameValue, email: emailValue })
      // });
      //
      // Esa llamada no bloquea la descarga: se puede lanzar y, sin
      // esperar respuesta, mostrar igualmente el botón de descarga.

      showSuccess(nameValue);
    });
  }

  function showSuccess(name) {
    if (successName) successName.textContent = name || 'amigo/a';
    if (form) form.hidden = true;
    if (successBox) successBox.hidden = false;
  }

});

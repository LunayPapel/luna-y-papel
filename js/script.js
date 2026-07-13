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
      // INTEGRACIÓN CON MAILERLITE (o el proveedor que elijas)
      // -----------------------------------------------------------
      // Sustituye este bloque por la llamada real a tu API de email
      // marketing cuando tengas la cuenta configurada. Ejemplo con
      // MailerLite (API de formularios embebidos o fetch a su API):
      //
      // fetch('https://connect.mailerlite.com/api/subscribers', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer TU_API_KEY'
      //   },
      //   body: JSON.stringify({
      //     email: emailValue,
      //     fields: { name: nameValue }
      //   })
      // })
      //   .then(res => res.json())
      //   .then(() => showSuccess(nameValue))
      //   .catch(() => setFieldError(emailInput, emailError, 'Ha ocurrido un error. Inténtalo de nuevo.'));
      //
      // Mientras tanto, mostramos el estado de éxito directamente:

      showSuccess(nameValue);
    });
  }

  function showSuccess(name) {
    if (successName) successName.textContent = name || 'amigo/a';
    if (form) form.hidden = true;
    if (successBox) successBox.hidden = false;
  }

});

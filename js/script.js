document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const response = await fetch('https://portfolio-hqvz.onrender.com', { // <-- Replace with your actual backend URL
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });

  const result = await response.json();
  document.getElementById('responseMsg').textContent = result.message;
});


// Certificates

// Certificates page interactions (dropdown + smooth section jump + keyboard UX)
(function () {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown) return;

  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  // Toggle on click
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.style.display = open ? 'none' : 'block';
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.style.display = 'none';
    }
  });

  // Close on Escape, basic keyboard nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggle.setAttribute('aria-expanded', 'false');
      menu.style.display = 'none';
      toggle.focus();
    }
  });

  // Smooth scroll for dropdown links
  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      toggle.setAttribute('aria-expanded', 'false');
      menu.style.display = 'none';
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optionally update hash without jump
      history.replaceState(null, '', id);
    });
  });
})();

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeToggle.innerHTML = isLight
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
});

document.getElementById('year').textContent = new Date().getFullYear();

// Reveal cards as they enter the viewport.
const revealItems = document.querySelectorAll('.project-card, .skill-card, .timeline-card, .about-panel');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}
(function () {
  // Initialize EmailJS
  emailjs.init({
    publicKey: "lakshitakolhe977@gmail.com"
  });
})();

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");

contactForm.addEventListener("submit", async function (event) {

  event.preventDefault();

  // Collect form data
  const templateParams = {
    from_name: document.getElementById("name").value.trim(),
    from_email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
    reply_to: document.getElementById("email").value.trim()
  };

  // Prevent empty submissions
  if (Object.values(templateParams).some(value => !value)) {
    statusMessage.textContent = "Please fill in all fields.";
    statusMessage.style.color = "red";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  statusMessage.textContent = "";

  try {

    await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      templateParams
    );

    statusMessage.textContent =
      "Thank you! Your message has been sent successfully.";

    statusMessage.style.color = "green";

    contactForm.reset();

  } catch (error) {

    console.error("Email sending error:", error);

    statusMessage.textContent =
      "Sorry! Message could not be sent. Please try again.";

    statusMessage.style.color = "red";

  } finally {

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

  }

});

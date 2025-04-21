// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap components
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Animate elements on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check

  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Create success message
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-success';
      successMessage.innerHTML = `
        <h4>Thank You, ${formValues.name}!</h4>
        <p>Your message has been received. I'll get back to you as soon as possible.</p>
        <button class="btn btn-outline" id="resetForm">Send Another Message</button>
      `;
      
      // Replace form with success message
      contactForm.parentNode.replaceChild(successMessage, contactForm);
      
      // Add event listener to reset button
      document.getElementById('resetForm').addEventListener('click', function() {
        successMessage.parentNode.replaceChild(contactForm, successMessage);
        contactForm.reset();
      });
    });
  }

  // Project gallery lightbox
  const projectImages = document.querySelectorAll('.project-card img');
  projectImages.forEach(image => {
    image.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <img src="${this.src}" alt="${this.alt}">
          <button class="close-lightbox">&times;</button>
        </div>
      `;
      
      document.body.appendChild(lightbox);
      
      // Close lightbox
      const closeBtn = lightbox.querySelector('.close-lightbox');
      closeBtn.addEventListener('click', function() {
        document.body.removeChild(lightbox);
      });
      
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          document.body.removeChild(lightbox);
        }
      });
    });
  });

  // Skills progress animation
  const skillItems = document.querySelectorAll('.skill-item');
  const animateSkills = function() {
    skillItems.forEach(item => {
      const progressBar = item.querySelector('.progress-bar');
      const width = progressBar.style.width;
      progressBar.style.width = '0';
      setTimeout(() => {
        progressBar.style.width = width;
      }, 100);
    });
  };

  // Intersection Observer for skills animation
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const skillsSection = document.querySelector('.skills-container');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // Mobile menu toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
      }
    });
  }

  // Add loading animation
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
}); 
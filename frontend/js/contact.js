document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
          alert('Please fill in all required fields');
          return;
        }
        
        if (!validateEmail(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // Here you would normally send the form data to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      });
    }
    
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });
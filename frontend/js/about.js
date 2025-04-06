// Counter Animation
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
      const animate = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if(count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(animate, 1);
        } else {
          counter.innerText = target + (counter.getAttribute('data-target').includes('+') ? '+' : '');
        }
      }
      
      // Start animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
          animate();
        }
      });
      
      observer.observe(counter);
    });
  });
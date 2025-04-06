document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // FAQ Category Filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show selected category
            const category = btn.dataset.category;
            document.querySelectorAll('.faq-category').forEach(cat => {
                cat.classList.remove('show');
            });
            document.querySelector(`.faq-category.${category}`).classList.add('show');
        });
    });

    // Support Dropdown Hover for Mobile
    const dropdownSupport = document.querySelector('.dropdown-support');
    
    if (window.innerWidth <= 768) {
        dropdownSupport.addEventListener('click', (e) => {
            e.preventDefault();
            const content = dropdownSupport.querySelector('.dropdown-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    }
});
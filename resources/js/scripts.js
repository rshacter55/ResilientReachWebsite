// This file can be used for any interactive features or functionality
// For now, it's empty as we don't have any specific JavaScript requirements

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header-component');
    if (header) {
        header.highlightActivePage();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('hero-section');
    const popover = document.getElementById('contact-popover');
    const closeButton = popover.querySelector('.close-button');
    const form = document.getElementById('contact-form');

    heroSection.addEventListener('contact-click', () => {
        popover.classList.add('active');
    });

    closeButton.addEventListener('click', () => {
        popover.classList.remove('active');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted:', {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        });
        // Clear the form and close the popover
        form.reset();
        popover.classList.remove('active');
        alert('Thank you for your message!');
    });
});
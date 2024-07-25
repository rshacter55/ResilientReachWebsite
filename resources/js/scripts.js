// This file can be used for any interactive features or functionality
// For now, it's empty as we don't have any specific JavaScript requirements

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header-component');
    if (header) {
        header.highlightActivePage();
    }
});
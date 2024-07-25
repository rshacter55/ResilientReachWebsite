class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav>
                    <div class="logo">
                        <img src="/resources/images/logo.png" alt="Resilient Reach Logo">
                    </div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/pages/about.html" data-nav-link>About Us</a></li>
                        <li><a href="/pages/team.html" data-nav-link>Our Team</a></li>
                        <li><a href="/pages/contact.html" data-nav-link>Contact Us</a></li>
                    </ul>
                </nav>
            </header>
        `;
        this.highlightActivePage();
    }

    highlightActivePage() {
        const currentPath = window.location.pathname;
    
        const navLinks = this.querySelectorAll('[data-nav-link]');
        console.log("highlight " + navLinks.length);
        navLinks.forEach(link => {
            console.log("link:" + link);
            if (link.getAttribute('href') === currentPath) {
                console.log(currentPath);
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Special case for home page
        if (currentPath === '/' || currentPath === '/index.html') {
            const homeLink = this.querySelector('[href="/"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }
}

class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <p>&copy; ${new Date().getFullYear()} Resilient Reach. All rights reserved.</p>
            </footer>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
customElements.define('footer-component', FooterComponent);
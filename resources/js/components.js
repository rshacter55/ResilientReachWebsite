

class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 60px;
                }              
                header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    paading: 0;
                    margine: 0;
                    width: 100%;
                    background-color: #f8f8f8;
                    z-index: 1000;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    margin: 0s;
                    padding: 0;
                    hight: 100px;
                }
               nav {
                    padding: 10px 40px 10px 40px;
                    background-color: var(--color-primary);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.rem;
                    color: #ffffff;
                    position: relative;
                }
                .logo-container {
                    display: flex;
                    align-items: center;
                    font-family: "Baskerville", "Times New Roman";
                    font-size: 1.1rem;
                }
              
                .logo-container img {
                    height: 40px;
                    margin-right: 10px;
                }
                .hamburger {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .hamburger span {
                    display: block;
                    width: 25px;
                    height: 3px;
                    background-color: #ffffff;
                    margin: 5px 0;
                    transition: 0.4s;
                }
                .nav-links {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .nav-links li {
                    margin-left: 20px;
                }
                .nav-links a {
                    text-decoration: none;
                    color: #ffffff;
                }
                .nav-links a:hover {
                        color: var(--color-accent-3);
                }
                .nav-links a:active {
                        color: var(--color-accent-3);
                }        
            
                    
                @media (max-width: 768px) {
                    .hamburger {
                        display: block;
                        z-index: 1000;
                    }
                    .nav-links {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background-color: #f8f8f8;
                        padding: 20px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        z-index: 999;
                    }
                    .nav-links.active {
                        display: flex;
                    }
                    .nav-links li {
                        margin: 10px 0;
                    }
                    .nav-links a {
                        display: block;
                        padding: 10px;
                        border-bottom: 1px solid #e0e0e0;
                        color: var(--color-primary);
                    }
                    .nav-links a:hover {
                        color: var(--color-secondary);
                    }    
                    .nav-links li:last-child a {
                        border-bottom: none;
                    }
                }
            </style>
            <header>
            <nav>
                <div class="logo-container">
                    <img src="/resources/images/logo.png" alt="Logo">
                    <span class="logo-text">Resilient Reach</span>
                </div>
                <button class="hamburger" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#team">Our Team</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </nav>
            </header>
        `;
        this.setupHamburgerMenu();
    }

    setupHamburgerMenu() {
        const hamburger = this.querySelector('.hamburger');
        const navLinks = this.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Add click event listeners to navigation links
        const links = this.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                // If it's an in-page link (starts with #), prevent default behavior
                if (link.getAttribute('href').startsWith('#')) {
                    event.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }

                // Close the menu
                this.closeMenu();
            });
        });
    }
   
    toggleMenu() {
        const navLinks = this.querySelector('.nav-links');
        const hamburger = this.querySelector('.hamburger');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    closeMenu() {
        const navLinks = this.querySelector('.nav-links');
        const hamburger = this.querySelector('.hamburger');
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
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


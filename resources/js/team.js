class TeamCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Styling for the team-card element */
                :host {
                    display: block;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    transition: box-shadow 0.3s ease, transform 0.3s ease;
                    overflow: hidden;
                    padding: 20px;
                    cursor: pointer; /* Add this line to change the cursor */

                }
                :host(:hover) {
                    background: #ffffff;
                    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15); 
                }
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
                h3 {
                    color: #2a2a2a;
                    font-size: 1rem;
                    margin: 10px 0;
                    text-transform: uppercase;
                }
                p {
                    color: #2a2a2a;
                    font-size: 1rem;
                    line-height: 1.4;
                }
                .social-links {
                    margin-top: 15px;
                }
                .social-links a {
                    margin: 0 5px;
                    font-size: 1.2rem;
                    color: #767676;
                    transition: color 0.3s ease;
                    text-decoration: none;
                }
                .social-links a:hover {
                   color: #025a8e;
                }
                .social-icon-size {
                    width: 24px;
                    height: 24px;
                }
            </style>
            <img src="${this.getAttribute('img-src')}" alt="${this.getAttribute('name')}" />
            <h3>${this.getAttribute('name')}</h3>
            <p>${this.getAttribute('position')}</p>

            <div class="social-links">
               <!-- <a href="${this.getAttribute('facebook')}" target="_blank">
                    <img src="/resources/images/social/linkedin-svgrepo-com.svg" alt="LinkedIn" class="social-icon-size" >
                </a>
                <a href="${this.getAttribute('twitter')}" target="_blank">
                    <img src="/resources/images/social/linkedin-svgrepo-com.svg" alt="LinkedIn" class="social-icon-size" >
                </a>
                -->
                <a href="${this.getAttribute('linkedin')}" target="_blank">
                    <img src="/resources/images/social/linkedin-svgrepo-com.svg" alt="LinkedIn" class="social-icon-size" >
                </a>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('team-card', TeamCard);
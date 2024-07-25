class HeroSection extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      setTimeout(() => {
        this.shadowRoot.querySelector('.text-content').classList.add('fade-in');
      }, 0);
    }
  
    render() {
      const backgroundImage = this.getAttribute('background-image') || '';
      const height = this.getAttribute('height') || '500px';
      const title = this.getAttribute('title') || '';
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
          }
          .hero {
            background-image: url('${backgroundImage}');
            background-size: cover;
            background-position: center;
            height: ${height};
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
            z-index: 1;
          }

          .hero-content {
            text-align: center;
            color: white;
             font-size: 1.2rem;
             z-index: 2;
          }
          h1 {
            margin: 0;
            font-size: 2.5em;
            z-index: 2;
          }
          .text-content {
            opacity: 0;
          }
          .text-content.fade-in {
            animation: fadeIn 3s ease-out forwards;
          }
          ::slotted(p) {
            opacity: 0;
            animation: fadeIn 3s ease-out forwards;
          }
          ::slotted(p:nth-child(1)) { animation-delay: 0.5s; }
          ::slotted(p:nth-child(2)) { animation-delay: 0.7s; }
          ::slotted(p:nth-child(3)) { animation-delay: 0.9s; }
          ::slotted(p:nth-child(4)) { animation-delay: 1.1s; }
          ::slotted(p:nth-child(5)) { animation-delay: 1.3s; }
  
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
        <section class="hero">
          <div class="hero-content">
            <h1>${title}</h1>
            <div class="text-content">
              <slot name="text-content"></slot>
            </div>
          </div>
        </section>
      `;
    }
  }
  
  customElements.define('hero-section', HeroSection);
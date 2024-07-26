class HeroSection extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
  
    render() {
      const backgroundImage = this.getAttribute('background-image') || '';
      const height = this.getAttribute('height') || '500px';
      const title = this.getAttribute('title') || '';
  
      this.shadowRoot.innerHTML = `
        <style>
          /* ... existing styles ... */
  
          .contact-button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
  
          .contact-button:hover {
            background-color: #0056b3;
          }
  
          .popover {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            z-index: 1000;
          }
  
          .popover.active {
            display: block;
          }
  
          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
          }
  
          .form-group {
            margin-bottom: 15px;
          }
  
          .form-group label {
            display: block;
            margin-bottom: 5px;
          }
  
          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
  
          .submit-button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
  
          .submit-button:hover {
            background-color: #0056b3;
          }
        </style>
        <section class="hero">
          <div class="hero-content">
            <h1>${title}</h1>
            <div class="text-content">
              <slot name="text-content"></slot>
            </div>
            <button class="contact-button">Contact Us</button>
          </div>
        </section>
        <div class="popover">
          <button class="close-button">&times;</button>
          <form id="contact-form">
            <div class="form-group">
              <label for="name">Your Name</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Your Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="submit-button">Send Message</button>
          </form>
        </div>
      `;
    }
  
    setupEventListeners() {
      const contactButton = this.shadowRoot.querySelector('.contact-button');
      const popover = this.shadowRoot.querySelector('.popover');
      const closeButton = this.shadowRoot.querySelector('.close-button');
      const form = this.shadowRoot.querySelector('#contact-form');
  
      contactButton.addEventListener('click', () => {
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
    }
  }
  
  customElements.define('hero-section', HeroSection);
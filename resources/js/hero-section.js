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

    // Add event listeners for the popover
    const button = this.shadowRoot.querySelector('.contact-button');
    button.addEventListener('click', () => this.togglePopover());

    const closeButton = this.shadowRoot.querySelector('.close-button');
    closeButton.addEventListener('click', () => this.togglePopover());

    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit(form);
    });
  }

  render() {
    const backgroundImage = this.getAttribute('background-image') || '';
    const height = this.getAttribute('height') || '500px';
    const title = this.getAttribute('title') || '';
    const buttonText = this.getAttribute('button-text') || 'Contact Us';

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
          background-color: rgba(0, 0, 0, 0.3);
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
          font-size: 2em;
          font-weight: 400;s
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
        .contact-button {
          background-color: #03393e;
          color: white; 
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        .contact-button:hover {
          background-color: #0e8683;
        }

        .popover {
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 90%;
          max-width: 400px;
          padding: 24px; /* Increased padding */
          padding-top: 40px;
          z-index: 100;
        }
        .popover.active {
          display: block;
        }
        .popover label {
          font-size: 1rem;
          display: block;
          margin-bottom: 4px; /* Less margin below the label */
          font-weight: normal; /* Less bulky font weight */
          text-align: left; /* Left justified */
          color: #333;
        }
        .popover input,
        .popover textarea {
          width: calc(100% - 16px);
          padding: 8px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .popover button[type="submit"] {
          background-color: #0e8683;;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .popover button[type="submit"]:hover {
          background-color: #0fbba7;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 1.2em;
          cursor: pointer;
          z-index: 101;
        }
        .error {
          color: #e80075;
          font-size: 0.8rem;
          margin-top: -10px;
          margin-bottom: 10px;
          display: none;
        }
        @media (max-width: 600px) {
          h1 {
            font-size: 1.5em;
          }
          .popover {
            width: 95%;
          }
        }
      </style>
      <section class="hero">
        <div class="hero-content">
          <h1>${title}</h1>
          <div class="text-content">
            <slot name="text-content"></slot>
          </div>
          <button class="contact-button">${buttonText}</button>
          <div class="popover">
            <button class="close-button">✖</button>
            <form novalidate>
              <label for="name">Your Name</label>
              <input type="text" id="name" name="name" required minlength="2">
              <div class="error" id="name-error">Please enter at least 2 characters for your name.</div>

              <label for="email">Your Email</label>
              <input type="email" id="email" name="email" required>
              <div class="error" id="email-error">Please enter a valid email address.</div>

              <label for="message">Message</label>
              <textarea id="message" name="message" rows="4" required minlength="10"></textarea>
              <div class="error" id="message-error">Please enter at least 10 characters for your message.</div>

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  togglePopover() {
    const popover = this.shadowRoot.querySelector('.popover');
    popover.classList.toggle('active');
  }

  handleSubmit(form) {
    // Custom form validation
    const name = form.name;
    const email = form.email;
    const message = form.message;

    const nameError = this.shadowRoot.querySelector('#name-error');
    const emailError = this.shadowRoot.querySelector('#email-error');
    const messageError = this.shadowRoot.querySelector('#message-error');

    let isValid = true;

    // Validate name
    if (name.value.trim().length < 2) {
      nameError.style.display = 'block';
      isValid = false;
    } else {
      nameError.style.display = 'none';
    }

    // Validate email
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email.value)) {
      emailError.style.display = 'block';
      isValid = false;
    } else {
      emailError.style.display = 'none';
    }

    // Validate message
    if (message.value.trim().length < 10) {
      messageError.style.display = 'block';
      isValid = false;
    } else {
      messageError.style.display = 'none';
    }

    // If form is valid, submit it
    if (isValid) {
      console.log('Form submitted:', {
        name: name.value,
        email: email.value,
        message: message.value,
      });
      alert("Your message has been sent!");

      form.reset(); // Reset form fields after submission
      this.togglePopover(); // Close popover on submit
    }
  }
}

customElements.define('hero-section', HeroSection);

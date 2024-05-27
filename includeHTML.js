function includeHTML() {
    const elements = document.querySelectorAll('[data-include-html]');
    elements.forEach(element => {
      const file = element.getAttribute('data-include-html');
      if (file) {
        fetch(file)
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
          })
          .then(data => {
            element.innerHTML = data;
            element.removeAttribute('data-include-html');
            includeHTML();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
    const navbarItems = document.querySelectorAll('.navbar-item');
    const currentUrl = new URL(window.location.href);
    const currentPath = currentUrl.pathname.split('?')[0].split('#')[0];

    navbarItems.forEach(item => {
        const hrefPath = new URL(item.href).pathname.split('?')[0].split('#')[0];
        if (currentPath === hrefPath) {
            item.classList.add('is-active');
        }
    });
  }
  
  document.addEventListener('DOMContentLoaded', includeHTML);
  
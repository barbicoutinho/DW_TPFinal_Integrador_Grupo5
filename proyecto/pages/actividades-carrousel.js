document.addEventListener('DOMContentLoaded', function () {
    const flickityImages = document.querySelectorAll('.carousel-cell img');

    const targets = ['#paneles','#huerta', '#economia', '#infantil'];

    flickityImages.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        const targetId = targets[index];
        const section = document.querySelector(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
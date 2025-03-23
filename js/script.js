const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
let scrollStarted = false;
let lastScrollY = window.scrollY;
const header = document.querySelector('.main-header');


const sectionC = document.querySelector('.section-c');
const image = document.querySelector('.image-container img');
const text = document.querySelector('.text-container');

// Set the maximum and minimum scale for the image
const maxScale = 4.1;
const minScale = 1;

document.addEventListener("DOMContentLoaded", () => {
  const scrollingText = document.getElementById("scrolling-text");
  const content = scrollingText.innerHTML;

  // Duplicate content to prevent blank spaces
  scrollingText.innerHTML += content + content;
});
window.addEventListener('scroll', () => {
  // Get the scroll position of the page
  const rect = sectionC.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Calculate how much the section is in the viewport
  let progress = (windowHeight - rect.top) / windowHeight;

  // Clamp progress between 0 and 1
  progress = Math.min(Math.max(progress, 0), 1);

  // Calculate the scale of the image based on progress
  const scale = maxScale - (maxScale - minScale) * progress;

  // Apply the scale to the image
  image.style.transform = `scale(${scale})`;

  // Show text when the image reaches the minimum size
  if (scale <= minScale + 0.05) {
    text.style.opacity = 1; // Show text
  } else {
    text.style.opacity = 0; // Hide text
  }
});

btn.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
      // Scroll down - hide header
      header.classList.add('hidden');
  } else {
      // Scroll up - show header
      header.classList.remove('hidden');
  }
  lastScrollY = window.scrollY;
});

function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

function scrollPage() {
  const scrollPos = window.scrollY;

  if (scrollPos > 100 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
  }
}

function countUp() {
  counters.forEach((counter) => {
    counter.innerText = '0';

    const updateCounter = () => {
      // Get count target
      const target = +counter.getAttribute('data-target');
      // Get current counter value
      const c = +counter.innerText;

      // Create an increment
      const increment = target / 100;

      // If counter is less than target, add increment
      if (c < target) {
        // Round up and set counter value
        counter.innerText = `${Math.ceil(c + increment)}`;

        setTimeout(updateCounter, 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

function reset() {
  counters.forEach((counter) => (counter.innerHTML = '0'));
}

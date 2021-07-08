/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const fragment = document.createDocumentFragment();
const sections = document.querySelectorAll('section');
const navbarList = document.querySelector('ul#navbar__list');

var currentSection = 'section1';
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
var comingIn = function(element) {
  var distance = element.getBoundingClientRect();
  return (
    distance.top >= 0 && distance.top < window.innerHeight/2
  );
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildMenu() {
  for (section of sections) {
    const newElement = document.createElement('li');
    newElement.classList.add('menu__link')
    newElement.innerText = section.id;
    fragment.appendChild(newElement);
  }
  navbarList.appendChild(fragment);
}

// Scroll to anchor ID using scrollTO event
function scrollToSection() {
  navbarList.addEventListener('click', function (e) {
    document.getElementById(e.target.textContent).scrollIntoView({behavior: "smooth"});
  })
}

// Add class 'active' to section when near top of viewport
function setActive() {
  // add event on scroll
  window.addEventListener('scroll', function() {
    sections.forEach(section => {
      // for each section, if section enters viewport and is not currentSection
      // it will be designated as active__class
      if (section.id != currentSection) {
        if (comingIn(section)) {
          section.classList.add("active__class");
          currentSection = section.id;
          }
        else {
          section.classList.remove("active__class");
        }
      }
    });
  });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener('DOMContentLoaded', function () {
  // Build menu
  buildMenu();
  // Scroll to section on link click
  scrollToSection();
  // Set sections as active
  setActive();
  // reference: https://stackoverflow.com/questions/63382647/howto-add-class-when-section-is-in-viewport
});

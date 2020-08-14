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

const section1 = document.querySelector("#section1");
const section2 = document.querySelector("#section2");
const section3 = document.querySelector("#section3");
const section4 = document.querySelector("#section4");
const container = [section1, section2, section3, section4];
const section_div = document.querySelectorAll(".landing__container");
const navbar_list = document.querySelector("#navbar__list");
const myFragment = document.createDocumentFragment();
const navbar_list_items = navbar_list.childNodes;
const section_bounding = [
	section_div[0].getBoundingClientRect(),
	section_div[1].getBoundingClientRect(),
	section_div[2].getBoundingClientRect(),
	section_div[3].getBoundingClientRect()
];
const footer = document.querySelector(".page__footer");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

const isInViewport = function (elem) {
	const distance = elem.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

function navLinkState(theLink) {
	for (let i=0; i<section_div.length; i++)
	{
		if (navbar_list_items[i].textContent === theLink)
		{
			navbar_list_items[i].classList.add("menu__link__active");
		} else {
			navbar_list_items[i].classList.remove("menu__link__active");
		}
	}
}

function isAtEnd(element) {
	const distance = element.getBoundingClientRect();
	return (
		distance.top <= 750 &&
		distance.left >= 0 &&
		distance.bottom <= 900 &&
		distance.right >= 0
	);
}

function addButtonToTop() {
	const topButton = document.createElement("p");
	topButton.textContent = "Go Top";
	topButton.classList.add("footer__button");
	topButton.addEventListener("click", function(){
		window.scrollTo({
			top:0,
			left:0,
			behavior: 'smooth'
		});
	});
	footer.appendChild(topButton);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav

const buildNav = function () {

	for (let list_item = 1; list_item <= section_div.length; list_item++)
	{
		// Creates a new list item element
		const new_list_item = document.createElement('li');

		// Sets the item element inner HTML code
		// Used template literals to indicate section number which is ID of sections of the page
		// Used data-nav attribute values as the name of the anchors
		new_list_item.textContent = section_div[list_item-1].parentElement.dataset.nav;
		new_list_item.classList.add("menu__link");

		// Appended all created elements to the DocumentFragment
		myFragment.appendChild(new_list_item);
	}

	// In the end, appended the fragment to the page
	navbar_list.appendChild(myFragment);
}


// Add class 'active' to section when near top of viewport

const addActiveClass = function (element)
{
	element.classList.add("your-active-class");
}

// Scroll to anchor ID using scrollTO event

function scrollToTarget(event)
{
	for (let i=0; i<section_div.length; i++)
	{
		if (event.target.textContent === section_div[i].parentElement.dataset.nav)
		{
			window.scrollTo({
				top:section_bounding[i].top,
				left:section_bounding[i].left,
				behavior: 'smooth'
			});
			addActiveClass(section_div[i].parentElement);
			break;
		}
	}
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

document.addEventListener("DOMContentLoaded", buildNav());

// Scroll to section on link click

navbar_list.addEventListener('click', scrollToTarget);

// Set sections as active

window.addEventListener('scroll', function (event) {
	for (let member of container)
	{
		if (isInViewport(member)) {
			addActiveClass(member);
			navLinkState(member.dataset.nav);
			break;
		}
	}
}, false);

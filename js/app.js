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
const section_div = document.querySelectorAll(".landing__container");
const navbar_list = document.querySelector("#navbar__list");
const navbar_list_items = navbar_list.childNodes;
const num_of_navbar_list_items = section_div.length;
const sections = document.querySelectorAll("section");
const myFragment = document.createDocumentFragment();
const section_bounding = [
	section_div[0].getBoundingClientRect(),
	section_div[1].getBoundingClientRect(),
	section_div[2].getBoundingClientRect(),
	section_div[3].getBoundingClientRect()
];
const pageBottom = document.querySelector(".page__footer");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

function navLinkState(theLink, numOfLinks) {
	for (let i=0; i<numOfLinks; i++)
	{
		if (navbar_list_items[i] === theLink)
		{
			navbar_list_items[i].classList.add("menu__link__active");
		} else {
			navbar_list_items[i].classList.remove("menu__link__active");
		}
	}
}

function addButtonToTop() {
	const scroll = document.documentElement.scrollHeight - window.innerHeight;
	const bottomPage = window.scrollY;
	if (scroll >= bottomPage)
	{
		const topButton = document.createElement("p");
		topButton.textContent = "Go Top";
		topButton.classList.add("footer__button");
		topButton.addEventListener("click", function()
		{window.scrollTo({top:0, left:0, behavior: 'smooth'});});
		pageBottom.appendChild(topButton);
	} else {
		document.querySelector(".footer__button").remove();
	}
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const buildNav = function (number_of_items) {

	for (let list_item = 1; list_item <= number_of_items; list_item++)
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
const addActiveClass = function (index)
{
	sections[index].classList.add("your-active-class");
}

// Scroll to anchor ID using scrollTO event
function scrollToTarget(event)
{
	for (let i=0; i<num_of_navbar_list_items; i++)
	{
		if (event.target.textContent === section_div[i].parentElement.dataset.nav)
		{
			navLinkState(event.target, num_of_navbar_list_items);
			window.scrollTo({
				top:section_bounding[i].top + 50,
				left:section_bounding[i].left,
				behavior: 'smooth'
			});
			addActiveClass(i);
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
document.addEventListener("DOMContentLoaded", buildNav(num_of_navbar_list_items));

// Scroll to section on link click
navbar_list.addEventListener('click', scrollToTarget);

// Set sections as active
window.addEventListener('scroll', addActiveClass(0));
window.addEventListener('scroll', addButtonToTop());




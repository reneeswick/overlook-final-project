// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//////// GLOBAL VARIABLES /////////////



//////// QUERY SELECTORS //////////////
const upcomingTripsBtn = document.querySelector('#upcomingTripsBtn');
const pageTitle = document.querySelector('#pageTitle');
////////// EVENT LISTENERS //////////////
upcomingTripsBtn.addEventListener('click', showUpcomingTrips);

////////// FUNCTIONS ////////////////
function hide(element) {
  element.classList.add('hidden')
}

function show(element) {
  element.classList.remove('hidden')
}

function showUpcomingTrips() {
  pageTitle.innerText= 'Upcoming Trips'
}

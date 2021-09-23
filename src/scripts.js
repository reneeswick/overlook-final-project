// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from './domUpdates.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//////// GLOBAL VARIABLES /////////////



//////// QUERY SELECTORS //////////////
export const homeBtn = document.querySelector('#homeBtn');
export const upcomingTripsBtn = document.querySelector('#upcomingTripsBtn');
export const pastTripsBtn = document.querySelector('#pastTripsBtn');
const pageTitle = document.querySelector('.page-title');

////////// EVENT LISTENERS //////////////
homeBtn.addEventListener('click', domUpdates.showHomeView);
upcomingTripsBtn.addEventListener('click', domUpdates.showUpcomingTrips);
pastTripsBtn.addEventListener('click', domUpdates.showPastTrips);

////////// FUNCTIONS ////////////////

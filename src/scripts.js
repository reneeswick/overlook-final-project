// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from './domUpdates.js';
import {fetchSingleCustomerData, fetchBookingsData, fetchRoomsData} from './apiCalls.js';
import Customer from './classes/Customer.js';
import Hotel from './classes/Hotel.js'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//////// GLOBAL VARIABLES /////////////
export let currentCustomer;

//////// QUERY SELECTORS //////////////
export const homeBtn = document.querySelector('#homeBtn');
export const upcomingTripsBtn = document.querySelector('#upcomingTripsBtn');
export const pastTripsBtn = document.querySelector('#pastTripsBtn');
const pageTitle = document.querySelector('.page-title');
const mainContentContainer = document.querySelector('#mainContentContainer');
const upcomingTripsView = document.querySelector('#upcomingTripsView');
const upcomingTripsCardContainer = document.querySelector('#upcomingTripsCardContainer');
const username = document.querySelector('#username');

////////// EVENT LISTENERS //////////////
homeBtn.addEventListener('click', domUpdates.showHomeView);
upcomingTripsBtn.addEventListener('click', domUpdates.showUpcomingTrips);
pastTripsBtn.addEventListener('click', domUpdates.showPastTrips);
window.addEventListener('load', getData);

////////// FUNCTIONS ////////////////
function getData() {
  return Promise.all([fetchSingleCustomerData(),fetchBookingsData(),fetchRoomsData()])
  .then(data => organizeFetchedData(data))
  .catch(error => mainContentContainer.innerText = `We're sorry: ${error}`)
  .then(() => domUpdates.displayUsername())
  .catch(error => mainContentContainer.innerText = `We're sorry: ${error}`)
}

function organizeFetchedData(data) {
  let bookingsData;
  let roomsData;
  currentCustomer = data[0];
  bookingsData = data[1];
  roomsData = data[2];
  let currentHotel = new Hotel('Overlook', roomsData, bookingsData)
  currentCustomer = new Customer(currentCustomer.id, currentCustomer.name, currentHotel)
  console.log(currentCustomer)
  console.log(currentHotel)
}

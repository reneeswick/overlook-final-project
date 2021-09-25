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

//////// BUTTONS ///////////////////////
export const homeBtn = document.querySelector('#homeBtn');
export const upcomingTripsBtn = document.querySelector('#upcomingTripsBtn');
export const pastTripsBtn = document.querySelector('#pastTripsBtn');
export const availabilityBtn = document.querySelector('#availabilityBtn');
///////// QUERY SELECTORS /////////////////////
const pageTitle = document.querySelector('.page-title');
const mainContentContainer = document.querySelector('#mainContentContainer');
const homeView = document.querySelector('#homeView');
const upcomingTripsView = document.querySelector('#upcomingTripsView');
const upcomingTripsCardContainer = document.querySelector('#upcomingTripsCardContainer');
const pastTripsView = document.querySelector('#pastTripsView');
const pastTripsCardContainer = document.querySelector('#pastTripsCardContainer');
const availableRoomsView = document.querySelector('#availableRoomsView');
const availableRoomsCardContainer = document.querySelector('#availableRoomsCardContainer');
const totalSpent = document.querySelector('#totalSpent');
const username = document.querySelector('#username');
const checkInDate = document.querySelector('#checkInDate');
const checkOutDate = document.querySelector('#checkOutDate');

////////// EVENT LISTENERS //////////////
homeBtn.addEventListener('click', domUpdates.showHomeView);
upcomingTripsBtn.addEventListener('click', domUpdates.showUpcomingTrips);
pastTripsBtn.addEventListener('click', domUpdates.showPastTrips);
availabilityBtn.addEventListener('click', domUpdates.showAvailableRooms);
window.addEventListener('load', getData);

////////// FUNCTIONS ////////////////
function getData() {
  return Promise.all([fetchSingleCustomerData(),fetchBookingsData(),fetchRoomsData()])
  .then(data => organizeFetchedData(data))
  .catch(error => mainContentContainer.innerText = `We're sorry: ${error}`)
  .then(() => domUpdates.displayUsername())
  .catch(error => mainContentContainer.innerText = `We're sorry: ${error}`)
};

function organizeFetchedData(data) {
  let bookingsData;
  let roomsData;
  currentCustomer = data[0];
  bookingsData = data[1];
  roomsData = data[2];
  let currentHotel = new Hotel('Overlook', roomsData, bookingsData)
  currentCustomer = new Customer(currentCustomer.id, currentCustomer.name, currentHotel)
};

export function checkAvailability() {
  let checkIn = checkInDate.value.split('-').join('/')
  let checkOut = checkOutDate.value.split('-').join('/')
  let availableRooms = currentCustomer.hotel.findAvailability(checkIn, checkOut);
  return availableRooms;
};

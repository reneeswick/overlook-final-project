// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from './domUpdates.js';
import {fetchSingleCustomerData, fetchBookingsData, fetchRoomsData, fetchAllUserData} from './apiCalls.js';
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
const popupMsg = document.querySelector('#popupMsg');
const mainContentContainer = document.querySelector('#mainContentContainer');
const homeView = document.querySelector('#homeView');
const upcomingTripsView = document.querySelector('#upcomingTripsView');
const upcomingTripsCardContainer = document.querySelector('#upcomingTripsCardContainer');
const pastTripsView = document.querySelector('#pastTripsView');
const pastTripsCardContainer = document.querySelector('#pastTripsCardContainer');
const availableRoomsView = document.querySelector('#availableRoomsView');
const availableRoomsCardContainer = document.querySelector('#availableRoomsCardContainer');
const selectedRoomView = document.querySelector('#selectedRoomView');
const selectedRoomContainer = document.querySelector('#selectedRoomContainer');
const totalSpent = document.querySelector('#totalSpent');
const username = document.querySelector('#username');
const checkInDate = document.querySelector('#checkInDate');
const checkOutDate = document.querySelector('#checkOutDate');
const roomType = document.querySelector('#roomTypes');
const userNameInput = document.querySelector('#userNameInput');
const userPasswordInput = document.querySelector('#userPasswordInput');
const loginBtn = document.querySelector('#loginBtn');
const loginPrompt = document.querySelector('#loginPrompt');

////////// EVENT LISTENERS //////////////
homeBtn.addEventListener('click', domUpdates.showHomeView);
upcomingTripsBtn.addEventListener('click', domUpdates.showUpcomingTrips);
pastTripsBtn.addEventListener('click', domUpdates.showPastTrips);
availabilityBtn.addEventListener('click', domUpdates.showAvailableRooms);
availableRoomsCardContainer.addEventListener('click', domUpdates.showRoomDetails);
selectedRoomContainer.addEventListener('click', domUpdates.showBookingsConfirmation);
upcomingTripsCardContainer.addEventListener('click', domUpdates.cancelBooking);
loginBtn.addEventListener('click', authenticateUser);

////////// FUNCTIONS ////////////////
export function getData(number) {
  return Promise.all([fetchSingleCustomerData(number),fetchBookingsData(),fetchRoomsData()])
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
  currentCustomer.checkInDate = null;
  currentCustomer.checkOutDate = null;
  currentCustomer.checkInDate = checkInDate.value.split('-').join('/');
  currentCustomer.checkOutDate = checkOutDate.value.split('-').join('/');
  let roomType = roomTypes.value
  let availableRooms;
  if(roomType === 'all') {
    availableRooms = currentCustomer.hotel.findAvailability(currentCustomer.checkInDate, currentCustomer.checkOutDate);
  } else {
    availableRooms = currentCustomer.hotel.filterByRoomType(roomType, currentCustomer.checkInDate, currentCustomer.checkOutDate)
  }
  return availableRooms;
};

function authenticateUser(event) {
  event.preventDefault()
  let username = (userNameInput.value).split('customer')[1]
  let password = userPasswordInput.value
  let allCustomers;
  let customerInfo;
  let userID;
  if(password === 'overlook2021'){
    let customerData = fetchAllUserData()
    .then(data => allCustomers = data)
    .then(() => customerInfo = allCustomers.customers.find((customer) => {
      return customer.id === parseInt(username)
    }))
    .then(() => userID = customerInfo.id.toString())
    .catch(error => domUpdates.popUpError('Username is incorrect.'))
    .then(() => getData(userID))
    .then(() => domUpdates.showHomeView())
  } else {
    domUpdates.popUpError('Password is incorrect.');
  }
};

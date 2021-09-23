//////// IMPORTS ////////////////
import {upcomingTripsBtn, pastTripsBtn} from './scripts.js';
import {currentCustomer} from './scripts.js';



let domUpdates = {
  hide(element) {
    element.classList.add('hidden');
  },

  show(element) {
    element.classList.remove('hidden');
  },

  showUpcomingTrips() {
    domUpdates.show(upcomingTripsView);
    domUpdates.show(upcomingTripsCardContainer);
    pageTitle.innerText= 'Upcoming Trips';
    upcomingTripsCardContainer.innerHTML = `<p> ${currentCustomer.viewUpcomingTrips()} </p>`
  },

  showPastTrips() {
    pageTitle.innerText= 'Past Trips';
  },

  showHomeView() {
    pageTitle.innerText= 'Book a Room';
  },

  displayUsername() {
    username.innerText = `${currentCustomer.name}`;
  },
}

export default domUpdates;

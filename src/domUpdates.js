//////// IMPORTS ////////////////
import {upcomingTripsBtn, pastTripsBtn} from './scripts.js';



let domUpdates = {
  hide(element) {
    element.classList.add('hidden');
  },

  show(element) {
    element.classList.remove('hidden');
  },

  showUpcomingTrips() {
    pageTitle.innerText= 'Upcoming Trips';
  },

  showPastTrips() {
    pageTitle.innerText= 'Past Trips';
  },

  showHomeView() {
    pageTitle.innerText= 'Book a Room';
  },
}

export default domUpdates;

//////// IMPORTS ////////////////
import {upcomingTripsBtn, pastTripsBtn} from './scripts.js';
import {currentCustomer} from './scripts.js';

///////// DOM UPDATES //////////
let domUpdates = {
  hide(element) {
    element.classList.add('hidden');
  },

  show(element) {
    element.classList.remove('hidden');
  },

  showHomeView() {
    domUpdates.show(homeView);
    domUpdates.hide(pastTripsView);
    domUpdates.hide(pastTripsCardContainer);
    domUpdates.hide(upcomingTripsView);
    domUpdates.hide(upcomingTripsCardContainer);
    domUpdates.hide(totalSpent);
    pageTitle.innerText= 'Welcome to The Overlook';
  },

  displayUsername() {
    username.innerText = `${currentCustomer.name}`;
  },

  showUpcomingTrips() {
    domUpdates.show(upcomingTripsView);
    domUpdates.show(upcomingTripsCardContainer);
    domUpdates.hide(homeView);
    domUpdates.hide(pastTripsView);
    domUpdates.hide(pastTripsCardContainer);
    domUpdates.hide(totalSpent);
    pageTitle.innerText= 'Upcoming Trips';
    currentCustomer.viewUpcomingTrips();
    if(currentCustomer.upcomingTrips.length === 0) {
      upcomingTripsCardContainer.innerHTML = `<p>You have no upcoming trips.</p>`
    } else {
      let upcomingTripsMiniCards = currentCustomer.upcomingTrips.reduce((acc, trip) => {
        acc +=
        `<section class "mini-card">
          <p1> Date: ${trip.date} </p1>
          <p2>Room Number: ${trip.roomNumber}</p2>
        </section>`
        return acc
      }, '')
      upcomingTripsCardContainer.innerHTML = upcomingTripsMiniCards;
    }
  },

  showPastTrips() {
    domUpdates.show(pastTripsView);
    domUpdates.show(pastTripsCardContainer);
    domUpdates.show(totalSpent);
    domUpdates.hide(homeView);
    domUpdates.hide(upcomingTripsView);
    domUpdates.hide(upcomingTripsCardContainer);
    currentCustomer.viewPastTrips();
    domUpdates.showTotalSpent();
    pageTitle.innerText= 'Past Trips';
    let pastTripMiniCards = currentCustomer.pastTrips.reduce((acc, trip) => {
      acc +=
      `<section class "mini-card">
        <p1> Date: ${trip.date} </p1>
        <p2>Room Number: ${trip.roomNumber}</p2>
      </section>`
      return acc
    }, '')
    pastTripsCardContainer.innerHTML = pastTripMiniCards
  },

  showTotalSpent() {
    let total = currentCustomer.calculateTotalSpent();
    totalSpent.innerText = total;
  }
}

export default domUpdates;

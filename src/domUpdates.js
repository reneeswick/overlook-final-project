//////// IMPORTS ////////////////
import {upcomingTripsBtn, pastTripsBtn, availabilityBtn} from './scripts.js';
import {currentCustomer} from './scripts.js';
import {checkAvailability, getData} from './scripts.js';
import {bookARoom, cancelRoom} from './apiCalls.js';

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
    domUpdates.hide(availableRoomsView);
    domUpdates.hide(availableRoomsCardContainer);
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
        `<section class= "mini-card">
          <p1> Date: ${trip.date} </p1>
          <p2>Room Number: ${trip.roomNumber}</p2>
          <button type= "button" name= "cancel" class= "cancel" id= "${trip.id}">
          Cancel
          </button>
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
    getData(currentCustomer.id);
    currentCustomer.viewPastTrips();
    domUpdates.showTotalSpent();
    pageTitle.innerText= 'Past Trips';
    let pastTripMiniCards = currentCustomer.pastTrips.reduce((acc, trip) => {
      acc +=
      `<section class= "mini-card">
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
  },

  showAvailableRooms() {
    domUpdates.show(availableRoomsView);
    domUpdates.show(availableRoomsCardContainer);
    let availableRooms = checkAvailability();
    if(availableRooms.length === 0) {
      availableRoomsCardContainer.innerHTML =
        `<section>
          <p1>We're sorry, there are currently no rooms available that meet your search.</p1>
          <p2>Try revising your dates or room type to see what else we have available for you </p2>
        </section>`
    } else {
      let availableRoomsMiniCards = availableRooms.reduce((acc, room) => {
        acc +=
        `<section class= "room-mini-card" id= "${room.number}">
        <p1> Room Type: ${room.roomType}</p1>
        <p2> Bed Size: ${room.bedSize}</p2>
        <p3> Number of Bed: ${room.numBeds}</p3>
        <p4> Cost: $${room.costPerNight}</p4>
        <p5> Per Night </p5>
        </section>`
        return acc
      }, '')
      availableRoomsCardContainer.innerHTML = availableRoomsMiniCards
    }
  },

  showRoomDetails(event) {
    domUpdates.show(selectedRoomView);
    domUpdates.show(selectedRoomContainer);
    domUpdates.hide(availableRoomsView);
    domUpdates.hide(availableRoomsCardContainer);
    domUpdates.hide(homeView);
    let selectedRoom = currentCustomer.hotel.rooms.rooms.find((room) => {
      return room.number === parseInt(event.target.id)
    })
    selectedRoomContainer.innerHTML =
      `<section class= "selected-room">
        <h2> ${selectedRoom.roomType} </h2>
        <button type= "button" name= "book now" class= "book-now" id= "${selectedRoom.number}">
        Book Now
        </button>
        <p1> ${selectedRoom.bedSize} </p1>
        <p2> Number of Beds: ${selectedRoom.numBeds} </p2>
        <p3> Has a Bidet?: ${selectedRoom.bidet} </p3>
        <p4> $${selectedRoom.costPerNight}/night</p4>
      </section>`
  },

  showBookingsConfirmation(event) {
    currentCustomer.bookingDates = []
    let userID = currentCustomer.id;
    let roomNumber = parseInt(event.target.id);
    if(event.target.className === 'book-now') {
      currentCustomer.setBookingDates(currentCustomer.checkInDate, currentCustomer.checkOutDate);
      currentCustomer.bookingDates.map((date) => {
        bookARoom(userID, date, roomNumber)
        .then(() => selectedRoomContainer.innerHTML =
          `<section class= "confirmation">
            <p1> Congratulations! Your booking was successful for ${currentCustomer.name}</p1>
          </section>`)
          .then(() => getData(currentCustomer.id))
      })
    }
  },

  cancelBooking(event) {
    if(event.target.className === 'cancel') {
      let bookingsID = parseInt(event.target.id)
      cancelRoom(bookingsID)
    }
  },
}

export default domUpdates;

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
    if(currentCustomer === undefined) {
      domUpdates.show(loginPrompt);
      domUpdates.show(loginForm);
      domUpdates.popUpError('Login first to book your stay')
    } else {
      domUpdates.show(homeView);
      domUpdates.hide(loginPrompt);
      domUpdates.hide(loginForm);
      domUpdates.hide(pastTripsView);
      domUpdates.hide(pastTripsCardContainer);
      domUpdates.hide(upcomingTripsView);
      domUpdates.hide(upcomingTripsCardContainer);
      domUpdates.hide(totalSpent);
      domUpdates.hide(availableRoomsView);
      domUpdates.hide(availableRoomsCardContainer);
      domUpdates.hide(selectedRoomContainer);
      pageTitle.innerText= 'Welcome to The Overlook';
    }
  },

  displayUsername() {
    username.innerText = `${currentCustomer.name}`;
  },

  showUpcomingTrips() {
    if(currentCustomer === undefined) {
      domUpdates.popUpError('Login to view upcoming trips')
    } else {
      domUpdates.show(upcomingTripsView);
      domUpdates.show(upcomingTripsCardContainer);
      domUpdates.hide(homeView);
      domUpdates.hide(pastTripsView);
      domUpdates.hide(pastTripsCardContainer);
      domUpdates.hide(totalSpent);
      domUpdates.hide(selectedRoomContainer);
      pageTitle.innerText= 'Upcoming Trips';
      currentCustomer.viewUpcomingTrips();
      if(currentCustomer.upcomingTrips.length === 0) {
        upcomingTripsCardContainer.innerHTML =
        `<section class= "confirmation" aria-label= "No upcoming trips">
        <p>Visit our home page to plan your next trip!</p>
        </section>`
      } else {
        let upcomingTripsMiniCards = currentCustomer.upcomingTrips.reduce((acc, trip) => {
          acc +=
          `<section class= "mini-card" aria-label= "rooms in your upcoming trips">
          <p1> Date: ${trip.date} </p1>
          <p2>Room Number: ${trip.roomNumber}</p2>
          <img class= "mini-card-room-image" src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIDGYFO3l7DMUeTZ0PPaeJ6_DwBqg1-HqmvSXu64PCJ8e9qjeF9TgdUmkefglMBSIOctc&usqp=CAU" alt= "Night view of the Northern Lights through room's dome">
          <button type= "button" name= "cancel" class= "cancel" id= "${trip.id}">
          Cancel
          </button>
          </section>`
          return acc
        }, '')
        upcomingTripsCardContainer.innerHTML = upcomingTripsMiniCards;
      }
    }
  },

  showPastTrips() {
    if(currentCustomer === undefined) {
      domUpdates.popUpError('Login to book your past trips')
    } else {
      domUpdates.show(pastTripsView);
      domUpdates.show(pastTripsCardContainer);
      domUpdates.show(totalSpent);
      domUpdates.hide(homeView);
      domUpdates.hide(upcomingTripsView);
      domUpdates.hide(upcomingTripsCardContainer);
      domUpdates.hide(selectedRoomContainer);
      getData(currentCustomer.id);
      currentCustomer.viewPastTrips();
      domUpdates.showTotalSpent();
      pageTitle.innerText= 'Past Trips';
      let pastTripMiniCards = currentCustomer.pastTrips.reduce((acc, trip) => {
        acc +=
        `<section class= "mini-card" aria-label= "rooms in your past trips">
        <p1> Date: ${trip.date} </p1>
        <p2>Room Number: ${trip.roomNumber}</p2>
        </section>`
        return acc
      }, '')
      pastTripsCardContainer.innerHTML = pastTripMiniCards
    }
  },

  showTotalSpent() {
    let total = currentCustomer.calculateTotalSpent();
    totalSpent.innerText = `Total Spent: ${total}`;
  },

  showAvailableRooms() {
    domUpdates.show(availableRoomsView);
    domUpdates.show(availableRoomsCardContainer);
    let availableRooms = checkAvailability();
    if(availableRooms.length === 0) {
      availableRoomsCardContainer.innerHTML= "";
      availableRoomsCardContainer.innerHTML =
        `<section>
          <p1>We're sorry, there are currently no rooms available that meet your search.</p1>
          <p2>Try revising your dates or room type to see what else we have available for you </p2>
        </section>`
    } else {
      let availableRoomsMiniCards = availableRooms.reduce((acc, room) => {
        acc +=
        `<section class= "room-mini-card" id= "${room.number}" aria-label= "available rooms">
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
    selectedRoomContainer.innerHTML = ""
    selectedRoomContainer.innerHTML =
      `<section class= "selected-room" aria-label= "selected room">
        <h2> ${selectedRoom.roomType} </h2>
        <button type= "button" name= "book now" class= "book-now" id= "${selectedRoom.number}">
        Book Now
        </button>
        <section class= "selected-room-container">
        <img class= "selected-room-img" src= "https://pbs.twimg.com/media/EqfOJrrXEAEjqQi.jpg" alt= "An adventerous room with a domed roof">
        <img class= "selected-room-img" src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmpgE-qOLepMSLWHnLWe1Qzpa1FQdm9J9uKRLdvyHzKu45dH8bfVaXudUEsTaCJkpdiw&usqp=CAU" alt= "An adventerous room with a domed roof at dusk">
        <img class= "selected-room-img" src= "https://inhabitat.com/wp-content/blogs.dir/1/files/2011/10/hotel-kakslauttanen-igloo-village-lead.jpg" alt= "A birds-eye-view of the hotel globes at night">
        <img class= "selected-room-img" src= "https://i.pinimg.com/originals/d9/05/1d/d9051d1fc4d750c7467790a019058dd8.jpg" alt= "An adventerous full room view at night">
        </section>
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
          `<section class= "confirmation" aria-label= "confirmation">
            <p1> Congratulations! Your booking for ${currentCustomer.name} was successful</p1>
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

  popUpError(message) {
    event.target.ariaHasPopup = true;
    domUpdates.show(popupMsg)
    popupMsg.innerText = message
    setTimeout(() => {domUpdates.hide(popupMsg)}, 2000)
  }
}

export default domUpdates;

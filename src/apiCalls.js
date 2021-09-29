import domUpdates from './domUpdates.js';
import {getData, currentCustomer} from './scripts.js';

export function fetchSingleCustomerData(number) {
  return fetch(`http://localhost:3001/api/v1/customers/${number}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.warn(error))
    .catch(error => mainContentContainer.innerText = `We're sorry: ${error}`)
}

export function fetchBookingsData() {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.warn(error))
    .catch(error => mainContentContainer.innerText = `We're sorry: ${error}`)
}

export function fetchRoomsData() {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.warn(error))
    .catch(error => mainContentContainer.innerText = `We're sorry: ${error}`)
}

export function bookARoom(userID, bookingDate, roomNumber) {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({ "userID": userID, "date": bookingDate, "roomNumber": roomNumber}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => mainContentContainer.innerText = `We're sorry: ${err}`)
    .then(() => getData(currentCustomer.id))
}

export function cancelRoom(bookingsID) {
  return fetch(`http://localhost:3001/api/v1/bookings/${bookingsID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => mainContentContainer.innerText = `We're sorry: ${err}`)
    .then(() => getData(currentCustomer.id))
    .then(() => domUpdates.showUpcomingTrips())
}

export function fetchAllUserData() {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

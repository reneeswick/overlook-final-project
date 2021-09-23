export function fetchSingleCustomerData() {
  return fetch('http://localhost:3001/api/v1/customers/2')
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

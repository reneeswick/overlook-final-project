import Hotel from '/src/classes/Hotel.js';

class Customer {
  constructor(id, name, hotel) {
    this.id = id;
    this.name = name;
    this.hotel = hotel;
    this.pastTrips = [];
    this.upcomingTrips = [];
  }

  calculateCurrentDate(){
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    if(month < 10) {
      month = `0${month}`
    }
    if(date < 10) {
      date = `0${date}`
    }
    let currentDate = `${year}/${month}/${date}`;
    return currentDate;
  }

  viewPastTrips(){
    let currentDate = this.calculateCurrentDate();
    let pastTrips = this.hotel.bookings.bookings.filter((booking) => {
      return booking.userID === this.id && booking.date < currentDate
    })
    this.pastTrips = pastTrips
    return this.pastTrips
  }

  viewUpcomingTrips() {
    let currentDate = this.calculateCurrentDate();
    let upcomingTrips = this.hotel.bookings.bookings.filter((booking) => {
      return booking.userID === this.id && booking.date >= currentDate
    })
    this.upcomingTrips = upcomingTrips;
    if(this.upcomingTrips.length === 0) {
      return 'You have no upcoming trips.'
    } else {
      return this.upcomingTrips
    }
  }

  calculateTotalSpent() {
    let totalSpent = this.hotel.bookings.bookings.reduce((acc, booking) => {
      if(this.id === booking.userID) {
        this.hotel.rooms.rooms.forEach((room) => {
          if(room.number === booking.roomNumber) {
            acc += room.costPerNight
          }
        })
      }
      return acc
    }, 0)
    totalSpent = (totalSpent * 1000)
    totalSpent = (totalSpent / 1000).toFixed(2)
    return(`$${totalSpent}`)
  }
}

export default Customer;
